//------------------------ Selectors --------------------------//

const fullName = document.querySelector(".full-name");
const birthCity = document.querySelector(".birth-city");
const birthCounty = document.querySelector(".birth-county");
const birthMonth = document.querySelector(".birth-month");
const birthDay = document.querySelector(".birth-day");
const birthYear = document.querySelector(".birth-year");
const submitButton = document.querySelector(".button-get");
const cityTitle = document.querySelector(".newspaper-title h1");
const countyTitle = document.querySelector(".newspaper-title h6");
const newsParagraph = document.querySelector(".newspaper-news p");
const newsUser = document.querySelector(".newspaper-user p");
const newspaperDate = document.querySelector(".newspaper-date");
const anotherNewsParagraph = document.querySelector(".trivia p");
const newspaperContentImage = document.querySelector(".newspaper-content img");
const newspaperBackground = document.querySelector(".newspaper-background");
const anotherButton = document.querySelector(".button-another");
const initialContent = document.querySelector(".content");
const form = document.querySelector(".form");
const jokes = document.querySelector(".jokes");

let romanNumbers = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
]

//-------------------- Add Event Listener ---------------------//
form.addEventListener("submit", (event) => {
    event.preventDefault();
    newspaperBackground.style.display = "block";
    anotherButton.style.display = "flex";
    newspaperBackground.scrollIntoView({behavior: "smooth"});
    fetchNumbers();
    fetchImages();
    fetchJokes();

    newspaperDate.innerHTML = `${birthDay.value}.${birthMonth.value}.${birthYear.value}  ||  VOL ${romanNumbers[Math.floor(Math.random() * romanNumbers.length )]}`;
    cityTitle.innerHTML = `The Unseen ${toCapitalize(birthCity.value)}’s Gazette`;
    countyTitle.innerHTML = `${birthCounty.value.toUpperCase()}’S NO.1 NEWSPAPER`;
    newsUser.innerHTML = `Doctors are overwhelmed by the birth of ${toCapitalize(fullName.value).bold()}. ’’Oh my gosh! Look at that perfect face!’’ said the Pediatrician enthusiastically. Parents are so grateful.`

    form.reset();
})

anotherButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    newspaperBackground.style.display = "none";
    anotherButton.style.display = "none";
})

//----------------------- Functions ---------------------------//

let fetchNumbers = () => {
    fetch(`http://numbersapi.com/${birthMonth.value}/${birthDay.value}/date`)
    .then(response => response.text())
    .then(data => {
            newsParagraph.innerHTML = data;
    })
    

    fetch(`http://numbersapi.com/${birthYear.value}/year`)
    .then(response => response.text())
    .then(data => {
            anotherNewsParagraph.innerHTML = data;
    })
    
}

let fetchImages = () => {
    fetch("https://api.unsplash.com/collections/3a-lE8AEYzo/photos?client_id=bEMJelHZLMdhOe102lDEamkwlx9S5CzqtxqZmqo4TvM")
    .then(response => response.json())
    .then(data => {
        newspaperContentImage.src = data[Math.floor(Math.random() * data.length )].urls.regular
    })
}

let fetchJokes = () => {
    fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart")
    .then(response => response.json())
    .then(data => {
        jokes.innerHTML = "";
        jokes.insertAdjacentHTML("beforeend",
        `<p>${data.setup}<p>
        <p>${data.delivery}<p>`)
    })
}

const toCapitalize = (str) => {
    return str.split(" ").map(value => value[0].toUpperCase() + value.substring(1)).join(" ")
};