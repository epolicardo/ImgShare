const { Image } = require('../models');

module.exports = {
    //Return most popular images
    async popular() {
        const images = await Image.find()
            .limit(9)
            .sort({ likes: -1 });
        return images;
        }
}