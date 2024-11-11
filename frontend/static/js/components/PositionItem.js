

export default class PositionItem {
  constructor(id, lat, long, description) {
    this.id = id;
    this.lat = lat;
    this.long = long;
    this.description = description;
  }

  render() {
    return `
            <div class="flex flex-col p-5 rounded-lg border border-black mx-10 my-5 bg-gray-800 text-white">
            <div class="flex flex-col text-center w-full">
                <h1 style="font-weight: bold; margin-bottom: 10px;">${this.description}</h1>
                <p style="margin-bottom: 10px;">${this.lat}, ${this.long}</p>
                <h4 style="font-weight: bold;">Animales: </h4>
        `;
  }
}
