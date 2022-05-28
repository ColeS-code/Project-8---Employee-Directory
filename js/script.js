
// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");


// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


function displayEmployees(employeeData) {
    employees = employeeData;
        // store the employee HTML as we create it
     let employeeHTML = '';
        // loop through each employee and create HTML markup
        employees.forEach((employee, index) => {
         let name = employee.name;
         let email = employee.email;
         let city = employee.location.city;
         let picture = employee.picture;
        // template literals make this so much cleaner!
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
}

const displayModal = (index) => {
    
    modalContent.innerHTML = ``
    modalContent.setAttribute("data-index", index)
  
    const {
      name,
      dob,
      phone,
      email,
      location: { city, street, state, postcode },
      picture,
    } = filteredEmployees[index]
  
    const birthdayDate = new Date(dob.date)
  
    const employeeInfoDiv = document.createElement("div")
  
    employeeInfoDiv.innerHTML = `
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${
      street.name
    }, ${city}, ${state}, ${postcode}</p>
        <p>Birthday: ${
          birthdayDate.getMonth() + 1
        }/${birthdayDate.getDate()}/${birthdayDate.getFullYear()}</p>
      </div>
    `
  
    modalContent.append(employeeInfoDiv)
    overlay.classList.remove("hidden")
    modalClose.addEventListener("click", () => removeModal(employeeInfoDiv))
}
  
  /**
   * Close the employee modal overlay
   * @param {object} employeeInfoDiv
   */
  const removeModal = (employeeInfoDiv) => {
    employeeInfoDiv.remove()
    overlay.classList.add("hidden")
}












    