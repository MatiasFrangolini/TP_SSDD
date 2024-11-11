
export default class AnimalPositionsItem {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  



  render() {
    return `<div class="flex flex-col items-center p-3 border border-black rounded-lg my-1">
              <h6 class="text-slate-800 font-medium">${this.name}</h6>
              <p class="text-slate-500 text-sm">${this.description}</p>
            </div>
        `;
  }
}
