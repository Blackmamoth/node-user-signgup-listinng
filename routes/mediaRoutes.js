const router = require("express").Router();
const {
  uploadImage,
  getImage,
  getVideo,
  uploadVideo,
} = require("../controllers/mediaController");
const multer = require("multer");
const imgUpload = multer({ dest: "uploads/images" });
const vidUpload = multer({ dest: "uploads/videos" });
const { protectedRoute } = require("../middleware/authMiddleware");

router
  .route("/uploadImg")
  .patch(protectedRoute, imgUpload.single("file"), uploadImage);
router.route("/retrieveImg").post(protectedRoute, getImage);

router
  .route("/uploadVid")
  .patch(protectedRoute, vidUpload.single("file"), uploadVideo);

router.route("/retrieveVid").post(protectedRoute, getVideo);

module.exports = router;
