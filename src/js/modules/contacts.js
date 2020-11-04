"use strict";

function contacts() {
    const overflow = document.querySelector('body'),
          modal = document.querySelector('.modal'),
          thank = document.querySelector('.modal__thank'),
          closeModal = document.querySelector('.modal__close'),
          eye = document.querySelector('.contacts__img'),
          form = document.querySelector('.contacts__form');

    // Мигает глазом
    function closeEye() {
        eye.setAttribute('src', 'img/wolf2.png');
        setTimeout(openEye, 200);
    }
    function openEye() {
        eye.setAttribute('src', 'img/wolf.png');
    }
    setInterval(closeEye, 5000);

    //работаем с формой
    form.onsubmit = e => {
        e.preventDefault();
        send();
    };

    function send() { //отправляем данные, используя AJAX
        let formData = new FormData(form); //формируем данные для отправки
        fetch("mailer/smart.php", {
            method: "POST",
            body: formData,
        })
        .then(data => {
            thank.innerHTML = `Спасибо!<br>
            Я свяжусь с вами<br>в ближайшее время`;
            modal.classList.add('modal_active'); 
            overflow.style.overflow = 'hidden';
        }).catch(() => {
            thank.innerHTML = `Извините,<br>
            что-то пошло не так...`;
            modal.classList.add('modal_active'); 
            overflow.style.overflow = 'hidden';
        }).finally(() => {
            form.reset();
        });
    }

    closeModal.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        overflow.setAttribute('style', 'overflow: visible');
    });
}
    
export default contacts;
