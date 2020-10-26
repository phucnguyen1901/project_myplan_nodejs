module.exports.deleteSession = (req, res, next) => {
  if (req.session.check) {
    delete req.session.check;
  }
  if (req.session.value) {
    delete req.session.value;
  }
  if (req.session.key) {
    delete req.session.key;
  }
  if (req.session.idLearn) {
    delete req.session.idLearn;
  }
  next();
};
