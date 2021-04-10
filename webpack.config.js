const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

// distinguish development(local), test(jest) and production(heroku) envs
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
switch(process.env.NODE_ENV) {
    case 'test':
        require('dotenv').config({ path: '.env.test' });
        break;
    case 'development':
        require('dotenv').config({ path: '.env.development' });
        break;
};


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
            new webpack.DefinePlugin({ // pass all env variables down to app.js
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
            }),
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

