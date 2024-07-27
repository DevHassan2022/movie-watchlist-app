// Generate Html for  movies on the page
 function generateMoviesHtml(movies){
    let moviesHtml = ''

    movies.forEach(movie => {
        let plot = movie.Plot

        if (plot.length > 132) {
            plot = `${plot.substring(0, 132)} <a class="movie__plot text-gray text-xs read-more" data-action-id="${movie.imdbID}">...Read More</a>`
        }
       
        moviesHtml += `
            <article class="movie flex">
                <img src=${movie.Poster} class="movie__poster" alt="Poster of the movie ${movie.Title}">
                <div class="movie__data">
                    <div class="movie__title-wrapper flex align-center">                            
                        <h4 class="movie__title line-height">${movie.Title}</h4>
                        <img src="images/star-icon.png" class="movie__star-icon" alt="Star rating icon">
                        <p class="movie__rating">${movie.imdbRating}</p>
                    </div>
                    <div class="movie__info-actions flex line-height align-center">
                        <p class="movie__runtime">${movie.Runtime}</p>
                        <p class="movie__genre">${movie.Genre}</p>
                        <button class="movie__button  border-none flex align-center justify-center"
                         aria-label="Add ${movie.Title} to watchlist">
                            <img src="images/add-icon.png" data-id="${movie.imdbID}" alt="Add icon">
                        </button>
                        <p class="mr-movie-btn">Watchlist</p>
                    </div>
                    <p class="movie__plot line-height" data-full-plot="${movie.Plot}">
                      ${plot}
                    </p>
                </div>
            </article>
            <div class="divider"></div>`
    })
    return moviesHtml
}

// Generate Watchlist Html
 function generateWatchListMoviesHtml(movies){
    let moviesHtml = ''

    movies.forEach(movie => {
        let plot = movie.Plot
    
        if (plot.length > 132) {
            plot = `${plot.substring(0, 132)} 
            <a class="movie__plot text-gray text-xs read-more" 
            data-action-id="${movie.imdbID}" 
            aria-label="Read more about ${movie.Title}">...Read More</a>`
        }

        moviesHtml += `<article class="movie flex">
                          <img src="${movie.Poster}" class="movie__poster" alt="Poster of the movie ${movie.Title}">
                          <div class="movie__data">
                              <div class="movie__title-wrapper flex align-center">                            
                                <h4 class="movie__title line-height">${movie.Title}</h4>
                                <img src="images/star-icon.png" class="movie__star-icon" alt="Star rating icon">
                                <p class="movie__rating">${movie.imdbRating}</p>
                              </div>
                              <div class="movie__info-actions flex line-height align-center">
                                  <p class="movie__runtime">${movie.Runtime}</p>
                                  <p class="movie__genre">${movie.Genre}</p>
                                  <button class="movie__button  border-none flex align-center justify-center"
                                   aria-label="Remove ${movie.Title} from watchlist" >
                                    <img src="images/remove-icon.png" data-id="${movie.imdbID}" alt="Remove icon">
                                  </button>
                                  <p class="mr-movie-btn remove-btn">Remove</p>
                              </div>
                              <p class="movie__plot line-height" data-full-plot="${movie.Plot}">
                                ${plot}
                              </p>
                          </div>
                      </article>
                      <div class="divider"></div>`
    })
    return moviesHtml
}


export { generateMoviesHtml, generateWatchListMoviesHtml}