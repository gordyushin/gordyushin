"use strict";

import arrowTop from './modules/arrowTop';
import carousels from './modules/carousels';
import contacts from './modules/contacts';
import graph from './modules/graph';
import menu from './modules/menu';
import resume from './modules/resume';
import scills from './modules/scills';

window.addEventListener('DOMContentLoaded', () => {
    arrowTop();
    carousels();
    contacts();
    graph();
    menu();
    resume();
    scills();
});
