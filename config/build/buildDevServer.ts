// importing types for supporting devServer field
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types';

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
    return {
        // --env port setted in start script package.json
        port: port,
        open: true,
    }
}