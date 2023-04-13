const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    surname: { type: String, required: false, maxLength: 100 },
    email: {type: String, required: true, maxLength: 50 }
});

EmailSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.surname) {
    fullname = `${this.family_name} ${this.first_name} ${this.surname}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

module.exports = mongoose.model("Email", EmailSchema);