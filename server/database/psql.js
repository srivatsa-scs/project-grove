/* Import Pool Config */
const pool = require('../adapters/pg-adapter');
const { logger } = require('../adapters/winston-adapter');
require('dotenv').config('./database/.env');
const familyMap = require('../familymap');

/* Converts the object to backend format */

function _flatten(obj) {
  flatObj = {
    id: obj.id,
    first_name: obj.firstName,
    last_name: obj.lastName,
    gender: obj.gender,
    blood_group_id: obj.bloodGroup,
    marital_status: obj.maritalStatus,
    day_of_birth: obj.dateOfBirth.dayOfBirth,
    month_of_birth: obj.dateOfBirth.monthOfBirth,
    year_of_birth: obj.dateOfBirth.yearOfBirth,
    phone: obj.contactInformation.phone,
    email: obj.contactInformation.email,
    address: obj.address.address1,
    town_city: obj.address.townCity,
    province_state: obj.address.provinceState,
    country: obj.address.country,
    postal_code: obj.address.postalCode,
    gothra: obj.astrology.gothra,
    rasi_id: obj.astrology.rasi,
    nakshathra_id: obj.astrology.nakshathra,
    photo_url: obj.imgPath,
    date_of_death: obj.dateOfDeath,
    deceased: obj.deceased,
  };
  return flatObj;
}

/* Converts the object to frontend format */

function _unflatten(obj) {
  bumpyObj = {
    id: obj.id,
    firstName: obj.first_name,
    lastName: obj.last_name,
    gender: obj.gender,
    bloodGroup: obj.blood_group_id,
    dateOfBirth: {
      dayOfBirth: obj.day_of_birth,
      monthOfBirth: obj.month_of_birth,
      yearOfBirth: obj.year_of_birth,
    },
    maritalStatus: obj.marital_status,
    contactInformation: {
      phone: obj.phone,
      email: obj.email,
    },
    address: {
      address1: obj.address,
      townCity: obj.town_city,
      provinceState: obj.province_state,
      country: obj.country,
      postalCode: obj.postal_code,
    },
    astrology: {
      gothra: obj.gothra,
      rasi: obj.rasi_id,
      nakshathra: obj.nakshathra_id,
    },
    imgPath: obj.photo_url,
    relPath: obj.relPath,
    dateOfDeath: obj.date_of_death,
    deceased: obj.deceased,
  };
  return bumpyObj;
}

/* The shortest path algorithm returns the relations between two people. */

async function _modifiedBfs(start, end) {
  adjacencyList = new Map();
  const listOfNodes = await _getRelationsHandler();
  for (a of listOfNodes) {
    b = [];
    if (a.father_id != null) b.push(a.father_id);
    if (a.mother_id != null) b.push(a.mother_id);
    if (a.spouse_id != null) b.push(a.spouse_id);
    if (a.children_id != null) {
      for (child of a.children_id) {
        if (child != null) b.push(Number(child));
      }
    }
    adjacencyList.set(a.person_id, new Set(b));
  }

  const previous = new Map();
  const visited = new Set();
  const queue = [];
  queue.push({ node: start, dist: 0 });
  visited.add(start);
  const pathArray = [];
  let res;

  while (queue.length > 0) {
    const { node, dist } = queue.shift();
    if (node == end) {
      res = { shortestDistance: dist, previous };
      break;
    }

    for (let neighbour of adjacencyList.get(node)) {
      if (!visited.has(neighbour)) {
        previous.set(neighbour, node);
        queue.push({ node: neighbour, dist: dist + 1 });
        visited.add(neighbour);
      }
    }
  }

  pathArray.push(end);
  var next = previous.get(end);
  while (next != null) {
    pathArray.push(next);
    next = previous.get(next);
  }

  if (!res) return { path: ['No Path'], dist: -1 };
  else return { path: pathArray, dist: res.shortestDistance };
}

/* Fetches all relations from from relations table. */

async function _getRelationsHandler() {
  logger.debug('* Connection Open: retrieveRelations');
  text = 'SELECT * FROM relations ORDER BY person_id';
  values = [];
  res = await psqlQuery(text, values);
  logger.debug('* Connection Closed: retrieveRelations');
  return res.rows;
}

/* Internal Function to fetch the people from a given array */

async function _getDataHandler(arr) {
  logger.debug('* Connection Open: getDataHandler');
  text = 'SELECT * FROM person WHERE id in (';
  text += '$1';
  for (i = 1; i < arr.length; i++) text += `,$${i + 1}`;
  text += ') ORDER BY id;';
  values = arr;
  res = await psqlQuery(text, values);
  logger.debug('* Connection Closed: getDataHandler');
  return res.rows;
}

/* Finds relation between two people also calls the path finding algorithm */

async function findRelationBetween(personOne, personTwo) {
  qres = await _modifiedBfs(personOne, personTwo);
  ans = [];
  if (!qres || qres.dist == -1) return returnFailure();
  else {
    /* Getting data about the people */
    peopleFromPath = await _getDataHandler(qres.path.reverse());
    reltypes = await _getRelationMany(qres.path, qres.dist + 1);
    /* Re arrange into actual path */
    relPath = '';

    for (let i = 0; i < qres.path.length; i++) {
      pers = peopleFromPath.find((b) => b.id == qres.path[i]);
      if (i == 0) {
        pers.relPath = 'Self';
      }
      if (i > 0) {
        t1 = Object.values(reltypes.rows).find((key) => key.id == qres.path[i]);

        t2 = Object.keys(t1).find((key) => qres.path[i - 1] == t1[key]);
        if (t2 == 'father_id' || t2 == 'mother_id') {
          pers.prev = 0;
        } else if (t2 == 'spouse_id') {
          pers.prev = 3;
        } else if (t2 == undefined || t2 == 'children_id') {
          if (pers.gender == 'Male') pers.prev = 1;
          else pers.prev = 2;
        }
        relPath += pers.prev;
        pers.relPath = familyMap.get(relPath);
      }
      ans.push(_unflatten(pers));
    }
  }
  return returnSuccess(ans);
}

/* Fetches basic details from table PERSON */

async function getPersonAll() {
  logger.debug(`* Connection Open: getPersons`);
  text = `SELECT id, first_name, last_name, gender, photo_url FROM person ORDER BY id;`;
  values = [];
  res = await psqlQuery(text, values);
  logger.debug(`* Connection Closed: getPersons`);
  if (res) return returnSuccess(res.rows);
  else return returnFailure();
}

/* Fetches all details of one person from table PERSON */

async function getPersonOne(per) {
  logger.debug(`* Connection Open: getPersonOne`);
  text = 'SELECT * FROM person WHERE id=$1';
  values = [per];
  res = await psqlQuery(text, values);
  finalres = _unflatten(res.rows[0]);
  logger.debug(`* Connection Closed: getPersonOne`);
  if (res) return returnSuccess(finalres);
  else return returnFailure();
}

/* Fetch relation of a person from RELATIONS table. */

async function getRelationOne(per) {
  logger.debug(`* Connection Open: getRelationOne`);
  text = `SELECT * FROM relations WHERE person_id=$1`;
  values = [per];
  res = await psqlQuery(text, values);
  logger.debug(`* Connection Closed: getRelationOne`);
  let decodedResponse = await _decodeRelationsIds(res.rows[0]);
  if (decodedResponse) return returnSuccess(decodedResponse);
  else return returnFailure();
}

/* Internal Function used to fetch all records from RELATIONS */
async function _getRelationMany(arr, len) {
  logger.debug(`* Connection Open: getRelationMany`);
  queryVariables = '';
  for (i = 1; i < len; i++) {
    queryVariables += `$${i},`;
  }
  queryVariables += `$${len}`;
  text = `SELECT * FROM relations WHERE person_id in (${queryVariables}) ORDER BY person_id;`;
  values = arr;
  res = await psqlQuery(text, values);
  logger.debug(`* Connection Closed: getRelationMany`);
  return res;
}

/* Internal Function used to add person info to relations info. */

async function _decodeRelationsIds(personObject) {
  logger.debug(`* Connection Open: decodeRelationsIds`);
  person = [];
  tempArr = [];
  tempArr.push(personObject.person_id);
  tempArr.push(personObject.father_id);
  tempArr.push(personObject.mother_id);
  tempArr.push(personObject.spouse_id);
  if (personObject.children_id == null) tempArr.push(personObject.children_id);
  else {
    personObject.children_id.forEach((child) => {
      tempArr.push(child);
    });
  }

  result = await _getDataHandler(tempArr);
  logger.debug(`* Connection Closed: decodeRelationsIds`);
  /* Handle Result Before sending it back the chain */
  finalResult = [];
  dummyObj = {
    id: 0,
  };

  /* Array used to re order the result */

  for (i = 0; i < tempArr.length; i++) {
    if (tempArr[i] == null) {
      finalResult[i] = dummyObj;
    } else {
      finalResult[i] = result.find((element) => element.id == tempArr[i]);
    }
  }

  /* Restructuring Array back into an Object */
  finalResult2 = {};
  finalResult2.person = finalResult[0];
  finalResult2.father = finalResult[1];
  finalResult2.mother = finalResult[2];
  finalResult2.spouse = finalResult[3];
  finalResult2.children = [dummyObj];
  for (i = 4; i < tempArr.length; i++) finalResult2.children[i - 4] = finalResult[i];
  return finalResult2;
}

/* Inserts one entry into persons table and adds their id into the relations table. */

async function addPerson(per) {
  flatper = _flatten(per);

  logger.debug(`* Connection open: addPerson`);
  text = `INSERT INTO person(first_name, last_name, gender, blood_group_id, marital_status, day_of_birth, month_of_birth, year_of_birth, phone, email, address, town_city, province_state, country, postal_code, gothra, rasi_id, nakshathra_id, photo_url, date_of_death,deceased)
   							SELECT first_name, last_name, gender, blood_group_id, marital_status, day_of_birth, month_of_birth, year_of_birth, phone, email, address, town_city, province_state, country, postal_code, gothra, rasi_id, nakshathra_id, photo_url, date_of_death, deceased
                 FROM json_populate_record(NULL::person , $1) RETURNING id;`;
  values = [flatper];
  res = await psqlQuery(text, values);
  logger.debug(`* Connection closed: addPerson`);
  tres = res.rows[0];

  if (res.command == 'INSERT' && res.rowCount == 1) {
    await _putRelation(res.rows[0]);
    return returnSuccess(tres);
  } else return returnFailure();
}

/* Update details about one person in table RELATIONS */

async function updatePersonOne(per) {
  flatper = _flatten(per);

  logger.debug(`* Connection open: updatePersonOne`);
  text = `UPDATE person SET (first_name, last_name, gender, blood_group_id, marital_status, day_of_birth, month_of_birth, year_of_birth, phone, email, address, town_city, province_state, country, postal_code, gothra, rasi_id, nakshathra_id, photo_url, date_of_death,deceased)=
          (SELECT first_name, last_name, gender, blood_group_id, marital_status, day_of_birth, month_of_birth, year_of_birth, phone, email, address, town_city, province_state, country, postal_code, gothra, rasi_id, nakshathra_id, photo_url, date_of_death,deceased
          FROM json_populate_record(NULL::person,$1)) WHERE id=$2 RETURNING id;`;
  values = [flatper, flatper.id];
  res = await psqlQuery(text, values);
  logger.debug(`* Connection closed: updatePersonOne`);

  if (res && res.command == 'UPDATE') return returnSuccess(res.rows[0]);
  else return returnFailure();
}

/* Creates an entry into the relations table everytime a user is added */

async function _putRelation(per) {
  logger.debug(`* Connection open: _putRelation`);
  text = 'INSERT into relations (person_id) VALUES ($1)';
  values = [per.id];
  res = await psqlQuery(text, values);
  logger.debug(`* Connection closed: _putRelation`);
}

/* Updates the relations - Needs rewrite to handle deletions and other stuff. */
async function updateRelation(per) {
  logger.debug(`* Connection open: updateRelation`);
  /* Pre process data */

  per.person_id = Number(per.person_id);
  if (per.father_id == 0) per.father_id = null;
  if (per.mother_id == 0) per.mother_id = null;
  if (per.spouse_id == 0) per.spouse_id = null;
  let childrenArrayCopy = [];
  for (let i = 0; i < per.children_id.length; i++) {
    if (per.children_id[i] != 0) childrenArrayCopy.push(per.children_id[i]);
  }
  per.children_id = childrenArrayCopy;
  /* Primary Query */
  text = `UPDATE relations SET father_id = $2, mother_id = $3, spouse_id = $4, children_id = $5 WHERE person_id = $1;`;
  values = [per.person_id, per.father_id, per.mother_id, per.spouse_id, per.children_id];
  res = await psqlQuery(text, values);
  subtext = [];
  subvalues = [];
  /* Secondary Queries */
  if (per.father_id) {
    subtext.push(
      `UPDATE relations SET children_id= ARRAY(SELECT DISTINCT e FROM unnest(array_append(children_id, $1)) AS a(e) ORDER BY e) WHERE person_id=$2;`
    );
    subvalues.push([per.person_id, per.father_id]);
  }
  if (per.mother_id) {
    subtext.push(
      `UPDATE relations SET children_id=ARRAY (SELECT DISTINCT e FROM unnest(array_append(children_id, $1)) AS a(e) ORDER BY e) WHERE person_id=$2;`
    );
    subvalues.push([per.person_id, per.mother_id]);
  }
  if (per.spouse_id) {
    subtext.push(`UPDATE relations SET spouse_id=$1 WHERE person_id=$2;`);
    subvalues.push([per.person_id, per.spouse_id]);
  }

  if (per.children_id) {
    tempResult = await psqlQuery('SELECT gender from person WHERE id = $1', [per.person_id]);
    if (tempResult.rows[0].gender == 'Male') gender = 'father_id';
    else gender = 'mother_id';
  }
  childrenArrayCopy.forEach((kinder_id) => {
    subtext.push(`UPDATE relations SET ${gender} = $1 WHERE person_id = $2`);
    subvalues.push([per.person_id, kinder_id]);
  });

  for (i = 0; i < subtext.length; i++) {
    await psqlQuery(subtext[i], subvalues[i]);
  }

  logger.debug(`* Connection closed: updateRelation`);

  if (res.command == 'UPDATE') {
    return returnSuccess({});
  } else return returnFailure();
}

module.exports = {
  findRelationBetween,
  getPersonAll,
  getPersonOne,
  updatePersonOne,
  addPerson,
  getRelationOne,
  updateRelation,
};

/* Actual query function */

async function psqlQuery(text, values) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let res = await client.query(text, values);
    await client.query('COMMIT');
    return res;
  } catch (e) {
    await client.query('ROLLBACK');
    console.log(e);
    logger.error(e);
  } finally {
    client.release();
  }
}

/* Used to standardize the output */

function returnSuccess(content) {
  return {
    opSuccess: true,
    opContent: content,
  };
}

function returnFailure() {
  return {
    opSuccess: false,
    opContent: {},
  };
}
