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
  const states = await statesData();
  res.json(states);
});

const getCities = asyncHandler(async (req, res) => {
  const cities = await citiesData();
  res.json(cities);
});

module.exports = { getCountries, getStates, getCities };
