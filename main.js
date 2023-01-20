





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function


function run() {
 // Add code you want to run on page load here
    const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
    const PEOPLE_URL = "https://resource-ghibli-api.onrender.com/people/"
    const select = document.querySelector('select');
    const form = document.querySelector('form');
    let movieData;

// Creating Dropdown Select Menu with select box containing the title of each movie populated from the API
fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
        movieData = data
    for(let i = 0; i < data.length; i++){
        const title = data[i].title;
        const option = document.createElement('option');
        option.textContent = title;
        option.value = title;
        select.append(option);

        select.addEventListener('change', (event) => {
            event.preventDefault();
// Creating a variable that will contain the movies' data (movieData) 
            const foundData = movieData.find((elmnt) => elmnt.title === `${select.value}`);
            const info = document.querySelector('#display-info');
            info.innerHTML = ''
            const h3 = document.createElement('h3')
            const pTag = document.createElement('p')
            const pTag2 = document.createElement('p')
// Movie details section gets populated with movie description depending on the movie selected
            h3.textContent = `${foundData.title}`
            pTag.textContent = `${foundData.release_date}`
            pTag2.innerHTML = `${foundData.description}`
            info.append(h3, pTag, pTag2)
        });
    }
})
 .catch((err) => console.log(err));

// Adding reviews  
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = `${select.value}`;
    const movieReview = document.querySelector('#review')
    const reviewValue = movieReview.value
    const list = document.createElement('li')
    list.innerHTML = `<strong>${name}: </strong>${reviewValue}`;
    const ul = document.querySelector('ul') 
    ul.append(list);
          
// Creating a Reset Reviews button that empties the content of the ul  
    const resetButton = document.querySelector('#reset-reviews')
    resetButton.addEventListener('click', (event) => {
        event.preventDefault()
         ul.innerHTML = ''
    }); 
     
// Alerts if a user did not select a movie when creating a review
    if(select.value === '') {
        const listTwo = document.createElement('li');
        listTwo.textContent = reviewValue
        const unorderedList = document.createElement('ul')
        unorderedList.append(listTwo)
        window.alert(`Please select a movie first`);

    } else {
        const listTwo = document.createElement("li")
        listTwo.textContent = reviewValue
        const unorderedList = document.createElement('ul')
        unorderedList.append(listTwo)
        movieReview.value = ''
    }
})

// Getting people for a movie: Generates an ordered list of people's names
const people = document.querySelector('#show-people');    
people.addEventListener('click', (event) => {                
    event.preventDefault();               
    fetch(PEOPLE_URL)                    
        .then((response) => response.json())            
        .then((people) => {                                
        const orderedListOfPeople = document.querySelector('#people-names');                
    people.forEach((person) => {                                                       
            const listPerson = document.createElement('li');                        
            listPerson.textContent = person.name;                        
            orderedListOfPeople.append(listPerson);                        
    });                
        });
    
});
        
// Clears form input after submission of reviews
    form.reset();
};

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
