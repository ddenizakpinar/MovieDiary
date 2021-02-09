const router = require("express").Router();
const Movie = require("../models/Movie");

// Get all movies
router.get("/getAll", async (req, res) => {
  try {
    await Movie.find({}, (err, response) => {
      if (err) {
        res.send({ err: err });
      }
      res.json(response);
    });
  } catch (err) {
    res.send({ err: err });
  }
});

// Insert new movie
router.post("/new", async (req, res) => {
  const { imdbID, Title, Type, Year, Poster } = req.body;

  const movie = new Movie({
    imdbID: imdbID,
    Title: Title,
    Type: Type,
    Year: Year,
    Poster: Poster,
  });

  try {
    await movie
      .save()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.send({ err: err });
      });
  } catch (err) {
    res.send({ err: err });
  }
});

// Delete a movie
router.delete("/remove", async (req, res) => {
  const { imdbID } = req.body;

  try {
    await Movie.deleteOne({ imdbID: imdbID })
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.send({ err: err });
      });
  } catch (err) {
    res.send({ err: err });
  }
});

router.get("/", (req, res) => res.send("Api/Movie"));

module.exports = router;
