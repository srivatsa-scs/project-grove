exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('rasi')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('rasi').insert([
				{ english: 'Aries', tamil: 'மேஷம்', kannada: 'ಮೇಷ', hindi: 'मेष' },
				{ english: 'Taurus', tamil: 'ரிஷபம்', kannada: 'ವೃಷಭ', hindi: 'वृषभ' },
				{ english: 'Gemini', tamil: 'மிதுனம்', kannada: 'ಮಿಥುನ', hindi: 'मिथुन' },
				{ english: 'Cancer', tamil: 'கடகம்', kannada: 'ಕರ್ಕಾಟಕ', hindi: 'कर्क' },
				{ english: 'Leo', tamil: 'சிம்மம்', kannada: 'ಸಿಂಹ', hindi: 'सिंह' },
				{ english: 'Virgo', tamil: 'கன்னி', kannada: 'ಕನ್ಯಾ', hindi: 'कन्या' },
				{ english: 'Libra', tamil: 'துலாம்', kannada: 'ತುಲಾ', hindi: 'तुला' },
				{ english: 'Scorpio', tamil: 'விருச்சிகம்', kannada: 'ವೃಶ್ಚಿಕ', hindi: 'वृश्चिक' },
				{ english: 'Sagittarius', tamil: 'தனுசு', kannada: 'ಧನು', hindi: 'धनुष' },
				{ english: 'Capricorn', tamil: 'மகரம்', kannada: 'ಮಕರ', hindi: 'मकर' },
				{ english: 'Aquarius', tamil: 'கும்பம்', kannada: 'ಕುಂಭ', hindi: 'कुम्भ' },
				{ english: 'Pisces', tamil: 'மீனம்', kannada: 'ಮೀನ', hindi: 'मीन' },
				{ english: '?', tamil: '?', kannada: '?', hindi: '?' },
			]);
		});
};
