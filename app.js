const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const { validateMovie, validateUser } = require("./validator.js");

const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, movieHandlers.postUsers);

app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.put("/api/movies/:id", validateUser, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, movieHandlers.updateUser);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUser);
