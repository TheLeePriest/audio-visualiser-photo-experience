module.exports = {
    extends: "airbnb",
    rules: {
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx'],
            },
        ],
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
    },
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    plugins: ['html', 'prettier', 'react-hooks', 'eslint-plugin-cypress', 'styled-components-config'],
};
