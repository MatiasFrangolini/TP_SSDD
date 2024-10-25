export default class AnimalItem {
  constructor({ id, name, description }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  render() {
    return `
            <div style="text-align: center; padding: 20px; width: 50%;">
                <h4 style="font-weight: bold; margin-bottom: 10px;">${this.name}</h5>
                <p style="color: grey;">${this.description}</p>
            </div>
        `;
  }
}
