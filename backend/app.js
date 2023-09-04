import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello express.js 🤠");
});

app.get("/artists", async (request, response) => {
  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  const sortedArtists = artists.sort((a, b) => a.name.localeCompare(b.name));
  response.json(sortedArtists);
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
  fs.writeFile("artists.json", JSON.stringify(artists));
  response.json(artists);
});

app.put("/artists/:id", async (request, response) => {
  const id = request.params.id;

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);
  // const sortedArtists = artists.sort((a, b) => a.name.localeCompare(b.name));
  let artistToUpdate = artists.find(artist => artist.id == id);
  const body = request.body;
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.label = body.label;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;
  artistToUpdate.favorite = body.favorite;

  console.log(body);
  console.log(artists);
  fs.writeFile("artists.json", JSON.stringify(artists));
  response.json(artists);
});

app.delete("/artists/:id", async (request, response) => {
  const id = request.params.id;
  console.log(id);

  const data = await fs.readFile("artists.json");
  const artists = JSON.parse(data);

  const newArtists = artists.filter(artist => artist.id != id);

  fs.writeFile("artists.json", JSON.stringify(newArtists));

  response.json(artists);
});

// app.get("/favorites", async (request, response) => {
//   const data = await fs.readFile("favorites.json");
//   const favorites = JSON.parse(data);
//   const sortedFavorites = favorites.sort((a, b) =>
//     a.name.localeCompare(b.name)
//   );
//   response.json(sortedFavorites);
// });

// app.get("/favorites/:id", async (request, response) => {
//   const id = Number(request.params.id);
//   console.log(id);
//   const data = await fs.readFile("favorites.json");
//   const favorites = JSON.parse(data);
//   const result = favorites.find(favorite => favorite.id == id);
//   response.json(result);
// });

// app.post("/favorites", async (request, response) => {
//   const newFavorite = request.body;
//   newFavorite.id = new Date().getTime();
//   const data = await fs.readFile("favorites.json");
//   const favorites = JSON.parse(data);
//   favorites.push(newFavorite);
//   fs.writeFile("favorites.json", JSON.stringify(favorites));
//   response.json(favorites);

//   if (favorites.includes(newFavorite)) {
//     favorites.filter(newFavorite => newFavorite !== favorites);
//   }
//   response.json({ success: true });
// });

// app.delete("/favorites/:id", async (request, response) => {
//   const id = request.params.id;
//   console.log(id);

//   const data = await fs.readFile("favorites.json");
//   const favorites = JSON.parse(data);

//   const newFavorites = favorites.filter(favorite => favorite.id != id);

//   fs.writeFile("favorites.json", JSON.stringify(newFavorites));

//   response.json(favorites);
// });

app.listen(1989, () => {
  console.log("hej");
});
