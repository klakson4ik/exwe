import { existsSync, writeFileSync, appendFileSync, rmSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export function resolveRoot(...segments) {
    return resolve(__dirname, '..', '..', ...segments)
}
export function writeOrAppendFile(file, wText, aText) {
    if (existsSync(file, (errStat) => { if (errStat) { throw errStat}  })) {
        writeFileSync(file, wText, err => {
            if (err) throw err
        })
    } else {
        appendFileSync(file, aText, (err) => {
            if (err) throw err
        })
    }

}
export function recreateDir(dir) {
    if (existsSync(dir, (errStat) => { if (errStat) { throw errStat}  })) {
        rmSync(dir, { recursive: true, force: true }, err => { if (err) throw err })
        mkdirSync(dir, err => { if (err) throw err })
    } else {
        console.log('not')
        mkdirSync(dir, err => {
            if (err) throw err
        })

    }
}