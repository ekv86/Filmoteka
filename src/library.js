import './sass/index.css';
import { getFilmDetails } from './api';
import { createMarkupForLibrary } from './markup';
import { createMarkupDetails } from './markup';
import { useModal } from './use_modal';
import { errorImage } from './error-image';

const btnWatchEl = document.querySelector('.js-library-btn-watch');
const btnQueEl = document.querySelector('.js-library-btn-que');
const filmListEl = document.querySelector('.js-film_list');
const paginationListEl = document.querySelector('.js-pagination__list');
const prevPageEl = document.querySelector(".js-pagination__arrow_prev");
const nextPageEl = document.querySelector(".js-pagination__arrow_next");
const backdropDescriptionEl = document.querySelector('.backdrop__description');
const backdropButtonsEl = document.querySelector('.backdrop__buttons');
const errorEl = document.querySelector(".js-error");
const loaderEl = document.querySelector('.loader');


const saveValueWatch = localStorage.getItem("watchFilm");
const parseValueWatch = JSON.parse(saveValueWatch);
const saveValueQue = localStorage.getItem("queFilm");
const parseValueQue = JSON.parse(saveValueQue);

let notesOnPage = 4;
if (window.innerWidth > 767) {
    notesOnPage = 6;
}
if (window.innerWidth > 1279) {
    notesOnPage = 9;
}

btnQueEl.addEventListener('click', onQueClick);
btnWatchEl.addEventListener('click', onWatchClick);
filmListEl.addEventListener('click', onFilmClick);


btnWatchEl.classList.add("active__btn");
loaderEl.style.display = 'none';


function watchList(arr) {
    paginationListEl.innerHTML = '';
    filmListEl.innerHTML = createMarkupForLibrary(arr);
    findGenres(arr);
    pagination(arr);
}

watchList(parseValueWatch);

function onWatchClick() {
    btnWatchEl.classList.add("active__btn");
    btnQueEl.classList.remove("active__btn");
    watchList(parseValueWatch);   
}

function onQueClick() {
    btnWatchEl.classList.remove("active__btn");
    btnQueEl.classList.add("active__btn");
    watchList(parseValueQue);
}

function findGenres(arr) {
    let filmsGenres = filmListEl.getElementsByClassName('filmsGenres');
    for (let i = 0; i < filmsGenres.length; i += 1) {
        let genre = arr[i].genres.map(genre => genre.name);
        filmsGenres[i].textContent = genre.join(', ');
    }
}


function pagination(arr) {
    let countOfItems = Math.ceil(arr.length / notesOnPage)
    for (let i = 1; i <= countOfItems; i += 1) {
        let liEl = document.createElement("li");
        liEl.classList.add("pagination__item");
        liEl.classList.add("text");
        liEl.textContent = i;
        paginationListEl.appendChild(liEl);
    }

    let active;
    showPage(paginationListEl.children[0]);

    for (let item of paginationListEl.children) {
        item.addEventListener("click", function () {
            showPage(this);
        });
    }

    function showPage(item) {
        if (active) {
            active.classList.remove("active");
        }
        active = item;
        item.classList.add("active");
        let pageNum = item.textContent;

        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;
        let notes = arr.slice(start, end);
    
        filmListEl.innerHTML = createMarkupForLibrary(notes);
        findGenres(notes);
        hideOverPages();
        errorImage(arr, filmListEl.children);
    }

    nextPageEl.addEventListener("click", onNextPageClick);
    prevPageEl.addEventListener("click", onPrevPageClick);

    function onNextPageClick() {
        if (active.nextElementSibling) {
            showPage(active.nextElementSibling);
        }
    }

    function onPrevPageClick() {
        if (active.previousElementSibling) {
            showPage(active.previousElementSibling);
        }
    }

    function hideOverPages() {
        let items = [...paginationListEl.children];
        if (items.length > 5) {
            items.forEach((item) => item.classList.add("hide"));
            items[0].classList.remove("hide");
            try {
                if (active.previousElementSibling) {
                    active.previousElementSibling.classList.remove("hide");
                    active.previousElementSibling.previousElementSibling.classList.remove("hide");
                }

                active.classList.remove("hide");
                if (active.nextElementSibling) {
                    active.nextElementSibling.classList.remove("hide");
                    active.nextElementSibling.nextElementSibling.classList.remove("hide");
                }
            }
            catch {
                if (active.previousElementSibling) {
                    active.previousElementSibling.classList.remove("hide");
                }

                active.classList.remove("hide");
                if (active.nextElementSibling) {
                    active.nextElementSibling.classList.remove("hide");
                }
            }
        }
    }
}

function fetchError() {
    errorEl.style.display = "block";
    prevPageEl.style.display = "none";
    nextPageEl.style.display = "none";
    loaderEl.style.display = 'none';
}

function onFilmClick(evt) {
    if (evt.target === filmListEl) {
        return
    }
    let filmId = evt.target.closest('.films__item').dataset.id;
    useModal();
    backdropButtonsEl.style.display = 'none';
    backdropDescriptionEl.style.marginBottom = '0';
    getFilmDetails(filmId)
        .then((data) => {
            backdropDescriptionEl.innerHTML = createMarkupDetails(data);
            if (!data.poster_path) {
                backdropDescriptionEl.children[0].src = '/Filmoteka/no-photo.8c94442b.png';
            }
            loaderEl.style.display = 'none';
        })
        .catch(() => {
            fetchError();
        });
}


