const path = require('path');

// entry -> output
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: { // loaders: using babel and ES6-5 convertors
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }]
    },
    devtool: 'eval-cheap-module-source-map', // source maps for development only
    devServer: { // dev live server
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true, // enable client-side routing, return index.html for all routes
    },
};

