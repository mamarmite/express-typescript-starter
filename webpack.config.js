const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/start.ts',
    devtool: 'source-map',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@Server": path.resolve(__dirname, "./src/Server")
        },
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist")
    },
};