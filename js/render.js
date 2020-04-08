import {fetchGenres, fetchPlatforms} from './fetcher.js'
import {onDropdownItemSelected} from './event-listener.js'

const renderGame = (game) => {
  const htmlGameCard = stringToHTML(`
    <div class="col-md-6 mb-3">
      <div class="card shadow-sm">
        <img class="card-img-top card-thumbnail cover" src="${game.image_url}" alt="Card image cap" onerror="this.onerror=null;this.src='https://wakarusaag.com/wp-content/plugins/oem-showcase-inventory/assets/images/noimage-found.png';">
        <div class="card-body">
          <h4 class="card-title mb-0">${game.title}</h4>
          <span class="text-muted mb-2">${game.released}</span>
          <p class="card-text">
            <span class="font-weight-bold">Genres: </span>
            ${game.genres.map(genre => `<span class="badge badge-primary">&nbsp;${genre.name}&nbsp;</span>`).join(' ')}
            <br>
            <span class="font-weight-bold">Plaforms: </span>
            ${game.platforms.map(platform => `<span class="badge badge-danger">&nbsp;${platform.platform.name}&nbsp;</span>`).join(' ')}
          </p>
          <a href="#!" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>`)
  
  document.querySelector('.results').appendChild(htmlGameCard)
}

const renderGenres = async () => {
  const genres = await fetchGenres()
  const   menu = document.querySelector('#dropdown-menu-genrer')
  
  genres.forEach(genre => {
    const el = stringToHTML(`<a class="dropdown-item" href="#" api-value="${genre.id}">${genre.name}</a>`)
    el.addEventListener('click', onDropdownItemSelected)
    menu.appendChild(el)
  })
}

const renderPlatforms = async () => {
  const platforms = await fetchPlatforms()
  const menu      = document.querySelector('#dropdown-menu-platform')
  
  platforms.forEach(platform => {
    const element = stringToHTML(`<a class="dropdown-item" href="#" api-value="${platform.id}">${platform.name}</a>`)
    element.addEventListener('click', onDropdownItemSelected)
    menu.appendChild(element)
  })
}

const renderLast10Years = () => {
  const menu = document.querySelector('#dropdown-menu-year')
  
  for (let i = 0; i <= 25; i++) {
    const year = new Date().getFullYear() - i
    const element = stringToHTML(`<a class="dropdown-item" href="#" api-value="${year}">${year}</a>`)
    element.addEventListener('click', onDropdownItemSelected)
    menu.appendChild(element)
  }
}

const stringToHTML = (str) => {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body.firstChild;
};

export {renderGame, renderGenres, renderLast10Years, renderPlatforms}