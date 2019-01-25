module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/client.js'],
    output: {
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000,
        open:true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        { 
            test: /\.css$/,
            exclude:/node_modules/,
            loader:['style-loader','css-loader']
        }
        // ,
        // {
        //     test:/\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|html)$/,
        //     exclude:/node_modules/,
        //     loader:'file?name=[path][name].[ext]&context=./public/'
        // }
        ]
    },
    performance:{
        hints:false
    }
};