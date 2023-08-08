export default {
    entryList: [
        'home.js', 'about.js'
    ],
    outdir: 'public/assets',
    modes: {
        dev: {
            hash: false,
            minify: false,
            sourcemap: false,
            autoprefixer: false,
            stylelint: {
                enable: false,
                auto_fix: true,
                cache: true
            },
            eslint: {
                enable: false,
                auto_fix: true,
                cache: true
            },
        },
        prod: {
            hash: true,
            minify: true,
            sourceMap: false,
            autoprefixer: true,
            stylelint: {
                enable: true,
                auto_fix: true,
                cache: true
            },
            eslint: {
                enable: true,
                auto_fix: true,
                cache: true
            }
        }
    }
}