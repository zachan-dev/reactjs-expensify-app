const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// entry -> output
module.exports = (env) => {
    const isProd = env.production;
    const CSSExtract = new MiniCssExtractPlugin({ // extract styles into a seperate file with mapping
        filename: 'styles.css',
    });

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
        },
        plugins: [
            CSSExtract,
        ],
        module: { // loaders: using babel and ES6-5 convertors
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
            }, {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? 'source-map' : 'inline-source-map', // source maps
        devServer: { // dev live server
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true, // enable client-side routing, return index.html for all routes
            publicPath: '/dist/'
        },
    };
};

