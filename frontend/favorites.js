"use strict";

import { endpoint, createArtist } from "./rest.js";

import { updateGrid } from "./app.js";

let favoritesArray = [];

async function readFavorites() {
  const response = await fetch(`${endpoint}/favorites`);
  const data = await response.json();
  favoritesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  // const artists = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  return favoritesArray;
}

function displayFavorites(list) {
  document.querySelector("#favorites").innerHTML = "";

  for (const artist of list) {
    document.querySelector("#favorites").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
            <article class="grid-item-user">
            <img src="${artist.image}">
                <h2>${artist.name}</h2>
                <h3>${artist.shortDescription}</h3>
                <p>Born: ${artist.birthdate}</p>
                <p>Career start: ${artist.activeSince}</p>
                <p>Genres: ${artist.genres} </p>
                <p>Label: ${artist.label}</p>
                <a href="${artist.website}">Artist website</a>
    
                <div class="btns">
                    <button class="btn-favorite">Remove from favorites</button>
                </div> 
            </article>
        `
    );

    document
      .querySelector("#favorites article:last-child .btn-favorite")
      .addEventListener("click", () => removeFromFavorites(artist));
  }
}

async function removeFromFavorites(artist) {
  console.log(artist.id);
  const response = await fetch(`${endpoint}/favorites/${artist.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    updateGrid();
  }
}

function deleteFavorite() {}

function addToArray(artist) {}

async function updateFavoritesGrid() {
  const artists = await readFavorites();
  displayFavorites(artists);
}

// function prepareData(dataObject) {
//   console.log(dataObject);
//   const array = [];
//   for (const key in dataObject) {
//     const object = dataObject[key];
//     object.id = key;
//     array.push(object);
//   }
//   return array;
// }

export { updateFavoritesGrid, favoritesArray };
