exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('nakshathra')
		.del()
		.then(function () {
			// Inserts seed entries
			return knex('nakshathra').insert([
				{ english: 'Ashwini', tamil: 'அஸ்வினி', kannada: 'ಅಶ್ವಿನಿ', hindi: 'अश्विनी' },
				{ english: 'Bharani', tamil: 'பரணி', kannada: 'ಭರಣಿ', hindi: 'भरणी' },
				{ english: 'Kritika', tamil: 'கார்த்திகை', kannada: 'ಕೃತಿಕ', hindi: 'कृत्तिका' },
				{ english: 'Rohini', tamil: 'ரோகிணி', kannada: 'ರೋಹಿಣಿ', hindi: 'रोहिणी' },
				{ english: 'Mrigashira', tamil: 'மிருகசீரிடம்', kannada: 'ಮೃಗಶಿರ', hindi: 'म्रृगशीर्षा' },
				{ english: 'Ardra', tamil: 'திருவாதிரை', kannada: 'ಆರ್ದ್ರ', hindi: 'आर्द्रा' },
				{ english: 'Punarvasu', tamil: 'புனர்பூசம்', kannada: 'ಪುನರ್ವಸು', hindi: 'पुनर्वसु' },
				{ english: 'Pushya', tamil: 'பூசம்', kannada: 'ಪುಷ್', hindi: 'ಯ पुष्य' },
				{ english: 'Ashlesha', tamil: 'ஆயில்யம்', kannada: 'ಆಶ್ಲೇಷ', hindi: 'आश्लेषा' },
				{ english: 'Magha', tamil: 'மகம்', kannada: 'ಮಘ', hindi: 'मघा' },
				{ english: 'Poorva', tamil: 'பூரம்', kannada: 'ಪೂರ್ವ', hindi: 'पूर्व फल्गुनी' },
				{ english: 'Uttara', tamil: 'உத்திரம்', kannada: 'ಉತ್ತರ', hindi: 'उत्तर फल्गुनी' },
				{ english: 'Hasta', tamil: 'அஸ்தம்', kannada: 'ಹಸ್ತ', hindi: 'हस्त' },
				{ english: 'Chitra', tamil: 'சித்திரை', kannada: 'ಚಿತ್ರ', hindi: 'चित्रा' },
				{ english: 'Swathi', tamil: 'சுவாதி', kannada: 'ಸ್ವಾತಿ', hindi: 'स्वाती' },
				{ english: 'Vishakha', tamil: 'விசாகம்', kannada: 'ವಿಶಾಖ', hindi: 'विशाखा' },
				{ english: 'Anuradha', tamil: 'அனுஷம்', kannada: 'ಅನುರಾಧಾ', hindi: 'अनुराधा' },
				{ english: 'Jyeshtha', tamil: 'கேட்டை', kannada: 'ಜ್ಯೇಷ್ಠ', hindi: 'ज्येष्ठा' },
				{ english: 'Moola', tamil: 'மூலம்', kannada: 'ಮೂಲ', hindi: 'मूल' },
				{ english: 'Poorvashadha', tamil: 'பூராடம்', kannada: 'ಪುರ್ವಾಷಾಡ', hindi: 'पूर्वाषाढा' },
				{ english: 'Uttarashadha', tamil: 'உத்திராடம்', kannada: 'ಉತ್ತರಾಷಾಡ', hindi: 'उत्तराषाढा' },
				{ english: 'Shravana', tamil: 'திருவோணம்', kannada: 'ಶ್ರವಣ', hindi: 'श्रवण' },
				{ english: 'Dhanishta', tamil: 'அவிட்டம்', kannada: 'ಧನಿಷ್ಠ', hindi: 'धनिष्ठा' },
				{ english: 'Shatabhisha', tamil: 'சதயம்', kannada: 'ಶತಭಿಷ', hindi: 'शततारका' },
				{ english: 'Poorva Bhadrapada ', tamil: 'பூரட்டாதி', kannada: 'ಪೂರ್ವ ಭಾದ್ರಪದ', hindi: 'पूर्वभाद्रपदा' },
				{ english: 'Uttara Bhadrapada ', tamil: 'உத்திரட்டாதி', kannada: 'ಉತ್ತರ ಭಾದ್ರಪದ', hindi: 'उत्तरभाद्रपदा' },
				{ english: 'Revati', tamil: 'ரேவதி', kannada: 'ರೇವತಿ', hindi: 'रेवती' },
				{ english: '?', tamil: '?', kannada: '?', hindi: '?' },
			]);
		});
};
