"use strict";

function arrowTop() {
    let arrow = document.querySelector('.arrow');

    window.onscroll = function() {
        if (document.documentElement.clientWidth >= 992 && document.documentElement.scrollTop > document.documentElement.clientHeight) {
            arrow.style.display = 'block';
        } else {
            arrow.style.display = 'none';
        }
    };
    
    arrow.addEventListener('mousedown', e => {
        let timer = setInterval(() => {
            document.documentElement.scrollTop -= 15;
            if (document.documentElement.scrollTop <= 0) {
                clearInterval(timer);
            }
        }, 5);
    });
    
    window.onresize = function() {
        if (document.documentElement.clientWidth <= 992) {
            arrow.style.display = '';
        }
    };
}

export default arrowTop;