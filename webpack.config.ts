import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


// importing types for supporting devServer field
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode;
    port: number;
}

export default (env: EnvVariables) => {
    // can use isDev for two different configurations, without using a lot of conditions in one
    const isDev = env.mode === 'development';
    const isProd = env.mode === 'production';
    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        // entry can be array of entry points
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            // setting file name with addition parts from content hash
            filename: '[name].[contenthash].js',
            // auto build clean previous for new
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
            isDev && new webpack.ProgressPlugin(),
            // MiniCssExtractPlugin for extracting css in own files (!recommended)
            isProd && new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            // filter by Boolean, for exclude unnecesary values, can be errors in without filter 
        ].filter(Boolean),
        module: {
            rules: [
            {
                test: /\.css$/i,
                /* order important here - processing order for installed packs,
                can be provide one or array of loaders */
                use: [
                    // Creates `style` nodes from JS strings
                    // "style-loader",

                    // MiniCssExtractPlugin for extracting css in own files (!recommended)
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
              {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            // --env port setted in start script package.json
            port: env.port ?? 3000,
            open: true,
        } : undefined,
    }

    return config;
}