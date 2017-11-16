const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const linkSchema = new Schema ({
    link: {type: String, required: true},
    breed: [{type: ObjectId, ref: 'Felines'}]
})

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;