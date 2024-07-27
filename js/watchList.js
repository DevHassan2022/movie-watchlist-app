import { generateWatchListMoviesHtml } from './movieHtmlGenerator.js';
import { handleReadMoreLess } from './readMoreLessHandler.js'; 

// Get the element where watchlist movies will be displayed
const watchListMoviesEl = document.getElementById('populated-watchlist');

// Retrieve saved watchlist movies from localStorage and parse them into an array
const savedWatchListMovies = JSON.parse(localStorage.getItem("movies")) || [];

// Check if there are any saved movies and render them
if (savedWatchListMovies.length > 0) {
    renderMovies(savedWatchListMovies);
    hideEmptyWatchListMessage();
    showPopulatedWatchList();
} else {
    hidePopulatedWatchlist();
    showEmptyWatchlistMessage();
}

// Hide the empty watchlist message
function hideEmptyWatchListMessage() {
    document.getElementById('empty-watchlist').style.display = 'none';
}

// Show the populated watchlist
function showPopulatedWatchList() {
    document.getElementById('populated-watchlist').style.display = 'block';
}

// Function to display movies on the page
function renderMovies(moviesData) {
    // Generate HTML for the movies and set it to the innerHTML of the watchlist element
    const moviesHtml = generateWatchListMoviesHtml(moviesData);
    watchListMoviesEl.innerHTML = moviesHtml;
}

// Hide the populated watchlist if empty
function hidePopulatedWatchlist() {
    watchListMoviesEl.style.display = 'none';
}

// Function to show the empty watchlist message
function showEmptyWatchlistMessage() {
    document.getElementById('empty-watchlist').style.display = 'block';
}

// Event listener for removing movies from the watchlist
document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        handleRemoveMovieFromWatchlist(e);
    }
});

function handleRemoveMovieFromWatchlist(e) {
    removeMovie(e);
    updateWatchList();
    renderUpdatedWatchList();
}

function removeMovie(e) {
    const movieId = e.target.dataset.id;
    const indexToRemove = savedWatchListMovies.findIndex(movie => movie.imdbID === movieId);
    if (indexToRemove !== -1) {
        savedWatchListMovies.splice(indexToRemove, 1);
    }
}

// Update localStorage with the new list of movies
function updateWatchList() {
    window.localStorage.setItem('movies', JSON.stringify(savedWatchListMovies));
}

// Render the updated list of movies and show the empty watchlist message if no movies are left
function renderUpdatedWatchList() {
    if (savedWatchListMovies.length > 0) {
        renderMovies(savedWatchListMovies);
        hideEmptyWatchListMessage();
        showPopulatedWatchList();
    } else {
        showEmptyWatchlistMessage();
        hidePopulatedWatchlist();
    }
}


