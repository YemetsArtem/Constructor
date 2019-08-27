class Page {
    constructor(page) {
        this.pages = document.querySelector("main").children;
        this.page = document.querySelector(`.${page}`);
        this.tab = document.querySelector(`#${page}Tab`);
    }

    show() {
        for (let i = 0; i < this.pages.length; i++) {
            const page = this.pages[i];
            page === this.page ?
                page.style.display = "" :
                page.style.display = "none";
        }
    }

    bindTab(cb) {
        this.tab.addEventListener("click", () => {
            const fn = cb || this.show.bind(this);
            fn();
        })
    }
}

export default Page;