const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
			mono: ['JetBrains Mono', 'monospace']
		},
		extend: {}
	},

	plugins: [forms, typography]
};

module.exports = config;
