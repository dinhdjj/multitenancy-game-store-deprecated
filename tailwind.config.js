/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['resources/**/*'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
};
