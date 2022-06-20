const asyncHandler = require("express-async-handler");
const {
  countriesData,
  statesData,
  citiesData,
} = require("../pre-run/insertData");

const getCountries = asyncHandler(async (req, res) => {
  const countries = await countriesData();
  res.json(countries);
});

const getStates = asyncHandler(async (req, res) => {
  const { country } = req.query;
  const states = await statesData(country);
  res.json(states);
});

const getCities = asyncHandler(async (req, res) => {
  const { state } = req.query;
  const cities = await citiesData(state);
  res.json(cities);
});

module.exports = { getCountries, getStates, getCities };
