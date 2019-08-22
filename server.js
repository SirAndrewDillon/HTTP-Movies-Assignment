const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());

let movies = [
  {
    id: 71,
    title: "Fast Times at Ridgemont High",
    director: "Francis Ford Coppola",
    metascore: 100,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/6079/p6079_v_v8_ae.jpg",
    stars: ["Sean Penn ", "Phoebe Cates ", "Judge Reinhold "]
  },
  {
    id: 96,
    title: "Star Wars",
    director: "George Lucas",
    metascore: 92,
    image: "https://mvpo.us/img/P5868.jpg",
    stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"]
  },
  {
    id: 87,
    title: "Animal House",
    director: "Peter Jackson",
    metascore: 92,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/3642/p3642_v_v8_ae.jpg",
    stars: ["John Belushi", "Kevin Bacon", "Bruce McGill"]
  },
  {
    id: 44,
    title: "Terminator 3: Rise of the Machines",
    director: "James Cameron",
    metascore: 94,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/32090/p32090_v_v8_aa.jpg",
    stars: ["Arnold Schwarzenegger", "Nick Stahl", "Claire Danes"]
  },
  {
    id: 19,
    title: "Back to the Future",
    director: "Robert Zemeckis ",
    metascore: 99,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/8717/p8717_v_v8_an.jpg",
    stars: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"]
  },
  {
    id: 12,
    title: "Ferris Bueller's Day Off",
    director: "John Hughes",
    metascore: 95,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/9316/p9316_v_v8_aa.jpg",
    stars: ["Matthew Broderick", "Alan Ruck", "Charlie Sheen"]
  },
  {
    id: 86,
    title: "Weird Science",
    director: "John Hughes",
    metascore: 92,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/9273/p9273_v_v8_ac.jpg",
    stars: ["Anthony Michael Hall", "Kelly LeBrock", "Bill Paxton"]
  },
  {
    id: 42,
    title: "Pulp Fiction",
    director: "John Hughes",
    metascore: 98,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/15684/p15684_v_v8_an.jpg",
    stars: ["John Travolta", "Bruce Willis", "Samuel L. Jackson"]
  },
  {
    id: 99,
    title: "Se7en",
    director: "David Fincher",
    metascore: 94,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/17198/p17198_v_v8_ac.jpg",
    stars: ["Morgan Freeman", "Brad Pitt", "Gwyneth Paltrow"]
  },
  {
    id: 29,
    title: "Full Metal Jacket",
    director: "Stanley Kubrick",
    metascore: 96,
    image: "http://www.gstatic.com/tv/thumb/v22vodart/10114/p10114_v_v8_ag.jpg",
    stars: ["Matthew Modine", "R. Lee Ermey", "Vincent D'Onofrio"]
  }
];

let movieId = movies.length;

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.filter(movie => `${movie.id}` === req.params.id)[0];
  res.status(200).json(movie);
});

app.post("/api/movies", (req, res) => {
  if (req.body.title !== undefined) {
    const newMovie = req.body;
    newMovie["id"] = movieId;
    movies.push(newMovie);
  }
  ++movieId;
  res.status(201).json(movies);
});

app.put("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.director ||
    !req.body.metascore ||
    !req.body.stars
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  movies = movies.map(movie => {
    if (`${movie.id}` === req.params.id) {
      return req.body;
    }
    return movie;
  });
  res.status(200).send(req.body);
});

app.delete("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  movies = movies.filter(movie => `${movie.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function (req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
