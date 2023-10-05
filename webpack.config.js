let path = require('path')

module.exports = {
    entry: path.resolve(__dirname,'main.js'),
    output: {
        path: path.resolve(__dirname,'output'),
        filename: "index.js"
    },
    mode: "development"
}