import {fetchGenres, fetchPlatforms} from './fetcher.js'
import {onDropdownItemSelected     } from './event-listener.js'

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
          <p class="text-right mb-0">
          ${game.video_url ?
            `<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modal-${game.id}"><i class="fas fa-eye"></i></a>`
           :`<a href="#" class="btn btn-primary disabled" data-toggle="modal" data-target="#modal-${game.id}"><i class="fas fa-eye-slash"></i></a>`}
          </p>
        </div>
      </div>
    </div>`)
  const renderedModal = renderModal(game)
  if (game.video_url) htmlGameCard.appendChild(renderedModal)
  document.querySelector('.results').appendChild(htmlGameCard)
  renderedModal.addEventListener('shown.bs.modal', e => {
    console.log('1')
  })
}

const renderModal = (game) => {
  const htmlModal = stringToHTML(`
    <!-- Modal -->
    <div class="modal fade" id="modal-${game.id}" tabindex="-1" role="dialog" aria-labelledby="modal-${game.id}-label" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-${game.id}-label">${game.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="embed-responsive embed-responsive-16by9">
              <video src="${game.video_url}"></video>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`)
    // only able to handle show/hide event with jquery
    $(htmlModal).on('shown.bs.modal', e => {
      const video = $(htmlModal).find('video').get(0)
      video.currentTime = 0
      video.play()
    })
    $(htmlModal).on('hide.bs.modal', e => $(htmlModal).find('video').trigger('pause'))
    
    return htmlModal
}

const renderNothingFound = () => {
  const htmlAlert = stringToHTML(`
    <div class="col-12">
      <div class="alert alert-info" role="alert">
        <h4 class="alert-heading">😓 Nothing Found!</h4>
        Adjust your search criteria and give it another try.
      </div>
    </div>`)
  
  document.querySelector('.results').appendChild(htmlAlert)
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

const renderLast25Years = () => {
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

export {renderGame, renderGenres, renderLast25Years, renderPlatforms, renderNothingFound}