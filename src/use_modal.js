export function useModal() {
    const closeBtnEl = document.querySelector('.js-close-btn');
    const backdropEl = document.querySelector('.js-backdrop');
    const backdropModalEl = document.querySelector('.js-backdrop-modal');

    backdropEl.classList.remove("is-hidden");

    closeBtnEl.addEventListener('click', onClickCloseBtn);
    window.addEventListener('keydown', onEscPress);
    window.addEventListener('mousedown', onMouseDown);

    function onClickCloseBtn() {
        backdropEl.classList.add("is-hidden");
    }

    function onEscPress(evt) {
        if (evt.code === 'Escape') {
            backdropEl.classList.add("is-hidden");
        }
        if (backdropEl.classList.contains("is-hidden")) {
            window.removeEventListener('keydown', onEscPress)
        }
    }

    function onMouseDown(evt) {
        if (!backdropModalEl.contains(evt.target)) {
            backdropEl.classList.add("is-hidden");
        }
        if (backdropEl.classList.contains("is-hidden")) {
            window.removeEventListener('mousedown', onMouseDown);
        }
    }
}
