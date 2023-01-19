const express = require("express");
const {
  followUser,
  getUser,
  unfollowUser,
} = require("../controllers/UserControllers.js");

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;
