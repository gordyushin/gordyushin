"use strict";

function graph() {
    const percent = document.querySelectorAll('.graph__block-percent'),
          lines = document.querySelectorAll('.graph__block-line');

    percent.forEach((item, i) => {
        lines[i].style.width = item.innerHTML;
    });
}

export default graph;