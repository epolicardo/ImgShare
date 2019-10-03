const path = require('path');
const ctrl = {};
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');

//Esto es lo mismo que sin el index, ya que node por defecto, cuando importa, busca el index
//const { Image } =  require('../models/index');
const { Image } = require('../models');


ctrl.index = (req, res) => {
    res.send('index')
};

ctrl.create =  (req, res) => {

    const  saveImage = async() => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl });

        if (images.length > 0) {
            saveImage();
        }else{
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve("src/public/upload/" + imgUrl + ext);
            //const targetPath = path.resolve('src/public/upload/$imgUrl$ext');
           
            if (ext === '.png' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                title: req.body.title,
                filename: imgUrl + ext,
                description: req.body.description,
            })
            const imageSaved = await newImage.save();
            res.send('Works');
        
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'Only format accepted' });
            }
        }
    };

    saveImage();

};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};
module.exports = ctrl;