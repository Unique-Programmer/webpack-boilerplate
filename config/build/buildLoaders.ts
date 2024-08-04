import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types';

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development';

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
            },
        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        /* order important here - processing order for installed packs,
        can be provide one or array of loaders */
        use: [
            // Creates `style` nodes from JS strings
            // "style-loader",

            // MiniCssExtractPlugin for extracting css in own files (!recommended)
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [scssLoader, tsLoader]
}