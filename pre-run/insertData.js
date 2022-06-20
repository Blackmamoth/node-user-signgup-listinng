const mongoose = require("mongoose");
const countries = require("../json_data/countries.json");
const states = require("../json_data/states.json");
const cities = require("../json_data/cities.json");

/*
try {
  mongoose.connect(
    "mongodb://localhost/users_listing",
    {
      useNewUrlParser: true,
    },
    () => {
      console.log("Connected");
    }
  );
} catch (error) {
  console.log(error.message);
}
*/

const countrySchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
    iso3: { type: String },
    iso2: { type: String },
    numeric_code: { type: String },
    phone_code: { type: String },
    capital: { type: String },
    currency: { type: String },
    currency_name: { type: String },
    currency_symbol: { type: String },
    tld: { type: String },
    native: { type: String },
    region: { type: String },
    subregion: { type: String },
    timezone: { type: Array },
    translations: { type: Object },
    latitude: { type: String },
    longitude: { type: String },
    emoji: { type: String },
    emojiU: { type: String },
  },
  { collection: "countries" }
);

const stateSchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    country_id: { type: Number },
    country_code: { type: String },
    country_name: { type: String },
    state_code: { type: String },
    type: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
  { collection: "states" }
);

const citySchema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    state_id: { type: Number },
    state_code: { type: String },
    state_name: { type: String },
    country_id: { type: Number },
    country_code: { type: String },
    country_name: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    wikiDataId: { type: String },
  },
  { collection: "cities" }
);

const Country = mongoose.model("Country", countrySchema);
const State = mongoose.model("States", stateSchema);
const City = mongoose.model("Cities", citySchema);

const countriesData = async () => {
  const countries = await Country.find();
  return countries;
};

const insertCountry = async () => {
  for (let country of countries) {
    await Country.create({ ...country });
  }
};

const insertState = async () => {
  for (let state of states) {
    await State.create({ ...state });
  }
};

const statesData = async (country) => {
  const states = await State.find({ country_name: country });
  return states;
};

const insertCity = async () => {
  for (let city of cities) {
    await City.create({ ...city });
  }
  console.log("Done");
};

const citiesData = async (state) => {
  const cities = await City.find({ state_name: state });
  return cities;
};

module.exports = {
  countriesData,
  statesData,
  citiesData,
};
