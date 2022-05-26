const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VacancySchema = new Schema({
  position: {
    type: String,
    required: true,
  },
  ageStart: Number,
  ageEnd: Number,
  gender: String,
  requirements: String,
  covered: {
      type: Boolean,
      default: false
  },
  coveredDate: Date
});

module.exports = mongoose.model("vacancies", VacancySchema);
