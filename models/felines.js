const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    ObjectId = Schema.Types.ObjectId;

const felineSchema = new Schema ({
    breed: {type: String, required: true},
    fur_length: {type: String, required: true},
    health: {type: String, required: true},
    family_friendly: {type: String, required: true},
    cat_id: ObjectId
})

const Feline = mongoose.model('Feline', felineSchema);
module.exports = Feline;