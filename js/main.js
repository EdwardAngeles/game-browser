import {fetchGames, fetchGenres} from './fetcher.js'
import {renderGame, renderGenres, renderPlatforms, renderLast10Years} from './render.js'
import {createGamesFromResults} from './game.js'
import * as nothing from './event-listener.js'
;

setTimeout(async () => {
  const options = {title: 'gta'}
  const results = await fetchGames(options)
  const games   = createGamesFromResults(results)
  console.log(results)
  games.forEach((game) => {
    console.log(game.genres.name)
    renderGame(game)
  })
}, 500)

;
(async () => {
  await renderGenres()
  await renderPlatforms()
  renderLast10Years()
  
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
    console.log(results)
    games.forEach((game) => {
      console.log(game.genres.name)
      renderGame(game)
    })
  })
})()
