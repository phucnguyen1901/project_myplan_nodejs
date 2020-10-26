const session = require("express-session");
const Vocabulary = require("../models/vocabulary.model");

function mix(array) {
  let newArray = [];
  while (array.length !== 0) {
    const index = Math.floor(Math.random() * array.length);
    // console.log("Index : " + index);
    // console.log(array[index]);
    newArray.push(array[index]);
    array.splice(index, 1);
  }
  return newArray;
}

function objectInArray(element, array) {
  const key = Object.keys(element).toString();
  const value = element[key];
  for (const element of array) {
    const key2 = Object.keys(element).toString();
    const value2 = element[key2];
    if (key2 === key && value === value2) {
      return true;
    }
  }
  return false;
}

function vocabulary() {
  return {
    async show(req, res) {
      const idUser = req.session.idUsername;
      const vocabulary = await Vocabulary.find({ userId: idUser });
      res.render("homeVocabulary", { vocabulary: vocabulary });
    },

    createTopic(req, res) {
      const { nameTopic } = req.body;
      const idMain = req.session.idUsername;
      if (!nameTopic) {
        res.redirect("/homeVocabulary");
      }
      const newTopic = new Vocabulary({
        userId: idMain,
        topic: nameTopic,
        vocabulary: [],
        time: new Date(),
      });
      newTopic
        .save()
        .then((ok) => console.log("you Created new topic "))
        .catch((err) => console.log("Something wrong"));
      res.redirect("/homeVocabulary");
    },

    async addVocabulary(req, res) {
      const { word, vietnamMean, idTopic } = req.body;
      const obj = {};
      obj[word] = vietnamMean;
      Vocabulary.findByIdAndUpdate(
        { _id: idTopic },
        { $push: { vocabulary: obj } },
        (err, data) => {
          if (err) {
            console.log("Error add vocabulary");
          }
          console.log("Add vocabulary successfully");
        }
      );
      res.redirect("/homeVocabulary");
    },

    async addSubtitles(req, res) {
      const { String, idMain } = req.body;
      Vocabulary.findByIdAndUpdate(
        { _id: idMain },
        { subtitles: String },
        (err, data) => {
          if (err) {
            console.log("Error add subtitles");
          } else {
            console.log("Add subtitles successfully");
          }
        }
      );

      res.redirect("/homeVocabulary");
    },

    async getSubtitle(req, res) {
      const { idMain } = req.body;
      const Subtitles = await Vocabulary.find({ _id: idMain });
      res.render("subtitlesVocabulary", { subtitles: Subtitles[0].subtitles });
    },

    async learn(req, res) {
      const { idMain } = req.body;
      const arrayVocabulary = await Vocabulary.find({ _id: idMain });
      const mixArray = mix(arrayVocabulary[0].vocabulary);
      let key = [];
      let value = [];
      for (const element of mixArray) {
        for (const index in element) {
          key.push(index);
          value.push(element[index]);
        }
      }
      req.session.idLearn = idMain;
      req.session.key = key;
      req.session.value = value;
      req.session.check = -1;
      res.render("learnVocabulary");
    },

    getLearn(req, res) {
      res.render("learnVocabulary");
    },

    async checkVocabulary(req, res) {
      if (req.session.check === -1) {
        req.session.check += 1;
        res.redirect("/learnVocabulary");
      } else {
        const { key, value } = req.body;
        const array = await Vocabulary.find({ _id: req.session.idLearn });
        const newArray = array[0].vocabulary;
        const obj = {};
        obj[key] = value;
        if (objectInArray(obj, newArray)) {
          req.session.check += 1;
          req.flash("info", "Correct");
          res.redirect("/learnVocabulary");
        } else {
          req.flash("error", "Incorrect");
          res.redirect("/learnVocabulary");
        }
      }
    },
  };
}

module.exports = vocabulary;
