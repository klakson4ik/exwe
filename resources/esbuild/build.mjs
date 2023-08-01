import esbuild from 'esbuild'
import { argv } from 'process'
import mode from './mode.mjs'


esbuild.build(mode[argv[2]] || mode.dev);