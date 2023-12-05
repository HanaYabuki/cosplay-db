const fs = require('fs')
const path = require('path')

const outputJsonFileName = 'meta.json'
const infoFileName = 'info.txt'
const rootDirectory = 'img/'

function traverseDirectory(dirPath) {
    const readDir = fs.readdirSync(dirPath)
    const fileNames = []
    var template = {}
    var templateInfo = ""
    for (const file of readDir) {
        const filePath = path.join(dirPath, file)

        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            traverseDirectory(filePath)
        }
        else {
            if (file.endsWith('.jpg')) {
                fileNames.push(file)
            }
            if (file == outputJsonFileName) {
                template = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            }
            if (file == infoFileName) {
                templateInfo = fs.readFileSync(filePath, 'utf-8').replaceAll('\r\n', '\n')
            }
        }
    }
    if (fileNames.length > 0) {
        template.info = templateInfo
        generateJsonFile(dirPath, fileNames, template)
        const infoTxtPath = path.join(dirPath, 'info.txt')
        if (!fs.existsSync(infoTxtPath)) {
            fs.writeFileSync(infoTxtPath, '')
        }
    }
}

function generateJsonFile(dirPath, fileNames, template) {
    const outputPath = path.join(dirPath, outputJsonFileName)
    const outputDirPath = dirPath.replaceAll('\\', '/')
    const dataObject = genDataObject(outputDirPath, fileNames, template)

    const dataStr = JSON.stringify(dataObject, null, 4)

    fs.writeFileSync(outputPath, dataStr)
    console.log("JSON file generated successfully: ", outputPath)
}

function genDataObject(outputDirPath, fileNames, template) {
    const obj = {
        root: outputDirPath,
        tag: [],
        title: outputDirPath,
        date: "1990/01/01",
        photos: fileNames,
        info: ""
    }
    for (const key of ['tag', 'title', 'date', 'info']) {
        if (key in template) {
            obj[key] = template[key]
        }
    }
    return obj
}

traverseDirectory(rootDirectory)
