const router = require("express").Router();
const { uploadImage } = require("../controllers/mediaController");

router.route("upload").post(uploadImage);

module.exports = router;
