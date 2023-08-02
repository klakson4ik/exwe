import { existsSync, writeFileSync, appendFileSync, rmSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'
import { cwd } from 'process';

export const resolveRoot = (...segments) => {
    return resolve(cwd(), ...segments)
}
export const writeOrAppendFile = (file, wText, aText) => {
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
export const recreateDir = (dir) =>  {
    if (existsSync(dir, (errStat) => { if (errStat) { throw errStat}  })) {
        rmSync(dir, { recursive: true, force: true }, err => { if (err) throw err })
        mkdirSync(dir, err => { if (err) throw err })
    } else {
        mkdirSync(dir, err => {
            if (err) throw err
        })

    }
}

export const getRecursiveFiles = (inputDir, arrFiles = []) => {
    const dir = readdirSync(inputDir, (err) => {
        if (err) { throw err }
    });
    dir.forEach(file => {
        const filePath = join(inputDir, file)
        if (statSync(filePath, errStat => {
            if (errStat) throw errStat;
        }).isDirectory())
            arrFiles = getRecursiveFiles(filePath, arrFiles);
        else {
            arrFiles.push(filePath);
        }
    })
    return arrFiles
}