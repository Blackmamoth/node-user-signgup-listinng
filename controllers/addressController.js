const asyncHandler = require("express-async-handler");
const countries = require("../json_data/countries.json");
const states = require("../json_data/states.json");
const cities = require("../json_data/cities.json");

const getCountries = asyncHandler(async (req, res) => {
  res.json(countries);
});

const getStates = asyncHandler(async (req, res) => {
  res.json(states);
});

const getCities = asyncHandler(async (req, res) => {
  res.json(cities);
});

module.exports = { getCountries, getStates, getCities };
