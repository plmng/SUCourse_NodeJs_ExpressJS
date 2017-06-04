const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String },
    creationDate: { type: mongoose.Schema.Types.Date },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
});

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;