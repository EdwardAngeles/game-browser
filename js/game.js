class Game {
  constructor ({title, id, released, rating, genres, platforms, image_url, video_url}) {
    this.title    = title
    this.id       = id
    this.released = released
    this.rating   = rating
    this.genres   = genres
    this.platforms = platforms
    this.image_url = image_url
    this.video_url = video_url
  }
}

const createGamesFromResults = (results) => {
  let games = []
  
  results.forEach(result => {
    console.log(result)
    let game = new Game({
      title    : result.name,
      id       : result.id,
      rating   : result.rating,
      released : result.released,
      genres   : [...result.genres],
      platforms: [...result.platforms],
      image_url: result.background_image,
      video_url: result.clip ? result.clip.clip : undefined
    })
    games.push(game)
  })
  
  return games
}

export {Game, createGamesFromResults}