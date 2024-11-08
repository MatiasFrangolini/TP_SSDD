
export default class AnimalPositionsItem {
  constructor({ name, description }) {
    this.name = name;
    this.description = description;
    this.vacaImgUrl = "./vaca.jpg";
  }
  



  render() {
    return `
            <div class="flex p-5 rounded-lg border border-black mx-10 my-5">
            <div
                role="button"
                class="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                >
                <div class="mr-4 grid place-items-center">
                    <img
                    alt="Vaca"
                    src="${this.vacaImgUrl}"
                    class="relative inline-block h-6 w-6 !rounded-full  object-cover object-center"
                    />
                </div>
                <div>
                    <h6 class="text-slate-800 font-medium">
                    ${this.name}
                    </h6>
                    <p class="text-slate-500 text-sm">
                    ${this.description}
                    </p>
                </div>
                </div>
            </div>
        `;
  }
}
