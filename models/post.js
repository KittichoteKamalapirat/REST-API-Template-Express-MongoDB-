import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// const PostModel = mongoose.model("Post", postSchema);
// export default PostModel;

export default mongoose.model("Post", postSchema);

// module.exports = mongoose.model("Post", new postSchema());
