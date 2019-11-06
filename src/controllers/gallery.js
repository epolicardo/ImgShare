const ctrl = {};
const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');


ctrl.index = async (req, res) => {
    const images = await Image.find().sort({timestamp: -1});
        let viewmodel = {images:[]};
        viewmodel.images = images;
        viewmodel = await sidebar(viewmodel);
        //console.log(viewmodel.sidebar.comments[0].image)
        res.render('gallery', viewmodel);

};

module.exports = ctrl; 