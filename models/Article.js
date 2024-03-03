const { Schema, model } = require("mongoose");

const ArticleSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  imagen: {
    type: String,
    default: "default.png",
  },
});

module.exports = model("Article", ArticleSchema, "articles");
