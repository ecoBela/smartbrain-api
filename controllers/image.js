const Clarifai = require("clarifai");
const config = require("./../config");

const app = new Clarifai.App({
  apiKey: config.apiKey,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: Clarifai.FACE_DETECT_MODEL,
        version: "34ce21a40cc24b6b96ffee54aabff139",
      },
      req.body.input
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db.from("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
