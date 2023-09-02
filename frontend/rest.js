"use strict";
const endpoint = "http://localhost:1989";
let selectedArtist;

async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  const artists = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  return artists;
}

// Create HTML and display all users from given list
function displayUsers(list) {
  // reset <section id="users-grid" class="grid-container">...</section>
  document.querySelector("#artists-grid").innerHTML = "";
  //loop through all users and create an article with content for each
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
    // To do: Add event listeners
    document
      .querySelector("#artists-grid article:last-child .btn-delete")
      .addEventListener("click", () => deleteUser(artist.id));
  }
}

// // ============ CREATE ============ //
// // Create (POST) user to Firebase (Database) using REST API
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
  // Set global varaiable
  selectedArtist = artist;
  // reference to update form
  const form = document.querySelector("#form-update-artist");

  // To do: set form input values with user.xxxx
  form.name.value = artist.name;
  form.title.value = artist.title;
  form.mail.value = artist.mail;
  form.image.value = artist.image;

  form.scrollIntoView({ behavior: "smooth" });
}

// async function updateUser(event) {
//   event.preventDefault();
//   console.log("user");
//   // To do: add variables with reference to input fields (event.target.xxxx.value)
//   const name = event.target.name.value;
//   const title = event.target.title.value;
//   const mail = event.target.mail.value;
//   const image = event.target.image.value;

//   // update user
//   const userToUpdate = { name, title, mail, image }; // To do: add all fields/ variabels
//   const userAsJson = JSON.stringify(userToUpdate);
//   const response = await fetch(`${endpoint}/users/${selectedArtist.id}`, {
//     method: "PUT",
//     body: userAsJson,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) {
//     // if success, update the users grid
//     // To do: make sure to update the users grid in order to display the new user
//     updateUsersGrid();
//     // and scroll to top
//     // To do: call scrollToTop to scroll when created
//     scrollToTop();
//   }
// }

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
// // document.querySelector("#form-update").addEventListener("submit", updateUser);
// function scrollToTop() {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

async function updateArtistsGrid() {
  const users = await readArtists();
  displayUsers(users);
}
updateArtistsGrid();
// ============ Init CRUD App ============ //
// To do: call/ run updateUsersGrid to initialise the app

export { updateArtistsGrid };
