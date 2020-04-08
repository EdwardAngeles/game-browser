const fetchGames = async ({title, year, platform, genre}) => {
  console.log(buildURL({title, year, platform, genre}))
  const {data:{results}} = await axios.get(buildURL({title, year, platform, genre}))
  return results
}

const fetchGenres = async () => {
  const url = `https://api.rawg.io/api/genres`
  const {data:{results}} = await axios.get(url)
  const genres = results.map((genre) => genre.name)
  return results
}

const fetchPlatforms = async () => {
  const url = `https://api.rawg.io/api/platforms`
  const {data:{results}} = await axios.get(url)
  return results
}

const buildURL = ({title, year, platform, genre}) => {
  //let url = `https://api.rawg.io/api/games?ordering=-rating`
  let url = `https://api.rawg.io/api/games?exclude_additions=true&stores=1,3,4,6,11`
  
  if (   title) url += `&search=${encodeURIComponent(title.trim())}`
  if (    year) url += `&dates=${year}-01-01,${year}-12-31`
  if (   genre) url += `&genres=${genre}`
  if (platform) url += `&platforms=${platform}`
  
  return url
}

export {fetchGames, fetchGenres, fetchPlatforms}