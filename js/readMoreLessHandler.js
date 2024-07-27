// Function to handle the read more/less functionality
export function handleReadMoreLess(e) {
    if (e.target.classList.contains('read-more')) {
        const moviePlotEl = e.target.parentElement
        const fullPlot = moviePlotEl.dataset.fullPlot
        moviePlotEl.innerHTML = `${fullPlot} <span class="read-less text-gray text-xs" data-action-id="${e.target.dataset.actionId}">Read Less</span>` 
        moviePlotEl.style.marginBottom = '20px' // Adjust the margin to accommodate full text
    } else if (e.target.classList.contains('read-less')) {
        const moviePlotEl = e.target.parentElement
        const shortPlot = moviePlotEl.dataset.fullPlot.substring(0, 132) + '...'
        moviePlotEl.innerHTML = `${shortPlot} <span class="read-more text-gray text-xs" data-action-id="${e.target.dataset.actionId}"> Read More</span>`
        moviePlotEl.style.marginBottom = '0px' // Reset the margin when collapsing text
    }
}