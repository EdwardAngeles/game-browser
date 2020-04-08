class Game {
  constructor ({title, released, rating, genres, platforms, image_url}) {
    this.title    = title
    this.released = released
    this.rating   = rating
    this.genres   = genres
    this.platforms = platforms
    this.image_url = image_url
  }
}

const createGamesFromResults = (results) => {
  let games = []
  
  results.forEach(result => {
    let game = new Game({
      title    : result.name,
      rating   : result.rating,
      released : result.released,
      genres   : [...result.genres],
      platforms: [...result.platforms],
      image_url: result.background_image
    })
    games.push(game)
  })
  
  return games
}

export {Game, createGamesFromResults}