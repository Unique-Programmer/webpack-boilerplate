import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'development',
        // entry can be array of entry points
        entry: paths.entry,
        output: {
            path: paths.output,
            // setting file name with addition parts from content hash
            filename: '[name].[contenthash].js',
            // auto build clean previous for new
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}