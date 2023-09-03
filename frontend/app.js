"use strict";

import {
  updateArtistsGrid,
  createArtist,
  deleteArtist,
  updateArtist,
  endpoint,
  selectArtist,
} from "./rest.js";

import { updateFavoritesGrid, favoritesArray } from "./favorites.js";

let favoriteArtists = [];
let sortType = "normal";
let filterOption = "alle";
let teamOption = "";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("js is working");
  updateGrid();

  document
    .querySelector("#create-artist-btn")
    .addEventListener("click", showCreateUserDialog);
  document
    .querySelector("#form-create-artist")
    .addEventListener("submit", createArtist);

  document
    .querySelector("#extra-genre-btn-create")
    .addEventListener("click", () =>
      addGenreToOutput(
        document.querySelector("#create-genres"),
        document.querySelector("#genre-output-create")
      )
    );
  document
    .querySelector("#remove-genre-btn-create")
    .addEventListener("click", () =>
      removegenreToOutput(document.querySelector("#genre-output-create"))
    );
}

function updateGrid() {
  updateFavoritesGrid();
  updateArtistsGrid();
}

function showCreateUserDialog() {
  document.querySelector("#dialog-create-artist").showModal();
}

function displayArtists(list) {
  document.querySelector("#artists-grid").innerHTML = "";

  for (const artist of list) {
    document.querySelector("#artists-grid").insertAdjacentHTML(
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
                    <button class="btn-update">Edit</button>
                    <button class="btn-delete">Delete</button>
                    <button class="btn-favorite">add to fave</button>
                </div> 
            </article>
        `
    );
    document
      .querySelector("#artists-grid article:last-child .btn-update")
      .addEventListener("click", () => selectArtist(artist));

    document
      .querySelector("#artists-grid article:last-child .btn-delete")
      .addEventListener("click", () => deleteClicked(artist));

    document
      .querySelector("#artists-grid article:last-child .btn-favorite")
      .addEventListener("click", () => addToFavorites(artist));
  }
}

async function addToFavorites(artist) {
  console.log(artist);
}

function addGenreToOutput(genreSelector, outputSelector) {
  console.log(genreSelector);
  const genreValue = genreSelector.value;
  if (
    genreValue != "" &&
    outputSelector.textContent.includes(genreValue) == false
  )
    if (outputSelector.textContent != "")
      outputSelector.textContent += ", " + genreValue;
    else outputSelector.textContent += genreValue;
}
function removeGenreToOutput(outputSelector) {
  outputSelector.textContent = "";
}

function deleteClicked(artist) {
  console.log("Knappen Virker");
  console.log(artist);
  document.querySelector("#dialog-delete-artist").showModal();
  document.querySelector("#dialog-delete-artist-name").textContent =
    artist.name;
  document.querySelector("#btn-no").addEventListener("click", function () {
    document.querySelector("#dialog-delete-artist").close();
  });
  document
    .querySelector("#form-delete-artist")
    .addEventListener("submit", () => deleteArtist(artist.id));
}

export { displayArtists, addGenreToOutput, removeGenreToOutput, updateGrid };
