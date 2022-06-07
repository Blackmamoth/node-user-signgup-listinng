const {
  getCountries,
  getStates,
  getCities,
} = require("../controllers/addressController");
const router = require("express").Router();

router.route("/countries").get(getCountries);
router.route("/states").get(getStates);
router.route("/cities").get(getCities);

module.exports = router;
