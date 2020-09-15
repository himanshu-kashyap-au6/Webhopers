const path = require('path')
const DatauriParser = require('datauri/parser');
const dataURIChild = new DatauriParser();


module.exports = function(originalFileName, buffer){
    const extension = path.extname(originalFileName)
    return dataURIChild.format(extension, buffer).content
}