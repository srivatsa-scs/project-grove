exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('blood_group')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('blood_group').insert([
				{ type: 'A+' },
				{ type: 'A-' },
				{ type: 'B+' },
				{ type: 'B-' },
				{ type: 'AB+' },
				{ type: 'AB-' },
				{ type: 'O+' },
				{ type: 'O-' },
				{ type: '?' },
			]);
		});
};
