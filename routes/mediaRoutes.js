const router = require("express").Router();
const { uploadImage } = require("../controllers/mediaController");
const multer = require("multer");
const upload = multer();

router.route("/upload").post(upload.single("file"), uploadImage);

module.exports = router;
