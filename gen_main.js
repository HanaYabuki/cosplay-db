const fs = require('fs')
const path = require('path')

const outputJsonFileName = 'meta.json'
const rootDirectory = 'img/'

const metaArr = [];

function traverseDirectory(dirPath, arr) {
    const readDir = fs.readdirSync(dirPath)
    for (const file of readDir) {
        const filePath = path.join(dirPath, file)

        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            traverseDirectory(filePath, arr)
        }
        else {
            if (file == outputJsonFileName) {
                const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
                arr.push(content)
            }
        }
    }
}

traverseDirectory(rootDirectory, metaArr)
fs.writeFileSync('main.json', JSON.stringify(metaArr))