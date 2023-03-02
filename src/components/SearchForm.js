import App from './App'

class SearchForm extends App {
  constructor(form) {
    super()
    this.form = form
    this.formSubmit = form.querySelector('.search__submit')
    this.formReset = form.querySelector('.search__reset')
    this.bindEvents()
  }
  bindEvents() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this))
    this.formReset.addEventListener('click', this.handleReset.bind(this))
  }
  handleReset(event) {
    event.preventDefault()
    this.init()
    this.form.reset()
    this.formReset.classList.remove('visible')
  }
  showResetButton() {
    this.formReset.classList.add('visible')
  }
  async handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const term = formData.get("searchTerm")
    const response = await this.searchUsersByUN(term)
    this.showResetButton()
    if (response.success) {
      this.bindEvents()
      this.renderUsers(response.data)
      return true
    }
    this.setError(response.error)
  }
}

export default SearchForm