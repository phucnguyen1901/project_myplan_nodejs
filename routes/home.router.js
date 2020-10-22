// const express = require("express");
const controller = require("../controller/home.controller");
const vocabulary = require("../controller/vocabulary.controller");
const middleware = require("../middleware/auth.middleware");
const deleteSession = require("../middleware/session.middleware");
// const router = express.Router();

// router.get("/", middleware.requireAuth, controller.home);
// router.post("/out", controller.out);
// router.post("/create", controller.homePost);
// router.post("/confirm", controller.confirmComplete);
// router.post("/confirmDelete", controller.confirmDelete);

function Route(app) {
  app.get("/", middleware.requireAuth, controller.home);
  app.post("/out", controller.out);
  app.post("/create", controller.homePost);
  app.post("/confirm", controller.confirmComplete);
  app.post("/confirmDelete", controller.confirmDelete);

  //Vocabulary
  app.get(
    "/homeVocabulary",
    middleware.requireAuth,
    deleteSession.deleteSession,
    vocabulary().show
  );
  app.post("/createTopic", vocabulary().createTopic);
  app.post("/addVocabulary", vocabulary().addVocabulary);
  app.get("/learnVocabulary", vocabulary().getLearn);
  app.post("/learnVocabulary", vocabulary().learn);
  app.get("/checkVocabulary", vocabulary().checkVocabulary);
  app.post("/addSubtitles", vocabulary().addSubtitles);
  app.post("/getSubtitles", vocabulary().getSubtitle);
}

//Home vocabulary

module.exports = Route;
