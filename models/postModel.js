const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    likes: [
      {
        type: String,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    comments: [
      {
        comment: String,
        createdAt: { type: Date, default: Date.now() },
        commenter: { type: String, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

var Post = mongoose.model("Posts", postSchema);

module.exports = Post;
