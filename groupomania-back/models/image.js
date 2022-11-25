var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ImageSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        img: {data: Buffer, contentType: String}
    }
);

module.exports = mongoose.model("Image", ImageSchema);