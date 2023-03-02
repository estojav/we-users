import User from "./User"

const API_URL = 'https://jsonplaceholder.typicode.com';

class App {
  
  constructor() {
    this.loading = false
    this.error = null
    this.users = []
    this.confirmation = null
    this.elements = {
      users: document.querySelector('.users'),
      error: document.querySelector('.error'),
      addUserButton: document.querySelector('.users__add')
    }
  }

  bindEvents() {
    this.elements.addUserButton.addEventListener('click', this.handleAddUser.bind(this))
  }
  
  fetchUsers() {

    return fetch(`${API_URL}/users`).then(function (response) {

      // The API call was successful!
      return response.json();

    }).then(function (data) {

      // This is the JSON from our response
      return {
        success: true,
        data
      }

    }).catch(function (error) {

      // There was an error
      return {
        success: false,
        error
      }

    });

  }

  searchUsersByUN(username) {

    return fetch(`${API_URL}/users?username=${username}`).then(function (response) {

      // The API call was successful!
      return response.json();

    }).then(function (data) {

      // This is the JSON from our response
      return {
        success: true,
        data
      }

    }).catch(function (error) {

      // There was an error
      return {
        success: false,
        error
      }

    });
  }

  updateUser(id) {

    this.users.find(user => {
      if (user.id === id) {
        
      }
    })

  }

  handleAddUser() {

    // disable adding multiple users
    if ((this.users.filter(user => (user.editing))).length) return

    const userTemplate = document.getElementById('userTemplate')
    const template = userTemplate.cloneNode(true)
    const id = this.users.length + 2;
    template.setAttribute('id', `userTemplate-${id}`)
    template.style = ''
    const newUser = new User({ isNew: true, id, name: '', username: '', email: '', phone: '', website: '' }, template, this.removeUser.bind(this))
    newUser.toggleEditing()
    this.users.push(newUser)
    this.elements.users.prepend(template)
    
  }

  removeUser(id) {

    const userNode = this.elements.users.querySelector(`#userTemplate-${id}`)
    this.users = this.users.filter(user => user.userData.id !== id)
    if (userNode) userNode.remove()

  }

  renderUsers(users) {

    const userTemplate = document.getElementById('userTemplate')

    // remove child elements
    this.elements.users.innerHTML = '';

    if (users.length) {
      users.map(user => {
        const template = userTemplate.cloneNode(true)
        template.setAttribute('id', `userTemplate-${user.id}`)
        template.style = ''
        const newUser = new User(user, template, this.removeUser.bind(this))
        this.users.push(newUser)
        this.elements.users.append(template)
      })
      return false
    }
    
    const notice = document.createElement('p')
    notice.className = 'notice'
    notice.innerHTML = 'Ühtegi isikut ei leitud.'
    this.elements.users.append(notice)
    
  }

  setError(error) {
    this.elements.error.innerHTML = error;
  }

  initModal() {
    const modalElement = document.querySelector('.confirmation')
    this.modal = new Confirmation(modalElement)
  }

  async init() {
    const response = await this.fetchUsers()
    if (response.success) {
      this.bindEvents()
      this.renderUsers(response.data)
      return
    }
    return this.setError(response.error)
  }

}

export default App