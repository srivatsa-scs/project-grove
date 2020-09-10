exports.up = async function (knex) {
  return knex.schema
    .createTable('blood_group', (table) => {
      table.increments('id').primary();
      table.string('type');
    })
    .createTable('rasi', (table) => {
      table.increments('id').primary();
      table.string('english');
      table.string('tamil');
      table.string('kannada');
      table.string('hindi');
    })
    .createTable('nakshathra', (table) => {
      table.increments('id').primary();
      table.string('english');
      table.string('tamil');
      table.string('kannada');
      table.string('hindi');
    })
    .createTable('person', (table) => {
      table.increments('id').primary();
      table.string('first_name', 100).notNullable();
      table.string('last_name', 100).notNullable();
      table.string('gender', 20).notNullable();
      table.integer('blood_group_id').references('id').inTable('blood_group').index().onDelete('CASCADE');
      table.integer('marital_status');
      table.string('day_of_birth', 2);
      table.integer('month_of_birth', 2);
      table.string('year_of_birth', 4);
      table.string('phone', 15);
      table.string('email');
      table.string('address');
      table.string('town_city');
      table.string('province_state');
      table.string('country');
      table.string('postal_code');
      table.string('gothra');
      table.integer('rasi_id').references('id').inTable('rasi').index().onDelete('CASCADE');
      table.integer('nakshathra_id').references('id').inTable('nakshathra').index().onDelete('CASCADE');
      table.string('photo_url');
      table.boolean('deceased').defaultTo(false);
      table.date('date_of_death');
    })
    .createTable('relations', (table) => {
      table.increments('id');
      table.integer('person_id').references('id').inTable('person').index().notNullable().onDelete('CASCADE');
      table.integer('father_id').references('id').inTable('person').onDelete('CASCADE');
      table.integer('mother_id').references('id').inTable('person').onDelete('CASCADE');
      table.integer('spouse_id').references('id').inTable('person').onDelete('CASCADE');
      table.specificType('children_id', 'integer[]');
    });
};

exports.down = async function (knex) {
  await knex.schema
    .dropTable('relations')
    .dropTable('person')
    .dropTable('blood_group')
    .dropTable('rasi')
    .dropTable('nakshathra');
};
