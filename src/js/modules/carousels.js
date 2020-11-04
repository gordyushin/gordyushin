"use strict";

function carousels() {
    let offset = 0;
    let triger = 'ok';

    const prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        inner = document.querySelector('.offer__slider-inner'),
        wrapper = document.querySelector('.offer__slider-wrapper');
    
    class Carousel {
        constructor(href, src, alt, parent, ...classes) {
            this.href = href;
            this.src = src;
            this.alt = alt;
            this.parent = document.querySelector(parent);
            this.classes = classes;
        }

        render() {
            const element = document.createElement('div');
            element.classList.add(`${this.classes}`);

            // if (this.classes.length === 0) {
            //     element.classList.add('offer__slide');
            // } else {
            //     this.classes.forEach(name => element.classList.add(name));
            // }
            if (this.href == '') {
                element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">`;
                this.parent.append(element);
            } else {
                element.innerHTML = `
                <a href="${this.href}" target="_blank"><img src="${this.src}" alt="${this.alt}"></a>`;
                this.parent.append(element);
            }
            
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
        data.site.forEach(({href, src, alt, parent, classes}) => {
        new Carousel(href, src, alt, parent, classes).render();
        });
    })
    .then(() => {calculateOffset();});
   
   //Расситываем отступы для слайдов и сдвиг   

    function calculateOffset() {
        let slides = document.querySelectorAll('.offer__slide');
        let width = window.getComputedStyle(wrapper).width;
        let displaySlides = 1;

        if (parseInt(width) >= 940) {
            displaySlides = 2;
        } 

        slides.forEach(item => {
            item.style.margin = `0 calc((${width} - (${displaySlides} * 333px)) / (${displaySlides} * 2))`;
        });

        offset = parseInt(width) / displaySlides;
        return offset;
    }

    //Работа со стрелками

    function settrigerOk() {
        triger = 'ok';
    }
    function settrigerStop() {
        triger = 'stop';
    }

    function reverseNext() {
        inner.style.transition = "none";
        inner.style.transform = `translateX(0)`;
    }

    function reversePrev() {
        inner.style.transition = "none";
        inner.style.transform = `translateX(-${offset}px)`;
    }

    next.addEventListener('click', () => {
        clearInterval(moveCarousel);
        if (triger == 'ok') {
            settrigerStop();
            inner.style.transition = "transform 1.5s";
            inner.style.transform = `translateX(-${offset}px)`;
    
            setTimeout(() => {
                inner.lastChild.after(inner.firstChild);
                reverseNext();
                settrigerOk();
            }, 1800);
        }  
    });

    prev.addEventListener('click', () => {
        clearInterval(moveCarousel);
        if (triger == 'ok') {
            settrigerStop();
            inner.firstChild.before(inner.lastChild);
            reversePrev();

            setTimeout(() => {
                inner.style.transition = "transform 1.5s";
                inner.style.transform = `translateX(0)`;
                setTimeout(() => {
                    settrigerOk();
                }, 1800);
            }, 100);
        }        
    });

    //Автоматическая прокрутка слайдов

    let moveCarousel = setInterval(() => {
        settrigerStop();
        inner.style.transition = "transform 1.5s";
        inner.style.transform = `translateX(-${offset}px)`;

        setTimeout(() => {
            inner.lastChild.after(inner.firstChild);
            reverseNext();
            settrigerOk();
        }, 1800);
    }, 3000);

    
    //Swipe (Листание)

    let initialPoint;
    let finalPoint;
    inner.addEventListener('touchstart', function(event) {
    initialPoint=event.changedTouches[0];
    }, false);
    inner.addEventListener('touchend', function(event) {
    finalPoint=event.changedTouches[0];
    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX){
                clearInterval(moveCarousel);
                if (triger == 'ok') {
                    settrigerStop();
                    inner.style.transition = "transform 1.5s";
                    inner.style.transform = `translateX(-${offset}px)`;
            
                    setTimeout(() => {
                        inner.lastChild.after(inner.firstChild);
                        reverseNext();
                        settrigerOk();
                    }, 1800);
                }  
            }
                else{
                    clearInterval(moveCarousel);
                    if (triger == 'ok') {
                        settrigerStop();
                        inner.firstChild.before(inner.lastChild);
                        reversePrev();

                        setTimeout(() => {
                            inner.style.transition = "transform 1.5s";
                            inner.style.transform = `translateX(0)`;
                            setTimeout(() => {
                                settrigerOk();
                            }, 1800);
                        }, 100);
                    }        
                }
            }
        }
    }, false);



    //2-я карусель

    let offset2 = 0;
    let triger2 = 'ok';
    let counter = 1;
    let dotsImg = [];

    const prev2 = document.querySelector('.poligraf__slider-prev'),
        next2 = document.querySelector('.poligraf__slider-next'),
        inner2 = document.querySelector('.poligraf__slider-inner'),
        wrapper2 = document.querySelector('.poligraf__slider-wrapper');

    //Получаем данные из БД

    let getResource2 = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
        throw new Error(`Could not fetch ${url}, triger: ${res.triger}`);
        }

        return await res.json();
    };

    getResource2('db.json')

    .then(data => {
        data.poligraf.forEach(({href, src, alt, parent, classes}) => {
        new Carousel(href, src, alt, parent, classes).render();
        });
    })
    .then(() => {calculateOffset2();})
    .then(() => {showImgCarousel();});

    //Расситываем отступы для слайдов и сдвиг   

    function calculateOffset2() {
        let slides2 = document.querySelectorAll('.poligraf__slide');
        let width2 = window.getComputedStyle(wrapper2).width;
        let displaySlides = 1;

        if (parseInt(width2) >= 940) {
            displaySlides = 3;
        } if (parseInt(width2) < 940 && parseInt(width2) >= 680) {
            displaySlides = 2;
        }

        slides2.forEach(item => {
            item.style.margin = `0 calc((${width2} - (${displaySlides} * 289px)) / (${displaySlides} * 2))`;
        });

        offset2 = parseInt(width2) / displaySlides;
        return offset2;
    }

    //Работаем со стрелками
    function settrigerOk2() {
        triger2 = 'ok';
    }
    function settrigerStop2() {
        triger2 = 'stop';
    }

    function reverseNext2() {
        inner2.style.transition = "none";
        inner2.style.transform = `translateX(0)`;
    }

    function reversePrev2() {
        inner2.style.transition = "none";
        inner2.style.transform = `translateX(-${offset2}px)`;
    }

    next2.addEventListener('click', () => {
        clearInterval(moveCarousel2);

        if (counter > dotsImg.length) {
            counter = counter - dotsImg.length;
        }

        if (triger2 == 'ok') {
            settrigerStop2();
            inner2.style.transition = "transform 1.5s";
            inner2.style.transform = `translateX(-${offset2}px)`;
    
            setTimeout(() => {
                inner2.lastChild.after(inner2.firstChild);
                reverseNext2();
                settrigerOk2();
                counter++;
            }, 1800);
        }  
    });

    prev2.addEventListener('click', () => {
        clearInterval(moveCarousel2);

        if (counter < 1) {
            counter = dotsImg.length - counter;
        }

        if (triger == 'ok') {
            settrigerStop2();
            inner2.firstChild.before(inner2.lastChild);
            reversePrev2();

            setTimeout(() => {
                inner2.style.transition = "transform 1.5s";
                inner2.style.transform = `translateX(0)`;
                setTimeout(() => {
                    settrigerOk2();
                    counter--;  
                }, 1800);
            }, 100);
        }   
    });

    //Автоматическая прокрутка слайдов

    let moveCarousel2 = setInterval(() => {
        settrigerStop2();
        inner2.style.transition = "transform 1.5s";
        inner2.style.transform = `translateX(-${offset2}px)`;

        setTimeout(() => {
            inner2.lastChild.after(inner2.firstChild);
            reverseNext2();
            settrigerOk2();
            if (counter > dotsImg.length) {
                counter = counter - dotsImg.length;
            }
            counter++;
        }, 1800);
    }, 3000);

    //Создаем превьюшки слайдов

    function showImgCarousel() {
        const dotCarusel = document.createElement('ul');

        dotCarusel.classList.add('carousel-indicators');
    
    
        wrapper2.append(dotCarusel);
    
        let slides2 = document.querySelectorAll('.poligraf__slide');
        let slidesImg = document.querySelectorAll('.poligraf__slide img');
    
        for ( let i = 0; i < slides2.length; i++) {
            let dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.innerHTML = `
            <img src="${slidesImg[i].getAttribute('src')}">`;
            dot.classList.add('dotImg');
            dotCarusel.append(dot);   
            dotsImg.push(dot);
        }

        //При нажатии на картинку перемещаем слайды
        dotsImg.forEach(dot => {
            dot.addEventListener('click', (e) => {
                clearInterval(moveCarousel2);
                const slideTo = e.target.parentNode.getAttribute('data-slide-to');
                let slideIndex = slideTo - counter;

                if (triger == 'ok') {
                    if (slideTo > counter) {
                        for (let i = 0; i < slideIndex; i++) {   
                            inner2.lastChild.after(inner2.firstChild);
                            inner2.style.transition = "none";
                            inner2.style.transform = `translateX(0)`;
                            counter++;
                        }      
                    } else {
                        for (let i = 0; i > slideIndex; i--) {   
                            inner2.firstChild.before(inner2.lastChild);
                            inner2.style.transition = "none";
                            inner2.style.transform = `translateX(0)`;
                            counter--;
                        }     
                    }
                }
            });
        });
        
    }

    //Swipe (Листание)

    inner2.addEventListener('touchstart', function(event) {
    initialPoint=event.changedTouches[0];
    }, false);
    inner2.addEventListener('touchend', function(event) {
    finalPoint=event.changedTouches[0];
    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX){
                clearInterval(moveCarousel2);
                if (triger == 'ok') {
                    settrigerStop2();
                    inner2.style.transition = "transform 1.5s";
                    inner2.style.transform = `translateX(-${offset2}px)`;
            
                    setTimeout(() => {
                        inner2.lastChild.after(inner2.firstChild);
                        reverseNext2();
                        settrigerOk2();
                    }, 1800);
                }  
            }
                else{
                    clearInterval(moveCarousel2);
                    if (triger == 'ok') {
                        settrigerStop2();
                        inner2.firstChild.before(inner2.lastChild);
                        reversePrev2();

                        setTimeout(() => {
                            inner2.style.transition = "transform 1.5s";
                            inner2.style.transform = `translateX(0)`;
                            setTimeout(() => {
                                settrigerOk2();
                            }, 1800);
                        }, 100);
                    }        
                }
            }
        }
    }, false);

    window.onresize = function() {
        calculateOffset2();
        calculateOffset();

    };
    
}
    
export default carousels;