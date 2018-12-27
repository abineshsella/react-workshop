module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/client.js'],
    output: {
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};