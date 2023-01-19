const express = require("express");
const controllers = require("../controllers/PostControllers.js");
const router = express.Router();

router.post("/", controllers.createPost);
router.get("/:id", controllers.getPost);
router.delete("/:id", controllers.deletePost);
router.put("/:id/like", controllers.likePost);
router.put("/:id/dislike", controllers.dislikePost);
router.get("/posts/:id", controllers.getAllPostByUser);
router.put("/comment/:id", controllers.addComment);

module.exports = router;
