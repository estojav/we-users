import Confirmation from './Confirmation'

class User {
  constructor(user, template, removeUser) {

    this.removeUser = removeUser
    this.userData = user
    this.editing = false
    this.template = template
    this.modal = null
    this.elements = {
      inner: template.querySelector('.users__card-inner'),
      data: template.querySelector('.user__data'),
      form: template.querySelector('.user__form'),
      actions: template.querySelector('.user__actions'),
      editButton: template.querySelector('.user__edit-btn'),
      removeButton: template.querySelector('.user__remove-btn')
    }

    this.bindEvents()
    this.generateContent()
    this.generateForm()

  }

  handleRemove() {
    this.modal = new Confirmation(() => this.removeUser(this.userData.id))
    this.modal.show()
  }

  bindEvents() {
    this.elements.editButton.addEventListener('click', this.toggleEditing.bind(this))
    this.elements.removeButton.addEventListener('click', this.handleRemove.bind(this))
  }

  toggleEditing(event) {
    if (this.editing) {
      this.showContent()
      this.removeForm()
      this.showActions()
      this.editing = false;
      return
    }
    this.hideActions()
    this.hideContent()
    this.showForm()
    this.editing = true;
  }

  showActions() {
    this.template.querySelector('.user__actions').style = '';
  }

  hideActions() {
    this.template.querySelector('.user__actions').style = 'display: none';
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    for (const [name,value] of formData) {
      this.userData[name] = value
    }
    this.updateFields()
    this.toggleEditing()
  }

  handleFormCancel() {
    if (this.userData.isNew) {
      this.handleRemove()
      return
    }
    this.toggleEditing()
  }

  hideForm() {
    this.template.querySelector('.user__form')
  }

  generateContent() {

    const that = this;

    const dataItemElement = this.elements.data.querySelector('.user__data-item')

    // go through all the user data objects and add content to dom dynamically
    Object.keys(this.userData).map((key, index) => {
      
      if (key === 'id' || key === 'address' || key === 'company' || key === 'isNew') return null
      
      const dataItem = dataItemElement.cloneNode(true)
      const dataItemLabel = dataItem.querySelector('.user__data-item__name')
      const dataItemValue = dataItem.querySelector('.user__data-item__value')
      
      dataItemLabel.innerHTML = `${key}:`
      dataItemValue.setAttribute('data-id', key)
      dataItemValue.innerHTML = that.userData[key]

      that.elements.data.append(dataItem)

    })

    dataItemElement.remove()

  }

  updateFields() {
    // update dom elements with new data
    Object.keys(this.userData).map(key => {
      const field = this.elements.data.querySelector(`[data-id="${key}"]`)
      if (field) {
        field.innerHTML = this.userData[key]
      }
    })
  }

  generateForm() {

    const that = this;

    const formFieldElement = this.elements.form.querySelector('.user__form-field')
    const formCancel = this.elements.form.querySelector('.form__cancel')

    Object.keys(this.userData).map((key, index) => {
      
      if (key === 'id' || key === 'address' || key === 'company' || key === 'isNew') return null
      
      // target nodes
      const formField = formFieldElement.cloneNode(true)
      const formFieldLabel = formField.querySelector('.user__form-label')
      const formFieldInput = formField.querySelector('.user__form-input')
      
      // set input attributes
      formFieldLabel.innerHTML = `${key}:`
      formFieldInput.setAttribute('type', key === 'email' ? key : 'text')
      formFieldInput.setAttribute('name', key)
      formFieldInput.setAttribute('value', that.userData[key])

      // attach inputs to dom
      const formActions = that.elements.form.querySelector('.user__form-actions')
      that.elements.form.insertBefore(formField, formActions)

    })

    this.elements.form.addEventListener('submit', this.handleFormSubmit.bind(this))
    formCancel.addEventListener('click', this.handleFormCancel.bind(this))

    formFieldElement.remove()
    that.template.querySelector('.user__form').remove()
    
  }

  showForm() {
    this.elements.inner.prepend(this.elements.form)
  }

  removeForm() {
    this.elements.inner.querySelector('.user__form').remove()
  }

  showContent() {
    this.elements.inner.prepend(this.elements.data)
  }

  hideContent() {
    this.elements.inner.querySelector('.user__data').remove()
  }

}

export default User