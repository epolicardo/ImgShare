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
    const viewModel = { image: {}, comments: {} };

    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({ image_id: image._id })
        viewModel.comments = comments;
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
};

//Controlador encargado de crear una nueva imagen.
ctrl.create = async (req, res) => {

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

ctrl.like = async (req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } })
    if (image) {
        image.likes = image.likes + 1;
        await image.save();
        res.json({ likes: image.likes });
    }else{
res.status(500).json({error:'Internal error'});
    }
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

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        await fs.unlink(path.resolve('./src/public/upload/'+ image.filename));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.json(true);
    }
};
module.exports = ctrl;