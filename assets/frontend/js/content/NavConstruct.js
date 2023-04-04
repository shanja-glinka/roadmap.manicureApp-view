class NavConstruct {

    constructor() {
        this.navTag = 'nav';
        this.defaultNavDividerWidth = '10px';
    }

    constructStep(navData) {
        return _doc.createElement('a', {
            class: "nav-step",
            innerText: navData.text,
            attributes: [
                ["nav-time", navData.t]
            ]
        });
    }

    constructDivider(index) {
        return _doc.createElement('div', { class: "space-divider step-" + index });
    }

    render(navObj) {
        let nav = _doc.createElement(this.navTag);

        for (let k in navObj) {
            nav.appendChild(this.constructDivider(parseInt(k) + 1));
            nav.appendChild(this.constructStep(navObj[k]));
        }

        document.querySelector('main').appendChild(nav);
    }
}