import { generateMoviesHtml } from './movieHtmlGenerator.js'; // Import function to generate HTML for movies
import { handleReadMoreLess } from './readMoreLessHandler.js'; 

// Get the elements for search input and button
const searchInputEl = document.getElementById('search-input');
const searchButtonEl = document.getElementById('search-button');

// Initialize the watchlist movies array
let watchListMovies = [];

// Retrieve saved watchlist movies from localStorage and parse them
let savedWatchListMovies = JSON.parse(localStorage.getItem("movies"));

// If there are saved movies, update the watchlist movies array
if (savedWatchListMovies) {
    watchListMovies = savedWatchListMovies;
}

// Event listener for search button click
searchButtonEl.addEventListener('click', () => {
    handleSearch(searchInputEl.value); // Call handleSearch with the input value
});

// Event listener for pressing Enter key in the search input
searchInputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        handleSearch(searchInputEl.value); // Call handleSearch with the input value
    }
});

// Function to handle the search process
async function handleSearch(searchTerm) {
    const searchResults = await fetchSearchResults(searchTerm); // Fetch search results
    
    if (searchResults.Response === 'True') {
        searchInputEl.placeholder = 'Search for a movie'; // Reset placeholder text
        const moviesData = await fetchAllMoviesData(searchResults.Search); // Fetch movie details
        hideMovieListPlaceholder(); // Hide the empty movie list message
        showPopulatedSearchResults(); // Show the populated search results
        renderMovies(moviesData); // Render the fetched movies
    } else {
        searchInputEl.value = ''; // Clear the input field
        searchInputEl.placeholder = 'Searching something with no data'; // Update placeholder text
    }
}

// Function to fetch search results based on search term
async function fetchSearchResults(searchTerm) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=41aee47a&s=${searchTerm}`);
    return await response.json();
}

// Function to fetch detailed movie data for all movies
async function fetchAllMoviesData(movies) {
    const moviesDetailsPromises = movies.map(movie => fetchSingleMovieData(movie.imdbID));
    return await Promise.all(moviesDetailsPromises);
}

// Function to fetch detailed movie data for a single movie
async function fetchSingleMovieData(movieId) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=41aee47a&i=${movieId}`);
    return await response.json();
}

// Function to hide the empty movie list message
function hideMovieListPlaceholder() {
    document.getElementById('empty-movielist').style.display = 'none';
}

// Function to show the populated search results state
function showPopulatedSearchResults() {
    document.getElementById('populated-movielist').style.display = 'block';
}

// Function to display movies on the page
function renderMovies(moviesData) {
    const moviesHtml = generateMoviesHtml(moviesData);
    document.getElementById('populated-movielist').innerHTML = moviesHtml;
}

// Event listener for adding a movie to the watchlist
document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        addMovieToWatchList(e.target.dataset.id); // Call addMovieToWatchList with the movie ID
    }
});

// Function to add a movie to the watchlist
async function addMovieToWatchList(addedMovieId) {
    const response = await fetch(`https://www.omdbapi.com/?i=${addedMovieId}&apikey=41aee47a`);
    const data = await response.json();
    watchListMovies.unshift(data); // Add the movie to the beginning of the watchlist
    
    // Save the updated watchlist to localStorage
    window.localStorage.setItem("movies", JSON.stringify(watchListMovies));
}

// Event listener for expanding/collapsing movie plot
document.addEventListener('click', (e) => {
    handleReadMoreLess(e);
});






  











