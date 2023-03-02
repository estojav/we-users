class Confirmation {
  constructor(cb) {
    this.callback = cb
    this.element = document.querySelector('.confirmation')
    this.closeButton = this.element.querySelector('.button--cancel')
    this.confirmButton = this.element.querySelector('.button--confirm')
    
    this.init()

  }
  bindEvents() {
    this.closeButton.addEventListener('click', this.hide.bind(this))
    this.confirmButton.addEventListener('click', this.confirm.bind(this))
  }
  show() {
    this.element.classList.add('visible')
  }
  hide() {
    this.element.classList.remove('visible')
  }
  async confirm() {
    await this.callback()
    this.hide()
  }
  init() {
    this.bindEvents()
  }
}

export default Confirmation