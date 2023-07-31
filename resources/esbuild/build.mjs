import esbuild from 'esbuild'
import { argv, config } from 'process'
import { dev, prod } from './assembly.mjs'

config = argv[2] || dev;

esbuild.build(config);