import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
            exports: 'named'
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.lib.json',
            useTsconfigDeclarationDir: true,
        }),
        postcss({
            extensions: ['.css'],
            minimize: true,
            inject: {
                insertAt: 'top',
            },
        }),
        terser(),
    ],
    external: ['react', 'react-dom', 'antd', '@ant-design/icons', 'dayjs', 'use-immer'],
});
