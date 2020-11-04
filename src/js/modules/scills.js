"use strict";

function scills() {
    const wrapper = document.querySelector('.scills__wrapper');
    
    class Scill {
        constructor(name, src, alt, classes) {
            this.name = name;
            this.src = src;
            this.alt = alt;
            this.classes = classes;
        }

        render() {
            const element = document.createElement('div');
                  element.classList.add('scills__block');
                  
            element.innerHTML = `
                <img class="scills__block-img ${this.classes}" src="${this.src}" alt="${this.alt}">
                <div class="title title_fz14 scills__block-title">${this.name}</div>`;
            wrapper.append(element);
        }
    }

    //Получаем данные из БД

    let getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, triger: ${res.triger}`);
        }

        return await res.json();
    };

    getResource('db.json')

    .then(data => {
        data.scills.forEach(({name, src, alt, classes}) => {
        new Scill(name, src, alt, classes).render();
        });
    });

}

export default scills;