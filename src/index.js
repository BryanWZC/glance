/* 
TO ADD:
  - Having a word of the day feature usng wordpik
*/

// Api calls specified in object or in variable
const urlHeadings = {
  'WORLD NEWS': 'https://gnews.io/api/v3/topics/world?token=76d708009f6db42233cfa27654a3e846',
  'NATION': 'https://gnews.io/api/v3/topics/nation?country=XX&token=9f0231f3ea047fcd68539cb5c014a34d',
  'BUSINESS': 'https://gnews.io/api/v3/topics/business?token=76d708009f6db42233cfa27654a3e846',
  'TECHNOLOGY': 'https://gnews.io/api/v3/topics/technology?token=76d708009f6db42233cfa27654a3e846',
  'ENTERTAINMENT': 'https://gnews.io/api/v3/topics/entertainment?token=76d708009f6db42233cfa27654a3e846',
  'SPORTS': 'https://gnews.io/api/v3/topics/sports?token=76d708009f6db42233cfa27654a3e846',
  'SCIENCE': 'https://gnews.io/api/v3/topics/science?token=76d708009f6db42233cfa27654a3e846',
  'HEALTH': 'https://gnews.io/api/v3/topics/health?token=76d708009f6db42233cfa27654a3e846',
}

const urlCountryCodes = 'https://bryanwzc.github.io/country-code-api/country-code.json';

// Object for fetching icon urls
const iconUrls = {
  'WORLD NEWS': 'https://img.icons8.com/cotton/64/000000/earth-planet--v1.png',
  'NATION': 'https://img.icons8.com/cotton/64/000000/world-map.png',
  'BUSINESS': 'https://img.icons8.com/cotton/64/000000/business--v1.png',
  'TECHNOLOGY': 'https://img.icons8.com/cotton/64/000000/gps-searching.png',
  'ENTERTAINMENT': 'https://img.icons8.com/cotton/64/000000/sparkler.png',
  'SPORTS': 'https://img.icons8.com/cotton/64/000000/trainers.png',
  'SCIENCE': 'https://img.icons8.com/cotton/64/000000/test-tube.png',
  'HEALTH': 'https://img.icons8.com/cotton/64/000000/treatment-plan.png',
  'TRIANGLE': 'https://img.icons8.com/windows/24/000000/triangle-stroked.png'
};

// Initial DOM assignments 
const app = document.getElementById('root');
const nav = document.getElementById('nav'); 

// Add date below main heading and add to nav div
const currentDate = new Date().toString();
const currentMonth = currentDate.slice(4,10);
const currentYear = currentDate.slice(10,15);

const monthYear = document.createElement('h2');
monthYear.setAttribute('class', 'month-year');
monthYear.innerText = currentMonth + ',' + currentYear;

nav.append(monthYear);

// Change layout of display to differentiate phone view from laptop view
if (window.screen.width > 700){
 
  // Set up contianers to populate news with
  var containerWorld = document.createElement('div');
  containerWorld.setAttribute('class', 'container');

  var containerNation = document.createElement('div');
  containerNation.setAttribute('class', 'container');

  var containerBusiness = document.createElement('div');
  containerBusiness.setAttribute('class', 'container');

  var containerTech = document.createElement('div');
  containerTech.setAttribute('class', 'container');

  var containerEn = document.createElement('div');
  containerEn.setAttribute('class', 'container');

  var containerSports = document.createElement('div');
  containerSports.setAttribute('class', 'container');

  var containerScience = document.createElement('div');
  containerScience.setAttribute('class', 'container');

  var containerHealth = document.createElement('div');
  containerHealth.setAttribute('class', 'container');

  app.append(containerWorld);
  app.append(containerNation);
  app.append(containerBusiness);
  app.append(containerTech);
  app.append(containerEn);
  app.append(containerSports);
  app.append(containerScience);
  app.append(containerHealth);

} else {

  // Initial DOM assignments for phone view
  const app = document.getElementById('root');

  //set up news container for phone view
  var containerNation = document.createElement('div');
  containerNation.setAttribute('class', 'container');

  // Set up initial container as nation since it is most complex. Can hide details to simplfy
  app.append(containerNation);
}

// Calls upon the api based on a url given.
async function apiCall (url){
  const response = await fetch(url);
  const json = await response.json();
  return json
}

// Within each container for news column, renders icon and Heading
const sortNewsHeadings = (newsType,container) =>{
  let wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'icon-heading-wrapper');

  let icon = document.createElement('img');
  icon.setAttribute('class', 'icon');
  icon.src = iconUrls[newsType];

  let heading = document.createElement('h1');
  heading.setAttribute('class', 'column-heading');
  heading.innerText = newsType;

  container.append(wrapper);
  wrapper.append(icon);
  wrapper.append(heading);

  // If news type is nation, add triangle symbol to have a dropdown menu
  if (newsType === 'NATION'){
    heading.innerText = 'CANADA';

    let countryWrapper = document.createElement('div');
    countryWrapper.setAttribute('id', 'country-code-wrapper');
    countryWrapper.setAttribute('class', 'show');
    container.append(countryWrapper);

    let triangle = document.createElement('img');
    triangle.setAttribute('id', 'triangle');
    triangle.src = iconUrls['TRIANGLE'];
    triangle.onclick = function(){countryWrapper.classList.toggle('show')};

    wrapper.append(heading);
    wrapper.append(triangle);
  }
}

// Create content columns with news cards for different News types
const newsCards = (json,container) => {

  let innerContainer = document.createElement('div');
  innerContainer.setAttribute('class', 'inner-container');
  container.append(innerContainer);

  json.articles.forEach(item => {
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    let title = document.createElement('h1');
    title.setAttribute('class', 'card-title');
    let titleLink = document.createElement('a');
    titleLink.setAttribute('href', item.url);
    titleLink.setAttribute('target', '_blank');
    titleLink.innerText = item.title;

    let source = document.createElement('h2');
    source.setAttribute('class', 'card-source');
    source.innerText = item.source.name;

    let timeStamp = document.createElement('h5');
    timeStamp.setAttribute('class', 'card-time-stamp');
    timeStamp.innerText = 'Timestamp: ' + new Date(item.publishedAt).toString().slice(16,21);

    let cardBotBorder = document.createElement('div');
    cardBotBorder.setAttribute('class', 'card-bot-border');

    innerContainer.append(card);
    title.append(titleLink);
    card.append(title);
    card.append(source);
    card.append(timeStamp);
    card.append(cardBotBorder);
  })

  // Condition if there are no articles for the Nation section or if there are any errors
  if(json.articleCount == 0){
    let card = document.createElement('div');
    card.setAttribute('class', 'card');

    let title = document.createElement('h1');
    title.setAttribute('class', 'card-title');
    title.classList.toggle('error');
    title.innerText = 'No articles for that category or Error with API. Check again later!';

    innerContainer.append(card);
    card.append(title);
  }
}

// create initial list of dropdown items for first rendering to DOM
const dropdownFirst = (container) => {

  let countryWrapper = document.getElementById('country-code-wrapper');

  //Inner contianer has to be specified. Usually created in newsCard but is needed in order for 'nationRefresh to have a reference'
  let innerContainer = document.createElement('div');
  innerContainer.setAttribute('class', 'inner-container');
  containerNation.append(innerContainer);
  
  apiCall(urlCountryCodes).then(json => {return [Object.keys(json),json]}).then(arr=> {
    arr[0].forEach((item) => {
    let link = document.createElement('a');
    link.setAttribute('class', 'country-link');
    link.setAttribute('value',arr[1][item]);
    link.innerText = item;
    link.onclick = function (event){nationRefresh(event,item,arr[1])};
    countryWrapper.append(link);
  })
  })
  
}

// Delete current DOM nodes in container and repopualte with new ones. Used in Nation column
const nationRefresh = (event,item, json) =>{

  let innerContainer = containerNation.querySelector('.inner-container');
  containerNation.removeChild(innerContainer);

  if (item !== null) {
    apiCall(urlHeadings['NATION'].replace(/XX/,json[item])).then(json => newsCards(json,containerNation));
  
    containerNation.querySelector('.column-heading').innerHTML = item.toUpperCase();
  
  } else {
    newsCards(json,containerNation);
  }
  
}

// Construct hamburger menu icon
const createHamburgerMenu = () =>{

  let containerBurger = document.createElement('div');
  containerBurger.setAttribute('class', 'container-burger');

  // TO ADD CONDITION FOR ONCLICK SUCH THAT IT ACTIVATES THE SLIDE IN MENU
  let layer = document.createElement('div');
  layer.setAttribute('class', 'layer');
  layer.onclick = function(event){
    burgerToggle();
  }

  let bar1 = document.createElement('div');
  bar1.setAttribute('class', 'bar1');

  let bar2 = document.createElement('div');
  bar2.setAttribute('class', 'bar2');

  let bar3 = document.createElement('div');
  bar3.setAttribute('class', 'bar3');

  nav.append(containerBurger);
  containerBurger.append(layer);
  containerBurger.append(bar1);
  containerBurger.append(bar2);
  containerBurger.append(bar3);
}

// Handle onClick for 'createHamburgerMenu'
const burgerToggle = () =>{
  document.querySelector('.container-burger').classList.toggle('change');
  document.querySelector('#slide-menu').classList.toggle('slide');
}

// Menu that slides in for the phone view when hamburger menu icon is clicked. Headings have onclick
const slideMenu = () =>{
  let slideMenu = document.createElement('div');
  slideMenu.setAttribute('id', 'slide-menu');

  let headingWorld = document.createElement('h1');
  headingWorld.setAttribute('class', 'slide-menu-heading');
  headingWorld.innerText = 'WORLD NEWS';

  let headingNation = document.createElement('h1');
  headingNation.setAttribute('class', 'slide-menu-heading');
  headingNation.innerText = 'NATION';

  let headingBusiness = document.createElement('h1');
  headingBusiness.setAttribute('class', 'slide-menu-heading');
  headingBusiness.innerText = 'BUSINESS';

  let headingTech = document.createElement('h1');
  headingTech.setAttribute('class', 'slide-menu-heading');
  headingTech.innerText = 'TECHNOLOGY';

  let headingEn = document.createElement('h1');
  headingEn.setAttribute('class', 'slide-menu-heading');
  headingEn.innerText = 'ENTERTAINMENT';

  let headingSports = document.createElement('h1');
  headingSports.setAttribute('class', 'slide-menu-heading');
  headingSports.innerText = 'SPORTS';

  let headingScience = document.createElement('h1');
  headingScience.setAttribute('class', 'slide-menu-heading');
  headingScience.innerText = 'SCIENCE';

  let headingHealth = document.createElement('h1');
  headingHealth.setAttribute('class', 'slide-menu-heading');
  headingHealth.innerText = 'HEALTH';

  containerNation.append(slideMenu);
  slideMenu.append(headingWorld);
  slideMenu.append(headingNation);
  slideMenu.append(headingBusiness);
  slideMenu.append(headingTech);
  slideMenu.append(headingEn);
  slideMenu.append(headingSports);
  slideMenu.append(headingScience);
  slideMenu.append(headingHealth);

  let slideClassObj = document.querySelectorAll('.slide-menu-heading');
  Object.keys(slideClassObj).map(key => {
    slideClassObj[key].onclick = function(){slideOnClick(slideClassObj[key].innerText)}
  })
}

// Handles slide menu on clicks. Once a topic is clicked, will refresh heading and column news to match
const slideOnClick = (heading) =>{
  document.querySelector('.icon').src = iconUrls[heading];

  if (heading === 'NATION'){
    document.querySelector('.column-heading').innerText = 'CANADA';
    document.querySelector('#triangle').classList.toggle('show');

    apiCall(urlHeadings['NATION'].replace(/XX/,'ca')).then(json => {
      nationRefresh(null,null,json)});
  } else {
    document.querySelector('.column-heading').innerText = heading;
    document.querySelector('#triangle').classList.remove('show');

    apiCall(urlHeadings[heading]).then(json => nationRefresh(null,null,json));
    document.querySelector('#triangle').setAttribute('class', 'show'); 
  }

  burgerToggle();
}

// DOM Renderings of news columns and content based on different devices

// For laptops and tablet devices
if (window.screen.width > 700){
  sortNewsHeadings('WORLD NEWS',containerWorld);
  apiCall(urlHeadings['WORLD NEWS']).then(json => newsCards(json,containerWorld));

    // For the Nation column section, an additional dropdown menu has ot be added to first rendering
  sortNewsHeadings('NATION',containerNation);
  dropdownFirst(containerNation);
  apiCall(urlHeadings['NATION'].replace(/XX/,'ca')).then(json => {
    nationRefresh(null,null,json)});
  

  sortNewsHeadings('BUSINESS',containerBusiness);
  apiCall(urlHeadings['BUSINESS']).then(json => newsCards(json,containerBusiness));

  sortNewsHeadings('TECHNOLOGY',containerTech);
  apiCall(urlHeadings['BUSINESS']).then(json => newsCards(json,containerTech));

  sortNewsHeadings('ENTERTAINMENT',containerEn);
  apiCall(urlHeadings['ENTERTAINMENT']).then(json => newsCards(json,containerEn));

  sortNewsHeadings('SPORTS',containerSports);
  apiCall(urlHeadings['SPORTS']).then(json => newsCards(json,containerSports));

  sortNewsHeadings('SCIENCE',containerScience);
  apiCall(urlHeadings['SCIENCE']).then(json => newsCards(json,containerScience));

  sortNewsHeadings('HEALTH',containerHealth);
  apiCall(urlHeadings['HEALTH']).then(json => newsCards(json,containerHealth));

} else {
  // For phone devices, use a different rendering
  createHamburgerMenu();

  sortNewsHeadings('NATION',containerNation);
  dropdownFirst(containerNation);
  apiCall(urlHeadings['NATION'].replace(/XX/,'ca')).then(json => {
    nationRefresh(null,null,json)});

  slideMenu();
}

// Hides 'country-code-wrapper' when you click else where on window
window.onclick = function(event){
    
  if (event.target.matches('#triangle') === false) {
    document.getElementById('country-code-wrapper').setAttribute('class', 'show');
  }
  
}