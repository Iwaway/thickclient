const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpamSchema = new Schema({
    theme: { type: String, required: true, maxLength: 100 },
    body: { type: String, required: true, maxLength: 250 },
});

module.exports = mongoose.model("Spam", SpamSchema);