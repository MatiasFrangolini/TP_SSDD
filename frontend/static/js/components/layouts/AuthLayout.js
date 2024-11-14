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
                    <h1 class ="px-3 py-2 font-bold text-2xl text-white">TP Sistemas Distribuidos</h1>
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