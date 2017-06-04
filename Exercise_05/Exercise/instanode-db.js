let Image = require('./models/Image');
let Tag = require('./models/Tag');

function updateTag(tagData) {
    return new Promise((resolve, reject) => {
        Tag.findOne({ name: tagData.name }).then((tag) => {
            tag.images.push(tagData.imageId);
            tag.save().then(() => resolve(`updated tag ${tag.name} with image: ${tagData.imageId}`));
        });
    });
}

function createTag(tagName) {
    return new Promise((resolve, reject) => {
        Tag.findOne({ name: tagName }).then((existingTag) => {
            if (existingTag) {
                resolve(existingTag._id);
                return;
            }
            Tag.create({ name: tagName }).then((tag) => {
                resolve(tag._id);
            });
        });
    });
}

module.exports = {
    saveImage: (imageData) => {
        let tags = imageData.tags;

        let imageObj = {
            url: imageData.url,
            description: imageData.description,
            creationDate: Date.now(),
            tags: []
        }

        let createTagPromises = [];
        for (let tag of tags) {
            createTagPromises.push(
                createTag(tag)
                .then((tagId) => {
                    imageObj.tags.push(tagId);

                    console.log(`image tag ${tagId}is added`);
                })
            )
        }

        Promise.all(createTagPromises).then(() => {
            Image.create(imageObj).then((image) => {
                console.log(`created image ${image._id}`);

                for (let tagName of tags) {
                    updateTag({
                            name: tagName,
                            imageId: image._id
                        })
                        .then((msg) => console.log(msg));
                }
            })
        })
    }, //end saveImage

    findByTag: (tagName) => {
        let foundImages = [];
        let searchedTagId;
        Tag.find({ name: tagName }).exec().then((tag) => {
            searchedTagId = tag._id;

            Image.find().exec().then((images) => {
                for (let img of images) {
                    if (img.tags.find((tagId) => { tagId == searchedTagId }));
                    foundImages.push(img);
                }
                images.sort((imgA, imgB) => {
                    let result = 0;
                    if (imgA.creationDate > imgB.creationDate) {
                        result = -1;
                    }
                    if (imgA.creationDate < imgB.creationDate) {
                        result = 1;
                    }
                    return result;
                });
                console.log(images);
            })
        })
    },

    filter: (minDate, maxDate, results) => {
        if (!minDate) {
            minDate = new Date(-8640000000000000);
        }
        if (!maxDate) {
            maxDate = Date.now();
        }
        if (!results) {
            results = 10;
        }
        return new Promise((resolve, reject) => {
            Image
                .find({
                    creationDate: {
                        $gte: minDate,
                        $lt: maxDate
                    }
                })
                .limit(results)
                .then((images) => {
                    resolve(images);
                });
        });
    }
}