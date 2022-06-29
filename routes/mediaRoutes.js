const router = require("express").Router();
const {
  uploadImage,
  getImage,
  getVideo,
  uploadVideo,
  uploadDocument,
  getDocument,
} = require("../controllers/mediaController");
const multer = require("multer");
const imgUpload = multer({
  dest: "uploads/images",
});
const vidUpload = multer({ dest: "uploads/videos" });
const docUpload = multer({ dest: "uploads/documents" });
const { protectedRoute } = require("../middleware/authMiddleware");

const checkImageMimeType = (file, cb) => {
  const mimeType = file.mimetype.split("/")[0];
  if (mimeType !== "image") {
    return cb("Error", "Image only");
  }
  return cb(null, true);
};

router
  .route("/uploadImg")
  .patch(protectedRoute, imgUpload.single("file"), uploadImage);
router.route("/retrieveImg").post(protectedRoute, getImage);

router
  .route("/uploadVid")
  .patch(protectedRoute, vidUpload.single("file"), uploadVideo);
router.route("/retrieveVid").post(protectedRoute, getVideo);

router
  .route("/uploadDoc")
  .patch(protectedRoute, docUpload.single("file"), uploadDocument);
router.route("/retrieveDoc").post(protectedRoute, getDocument);

module.exports = router;
