var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/ParsleyVisualLayout.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'ParsleyVisualLayout.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}