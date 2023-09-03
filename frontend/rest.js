"use strict";
const endpoint = "http://localhost:1989";
let selectedArtist;

async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  const artists = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  return artists;
}

function displayUsers(list) {
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
                    <button>add to fave</button>
                </div> 
            </article>
        `
    );
    document
      .querySelector("#artists-grid article:last-child .btn-update")
      .addEventListener("click", () => selectArtist(artist));

    document
      .querySelector("#artists-grid article:last-child .btn-delete")
      .addEventListener("click", () => deleteUser(artist.id));
  }
}

// async function createUser(event) {
//   event.preventDefault();
//   console.log("Opret bruger");

//   const name = event.target.name.value;
//   const title = event.target.title.value;
//   const mail = event.target.mail.value;
//   const image = event.target.image.value;

//   const newUser = { name, title, mail, image };

//   // To do: add variables with reference to input fields (event.target.xxxx.value)

//   // create a new user
//   const userAsJson = JSON.stringify(newUser);
//   const response = await fetch(`${endpoint}/users`, {
//     method: "POST",
//     body: userAsJson,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     // if success, update the users grid
//     updateUsersGrid();
//     // To do: make sure to update the users grid in order to display the new user
//     // and scroll to top
//     scrollToTop();
//     // To do: call scrollToTop to scroll when created
//   }
// }

// // ============ UPDATE ============ //
function selectArtist(artist) {
  document.querySelector("#dialog-update-artist").showModal();
  // Set global varaiable
  console.log(artist);
  selectedArtist = artist;
  // reference to update form
  const form = document.querySelector("#form-edit-artist");

  form.name.value = artist.name;
  form.birthdate.value = artist.birthdate;
  form.activeSince.value = artist.activeSince;
  form.label.value = artist.label;
  form.website.value = artist.website;
  form.genres.value = artist.genres;
  document.querySelector("#genre-output-edit").textContent = artist.genres;
  form.description.value = artist.shortDescription;
  form.image.value = artist.image;

  document
    .querySelector("#extra-genre-btn-edit")
    .addEventListener("click", () =>
      addGenreToOutput(
        document.querySelector("#edit-genres"),
        document.querySelector("#genre-output-edit")
      )
    );
  document
    .querySelector("#remove-genre-btn-edit")
    .addEventListener("click", () =>
      removeDisciplineToOutput(document.querySelector("#genre-output-edit"))
    );
}

function addGenreToOutput(genreSelector, outputSelector) {
  console.log("addToOutput");
  const genreValue = genreSelector.value;
  if (
    genreValue != "" &&
    outputSelector.textContent.includes(genreValue) == false
  )
    if (outputSelector.textContent != "")
      outputSelector.textContent += ", " + genreValue;
    else outputSelector.textContent += genreValue;
}
function removeDisciplineToOutput(outputSelector) {
  outputSelector.textContent = "";
}

async function updateUser(event) {
  event.preventDefault();
  console.log(event);
  const form = event.target;

  const name = form.name.value;
  const birthdate = form.birthdate.value;
  const activeSince = form.activeSince.value;
  const label = form.label.value;
  const website = form.website.value;
  const genres = form.genreOutput.value;
  const shortDescription = form.description.value;
  const image = form.image.value;

  // update user
  const artistToUpdate = {
    name,
    birthdate,
    activeSince,
    label,
    website,
    genres,
    shortDescription,
    image,
  }; // To do: add all fields/ variabels
  const artistAsJson = JSON.stringify(artistToUpdate);
  const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
    method: "PUT",
    body: artistAsJson,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    updateArtistsGrid();
    scrollToTop();
  }
}

// DELETE
async function deleteUser(id) {
  console.log(id);
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    updateArtistsGrid();
  }
}

// // // ================== Events and Event Listeners ============ //
// // // To do: add submit event listener to create form (#form-create)
// // document.querySelector("#form-create").addEventListener("submit", createUser);
// // // To do: add submit event listener to update form (#form-update)
document
  .querySelector("#form-edit-artist")
  .addEventListener("submit", updateUser);
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function updateArtistsGrid() {
  const users = await readArtists();
  displayUsers(users);
}
updateArtistsGrid();
// ============ Init CRUD App ============ //
// To do: call/ run updateUsersGrid to initialise the app

export { updateArtistsGrid };
