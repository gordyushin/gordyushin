"use strict";

function menu () {
    const gamburger = document.querySelector('.promo__gamburger'),
          closeMenu = document.querySelector('.menu__close'),
          menu = document.querySelector('.menu'),
          menuItem = document.querySelectorAll(('.menu__item')),
          overflow = document.querySelector('body');

    gamburger.addEventListener('click', () => {
        menu.classList.add('menu_active');
        overflow.setAttribute('style', 'overflow: hidden');
    });

    closeMenu.addEventListener('click', () => {
        hideMenu();
    });

    document.querySelector('.menu__panel').addEventListener('touchend', () => {
        menu.classList.remove('menu_active');
        overflow.setAttribute('style', 'overflow: visible');
    });

    menuItem.forEach((item) => {
        item.addEventListener('click', () => {
            hideMenu();
        });
    });
    function hideMenu() {
        menu.classList.remove('menu_active');
        overflow.setAttribute('style', 'overflow: visible');
    }
}
    
export default menu;