import './sass/main.scss'
import App from './components/App'
import SearchForm from './components/SearchForm'

window.addEventListener('load', function() {

  const app = new App()
  app.init()

  // for testing
  // window.app = app

  // init search
  const searchForm = document.querySelector('.search-form')
  if (searchForm) {
    new SearchForm(searchForm)
  }

})