const path = require('path');
const ctrl = {};
const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5');

//Esto es lo mismo que sin el index, ya que node por defecto, cuando importa, busca el index
//const { Image } =  require('../models/index');
const { Image, Comment } = require('../models');

//Controlador encargado de mostrar la vista inicial
ctrl.index = async (req, res) => {
    const viewModel = { image: {}, coments: {} };

    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({ image_id: image._id })
        viewModel.coments = comments;
        res.render('image', { viewModel });
    } else {
        res.redirect('/');
    }
};

//Controlador encargado de crear una nueva imagen.
ctrl.create = (req, res) => {

    const saveImage = async () => {
        const imgUrl = randomNumber();
        const images = await Image.find({ filename: imgUrl });

        if (images.length > 0) {
            saveImage();
        } else {
            console.log(imgUrl);
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve("src/public/upload/" + imgUrl + ext);
            //const targetPath = path.resolve('src/public/upload/$imgUrl$ext');

            if (ext === '.png' || ext === '.gif' || ext === '.jpg') {
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description,
                })
                const imageSaved = await newImage.save();
                res.redirect('/images/' + imgUrl);

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

ctrl.comment = async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        const newCommentSaved = await newComment.save();
        console.log(newCommentSaved);
        res.redirect('/images/' + image.uniqueId);
        alert("EL comentario fue guardado correctamente");
    } else {
        redirect('/');
    }



};

ctrl.remove = (req, res) => {

};
module.exports = ctrl;