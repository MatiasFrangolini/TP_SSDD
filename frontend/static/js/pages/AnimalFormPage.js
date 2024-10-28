export default class AnimalFormPage {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.loadForm();
  }

  async loadForm() {
    this.render();
    this.addListener();
  }

  addListener() {
    window.addEventListener("submit", this.handleSubmit);
  }

  render() {
    const formHtml = `
        <form id="game-form" class="new-game-form-container">
            <h2 class="new-game-form-title">Nuevo juego</h2>
            <div class="input-container">
                <label for="name" class="input-label">Nombre:</label>
                <input type="text" id="name" name="name" class="input-field" required>
            </div>
            <div class="input-container">
                <label for="description" class="input-label">Descripcion:</label>
                <textarea id="description" name="description" class="input-field" required></textarea>
            </div>
            <button type="submit" form="game-form" class="form-submit-button">Enviar</button>
        </form>
    `;
    this.container.innerHTML = formHtml;
  }
}
