const mongoose = require("mongoose");

const vocabulary = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topic: { type: String, required: true },
  subtitles: { type: String, default: "" },
  vocabulary: Array,
  time: Date,
});

module.exports = mongoose.model("Vocabulary", vocabulary);
