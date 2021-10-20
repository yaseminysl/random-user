let userFormDOM = document.querySelector("#userForm");
userFormDOM.addEventListener("submit", formSubmit); //form will call formSubmit function on submit event

let filterFormDOM = document.querySelector("#filterForm");
filterFormDOM.addEventListener("submit", formFilter); //form will call formFilter function on filter event

let user = {
  //object
  userCount: 0,
  gender: null,
};

let userList;

function formSubmit(event) {
  event.preventDefault(); //prevent modifying url
  user.userCount = document.querySelector("#userCount").value;
  user.gender = document.querySelector("#gender").value;
  localStorage.setItem("userForm", JSON.stringify(user)); //convert js object to json format
  getUsers(user.gender, user.userCount);
}

//Get JSON data using fetch api
let userListDOM = document.querySelector("#userList");

function getUsers(gender, count) {
  fetch(`https://randomuser.me/api?results=100`)
    .then((response) => response.json()) //parse json data
    .then((responseJson) => {

      userList = responseJson.results
        .filter((item) => {
          return item.gender == gender;
        })
        .slice(0, count);

        listUsers(userList)
    });
}

function listUsers(ul) {
 userListDOM.innerHTML = null;
  ul.forEach((item) => {
    let liDOM = document.createElement("li");
    let imgDOM = document.createElement("img");
    liDOM.innerHTML = `${item.name.first} ${item.name.last} ${item.dob.age} ${item.location.city}`;
    imgDOM.src = item.picture.thumbnail;
    userListDOM.appendChild(liDOM);
    liDOM.appendChild(imgDOM);
    let opDOM = document.createElement("option");
    opDOM.value = item.location.city
    opDOM.innerHTML = item.location.city
    document.querySelector("#city").appendChild(opDOM)
  });
}

let filter = {
  minRange: 0,
  maxRange: 0,
  city: null,
};

let filteredList;

function formFilter(event) {
  event.preventDefault();
  filter.minRange = parseInt(document.querySelector("#minRange").value);
  filter.maxRange = parseInt(document.querySelector("#maxRange").value);
  filter.city = document.querySelector("#city").value;

  filteredList = userList.filter((item) => {
    return item.dob.age >= filter.minRange 
    && item.dob.age <=filter.maxRange 
    && (item.location.city == filter.city || filter.city == "")
  });
  listUsers(filteredList)
}
