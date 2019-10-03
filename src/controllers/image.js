const path = require('path');
const ctrl = {};
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');




ctrl.index = (req, res) => {
    res.send('index')
};

ctrl.create = async (req, res) => {
    const imgUrl = randomNumber();
    console.log(imgUrl);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve("src/public/upload/"+imgUrl+ext);
    //const targetPath = path.resolve('src/public/upload/$imgUrl$ext');
    
    console.log(targetPath);
    if (ext === '.png' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
    }
    res.send("Creacion Correcta");
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};
module.exports = ctrl;