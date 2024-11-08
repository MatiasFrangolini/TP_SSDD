

export default class PositionItem {
  constructor({ lat, long, description }) {
    this.lat = lat;
    this.long = long;
    this.description = description;
  }

  render() {
    return `
            <div class="flex p-5 rounded-lg border border-black mx-10 my-5">
            <div class="flex flex-col text-center w-full">
                <h4 style="font-weight: bold; margin-bottom: 10px;">${this.description}</h4>
            </div>
            </div>
        `;
  }
}
