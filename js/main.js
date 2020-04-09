import {fetchGames} from './fetcher.js'
import * as render from './render.js'
import {createGamesFromResults} from './game.js'
import './event-listener.js'
;

(async () => {
  await render.renderGenres()
  await render.renderPlatforms()
  render.renderLast25Years()
  
  document.querySelector('#btn-search').addEventListener('click', async (e) => {
    e.preventDefault()
    document.querySelector('.results').innerHTML = ''
    
    const  title = document.querySelector('#input-title'   ).value
    let    genre = document.querySelector('#input-genre'   ).getAttribute('api-value')
    let     year = document.querySelector('#input-year'    ).getAttribute('api-value')
    let platform = document.querySelector('#input-platform').getAttribute('api-value')
    if (   genre === null)    genre = undefined
    if (    year === null)     year = undefined
    if (platform === null) platform = undefined
    
    const options = {title, year, platform, genre}
    const results = await fetchGames(options)
    const games   = createGamesFromResults(results)
    
    if (games.length === 0) render.renderNothingFound()
    if (games.length !== 0) games.forEach(game => render.renderGame(game))
  })
})()
