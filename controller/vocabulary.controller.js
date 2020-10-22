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

function vocabulary() {
  return {
    async show(req, res) {
      if (req.session.check && req.session.key && req.session.value) {
        delete req.session.check, req.session.value, req.session.key;
      }
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
      if (!req.session.key && !req.session.value) {
        req.session.key = key;
        req.session.value = value;
      }
      if (!req.session.check) {
        req.session.check = 0;
      }
      res.render("learnVocabulary");
    },

    getLearn(req, res) {
      console.log(req.session.check);
      res.render("learnVocabulary");
    },

    checkVocabulary(req, res) {
      req.session.check += 1;
      res.redirect("/learnVocabulary");
    },
  };
}

module.exports = vocabulary;
