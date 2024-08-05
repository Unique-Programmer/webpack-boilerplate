import { BuildOptions } from './types';

export function buildResolvers(options: BuildOptions) {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src,
        },
    }
}