const inputTitle    = document.querySelector('#input-title' )
const inputGenres   = document.querySelector('#input-genres')
const inputYear     = document.querySelector('#input-year')
const inputPlatform = document.querySelector('#input-platform')
const btnSearch     = document.querySelector('#btn-search')

const onDropdownItemSelected = function(e) {
  e.preventDefault()
  
  const input = this.closest('.input-group').querySelector('input')
  input.value = this.textContent
  input.setAttribute('api-value', this.getAttribute('api-value'))
  
  const menu = this.closest('.dropdown-menu')
  menu.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove("active"))
  this.classList.add("active");
}

// dropdown-item functionality
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', onDropdownItemSelected)
})

export {onDropdownItemSelected}