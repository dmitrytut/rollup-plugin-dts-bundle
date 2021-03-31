import { Options as DtsBundleOptions } from 'dts-bundle';
import { Plugin } from 'rollup';

interface Options {
    /**
     * Rollup hook the plugin should use.
     * @default 'writeBundle'
     */
    readonly hook?: string;

    /**
     * Options for 'dts-bundle' library.
     * @default {
     *     out: 'typings.d.ts',
     * }
     */
    readonly bundle: DtsBundleOptions;

    /**
     * Patterns of files and folders to be deleted on successful typings bundling.
     */
    readonly deleteOnComplete?: ReadonlyArray<string>;

    /**
     * Outputs status to console.
     * @default false
     */
    readonly verbose?: boolean;
}

export default function dtsBundle(options?: Options): Plugin;
