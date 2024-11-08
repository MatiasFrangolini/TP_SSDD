export default class LoggedInLayout {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.render();
  }
  render() {
    const layoutHtml = `
        <nav class="bg-gray-800">
          <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
              <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div class="hidden sm:ml-6 sm:block">
                  <div class="flex space-x-4">
                    <a href="/" id="home" class="menu-link rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Animales</a>
                    <a href="/availableDevices" id="addAnimal" class="menu-link rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Agregar animal</a>
                    <a href="/checkpoints" id="checkpoints" class="menu-link rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">CheckPoints</a>
                    <a href="/animals/position" id="animalPositions" class="menu-link rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Ubicaciones</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div id="layout-content" class= "items-center justify-center h-screen bg-gray-300">
        </div>
    `;
    this.container.innerHTML = layoutHtml;
  }
}
