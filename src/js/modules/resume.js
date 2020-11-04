"use strict";

function resume() {

    class ResumeAll {
        constructor(href, src, alt, parent, head, subhead, descr) {
            this.href = href;
            this.src = src;
            this.alt = alt;
            this.parent = document.querySelector(parent);
            this.head = head;
            this.subhead = subhead;
            this.descr = descr;
        }

        render() {
            const element = document.createElement('li');

            if (this.href == '') {
                element.innerHTML = `
                <div class="resume__wrapper-line">
                    <h4 class="title title_fz16 resume__wrapper-title">${this.head}</h4>
                    <img class="resume__wrapper-img" src="${this.src}" alt="${this.alt}">
                </div>
                <h5 class="title title_fz14 resume__wrapper-subtitle">${this.subhead}</h5>
                <div class="resume__wrapper-descr">${this.descr}</div>`;
            } else if (this.href == 1) {
                element.innerHTML = `
                <div class="resume__wrapper-line">
                    <h4 class="title title_fz16 resume__wrapper-title">${this.head}</h4>
                        <img class="resume__wrapper-img" src="${this.src}" alt="${this.alt}">
                    </div>
                <h5 class="title title_fz14 resume__wrapper-subtitle">${this.subhead}</h5>
                <div class="resume__wrapper-descr resume__wrapper-descr-work">${this.descr}</div>
                <button class="button resume-button resume__wrapper-descr-more">Подробнее</button>`;
            } else {
                element.innerHTML = `
                <div class="resume__wrapper-line">
                    <h4 class="title title_fz16 resume__wrapper-title">${this.head}</h4>
                    <img class="resume__wrapper-img" src="${this.src}" alt="${this.alt}">
                </div>
                <h5 class="title title_fz14 resume__wrapper-subtitle">${this.subhead}</h5>
                <div class="resume__wrapper-descr">${this.descr}</div>
                <a href="${this.href}" class="resume__wrapper_sert" target="_blank">Сертификат</a>`;
            }

            
            this.parent.append(element);

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
        data.edu.forEach(({href, src, alt, parent, head, subhead, descr}) => {
            new ResumeAll(href, src, alt, parent, head, subhead, descr).render();
        });
        data.work.forEach(({href, src, alt, parent, head, subhead, descr}) => {
            new ResumeAll(href, src, alt, parent, head, subhead, descr).render();
        });
    })
    .then(() => {showWork();});

    function showWork() {
        let work = document.querySelectorAll('.resume-button');
        for (let button of work) {
            button.addEventListener('click', e => {
                button.previousElementSibling.classList.toggle("resume__wrapper-descr-active");
                if (button.innerHTML == 'Подробнее') {
                    button.innerHTML = 'Свернуть';
                } else {
                    button.innerHTML = 'Подробнее';
                }       
            });
        }
    }
    
}
 
export default resume;