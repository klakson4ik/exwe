const fs = require('fs')
const path = require('path')

module.exports = {
    resolveRoot: (...segments) => {
        return path.resolve(__dirname, '..', '..', ...segments)
    },

    writeOrAppendFile: (file, wText, aText) => {
        if (fs.existsSync(file, (errStat) => { if (errStat) { throw errStat } })) {
            fs.writeFileSync(file, wText, err => {
                if (err) throw err
            })
        } else {
            fs.appendFileSync(file, aText, (err) => {
                if (err) throw err
            })
        }

    },

    recreateDir: (dir) => {
        if (fs.existsSync(dir, (errStat) => { if (errStat) { throw errStat } })) {
            fs.rmSync(dir, { recursive: true, force: true }, err => { if (err) throw err })
            fs.mkdirSync(dir, err => { if (err) throw err })
        } else {
            console.log('not')
            fs.mkdirSync(dir, err => {
                if (err) throw err
            })

        }
    }
}