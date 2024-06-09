const main = document.getElementById('main');
const userList = document.getElementById('list');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate_wealth');
const totalWealth = document.getElementById('total-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  // console.log(data);
  const user = data.results[0];
  //   console.log(user);
  const newUser = {
    gender: user.gender,
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000000) / 100,
    picture: user.picture.medium,
  };
  addData(newUser);

  if (totalWealth.innerHTML !== '') {
    totalWealth.innerHTML = '';
    calcWealth();
  }
}

// double everybody's money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
  if (totalWealth.innerHTML !== '') {
    // console.log(true);
    calcWealth();
  }
}

// sort users by amount of money
function sortByRichest() {
  data = data.sort((a, b) => a.money - b.money);
  updateDom();
}
// filter only millionaires
function showMillionaires() {
  data = data.filter(item => item.money >= 1000000);
  updateDom();
  if (totalWealth.innerHTML !== '') {
    // console.log(true);
    calcWealth();
  }
}

// calculate entire wealth all users
function calcWealth(multiplier) {
  let calculatedWealth = data.reduce((acc, user) => acc + user.money, 0);

  //   calculatedWealth *= multiplier;

  // clear div
  totalWealth.innerHTML = '';
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>€ ${formatMoney(
    calculatedWealth
  )}</strong></h3>`;
  totalWealth.appendChild(wealthEl);
}

// add new object to data array
function addData(newUserObject) {
  data.push(newUserObject);
  updateDom();
}

function updateDom(providedData = data) {
  // clear main div
  userList.innerHTML = '';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person-wrapper');
    element.innerHTML = `<span class='person'><img src='${
      item.picture
    }'><strong>${item.name}</strong></span> € ${formatMoney(item.money)}`;
    userList.appendChild(element);
  });
}

//format number as money
function formatMoney(number) {
  return number
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/\.(\d{2})$/, ',$1');
}

// Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calcWealthBtn.addEventListener('click', calcWealth);
