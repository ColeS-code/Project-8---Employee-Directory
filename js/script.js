
// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
      email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalPrevious = document.querySelector("modal-previous");
const modalNext = document.querySelector("modal-next");


// Creates a search bar using template literals to insert the inner HTMl.
const header = document.querySelector(".header")
const createSearchBar = `
  <label for="search" class="employee-search">
    <span>Search By Name</span>
    <input id="search" placeholder="Search By Name">
    <button type="button">search</button>
  </label>
`
header.insertAdjacentHTML("beforeend", createSearchBar);
const searchSelector = document.querySelector("#search");


// Adds functionality to the search bar. Allowing the user to filter employees with their first and last name.
const searchNames = () => {
  const employeeNames = employees.filter((employee) => {
    let fullName = `${employee.name.first} ${employee.name.last}`
    return fullName.toLowerCase().includes(searchSelector.value.toLowerCase())
  })
  displayEmployees(employeeNames)
};
// Performs the search in real-time.
searchSelector.addEventListener("keyup", () => {
  searchNames()
});

// This function takes the fetched employee data to hold and insert it into the inner HTML.
function displayEmployees(employeeData) {

    employees = employeeData;
        
     let employeeHTML = '';
        
        employees.forEach((employee, index) => {
         let name = employee.name;
         let email = employee.email;
         let city = employee.location.city;
         let picture = employee.picture;
        
        employeeHTML += `
        <div class="card" data-index="${index}">
         <img class="avatar" src="${picture.large}" />
          <div class="text-container">
             <h2 class="name">${name.first} ${name.last}</h2>
             <p class="email">${email}</p>
             <p class="address">${city}</p>
         </div>
        </div>
        `
        });
        gridContainer.innerHTML = employeeHTML;
};

// This function creates a modal pop-up with more detailed information on each employee. 
function displayModal(index)  {

  let { name, dob, phone, email, location: { city, street, state, postcode,}, picture} = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container" >
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street.number} ${street.name}, ${city}, ${state}, ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div> 
  `
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
};
// A piece of code to prevent the modal from displaying if the user clicks on anything but the closest card to their cursor.
gridContainer.addEventListener('click', event => {

  if (event.target !== gridContainer) {

    const card = event.target.closest(".card");
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});
// listens for a click to close the modal pop-up window.
modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});


modalNext.addEventListener("click", () => {
  const currentModal = //////////
});


// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))







    