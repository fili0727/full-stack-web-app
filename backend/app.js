import express from "express";
import fs from "fs/promises";
import cors from "cors";
import { log } from "console";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello express.js 🤠");
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("artists.json");
  const users = JSON.parse(data);
  response.json(users);
});
app.get("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  const result = artists.find(artist => artist.id == id);
  response.json(result);
});

app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  artists.push(newArtist);
  // fs.writeFile("data.json", JSON.stringify(sortedUsers));
  response.json(artists);
});

app.put("/artists/:id", async (request, response) => {
  const id = request.params.id;

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  let artistToUpdate = artists.find(artist => artist.id === id);
  const body = request.body;
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.label = body.label;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;

  console.log(body);
  console.log(artists);
  fs.writeFile("artist.json", JSON.stringify(artists));
  response.json(artists);
});

app.delete("/artists/:id", async (request, response) => {
  const id = request.params.id;
  console.log(id);

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  const newArtists = artists.filter(artist => artist.id !== id);

  fs.writeFile("artist.json", JSON.stringify(newArtists));

  response.json(artists);
});

app.listen(1989, () => {
  console.log("hej");
});
