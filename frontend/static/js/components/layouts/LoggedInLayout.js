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
                      <a href="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Animals</a>
                      <a href="/add" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Add Animal</a>
                      <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">CheckPoints</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </nav>

        <div id="layout-content" class= "items-center justify-center h-screen">
        </div>
    `;
    this.container.innerHTML = layoutHtml;
  }
}
