





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
    const PEOPLE_URL = "https://resource-ghibli-api.onrender.com/people/"
    const select = document.querySelector('select');
    const form = document.querySelector('form');
    //let movieData;

function run() {
 // Add code you want to run on page load here
    

// Creating Dropdown Select Menu with select box containing the title of each movie populated from the API
fetch(BASE_URL)
    .then((res) => res.json())
    .then((movieData) => {
        //movieData = data
    for(let i = 0; i < movieData.length; i++){
        //const title = data[i].title;
        const option = document.createElement('option');
        select.append(option);
        option.textContent = movieData[i].title;
        option.setAttribute('value', movieData[i].id);

        movieDescription(movieData);
    }
})
.catch((err) => console.log(err));
}
    
  
function movieDescription(movieData) {
    select.addEventListener('change', (event) => {
        event.preventDefault();

        const info = document.querySelector('#display-info');
        info.innerHTML = ''
        const h3 = document.createElement('h3')
        const pTag = document.createElement('p')
        const pTag2 = document.createElement('p')

// Movie details section gets populated with movie description depending on the movie selected
    for(let i = 0; i < movieData.length; i++){
        if(select.value === movieData[i].id) {
            h3.textContent = `${movieData[i].title}`
            pTag.textContent = `${movieData[i].release_date}`
            pTag2.innerHTML = `${movieData[i].description}`
            info.append(h3, pTag, pTag2)
        }
    }    
    });
}

// Adding reviews  
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Alerts if a user did not select a movie when creating a review
    if(select.selectedIndex === 0) {
        window.alert(`Please select a movie first`);

    }else {
        const name = select[select.selectedIndex].innerHTML;
        const movieReview = document.querySelector('#review')
        const reviewValue = movieReview.value
        const list = document.createElement('li')
        list.innerHTML = `<strong><b>${name}: </b></strong>${reviewValue}`;
        const ul = document.querySelector('ul') 
        ul.append(list);
        
        form.reset();

// Creating a Reset Reviews button that empties the content of the ul  
    const resetButton = document.querySelector('#reset-reviews')
    resetButton.addEventListener('click', (event) => {
        event.preventDefault()
         ul.innerHTML = ''
    }); 
    } 
})

// Getting people for a movie: Generates an ordered list of people's names
const peopleButton = document.querySelector('#show-people');    
peopleButton.addEventListener('click', (event) => {                
    event.preventDefault(); 

    fetch(PEOPLE_URL)                    
        .then((response) => response.json())            
        .then((peopleResult) => {                                
        const orderedListOfPeople = document.querySelector('#people-names');                
    peopleResult.forEach((person) => {                                                       
            const listPerson = document.createElement('li');                        
            listPerson.textContent = person.name;                        
            orderedListOfPeople.append(listPerson);                        
    });                
        });
    // Clears form input after submission of reviews
    form.reset();
});
        

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
