const path = require('path');

module.exports = {
    mode: "development",
    entry: './promise/promise_test_10.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'build'),
    },
};