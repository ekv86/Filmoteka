import './sass/index.css';
import { getAllFilms, getFilmDetails } from './api';
import { getGenres } from './api';
import { getSearchFilms } from './api';
import { createMarkupDetails } from './markup';
import { createMarkupFilms } from './markup';
import { useModal } from './use_modal';
import { errorImage } from './error-image';
import { common } from './common';



const filmListEl = document.querySelector('.js-film_list');
const filmFormEl = document.querySelector('.js-film-form');
const paginationEl = document.querySelector('.pagination');
const paginationListEl = document.querySelector('.js-pagination__list');
const prevPageEl = document.querySelector(".js-pagination__arrow_prev");
const nextPageEl = document.querySelector(".js-pagination__arrow_next");
const backdropDescriptionEl = document.querySelector('.backdrop__description');
const btnAddWatchEl = document.querySelector('.js-btn-watch');
const btnAddQueEl = document.querySelector('.js-btn-que');
const errorEl = document.querySelector(".js-error");
const errorSearchEl = document.querySelector('.js-error_search');
const loaderEl = document.querySelector('.loader');

let currentPage = 1;
let viewedFilm = {};
let watchFilmArr = JSON.parse(localStorage.getItem(common.keyWatchFilm)) ?? [];
let queFilmArr = JSON.parse(localStorage.getItem(common.keyQueFilm)) ?? [];

filmFormEl.addEventListener('submit', onSubmitForm);
filmListEl.addEventListener('click', onFilmClick);
btnAddQueEl.addEventListener('click', onAddQueClick);
btnAddWatchEl.addEventListener('click', onAddWatchClick);


function fetchError() {
    errorEl.style.display = "block";
    prevPageEl.style.display = "none";
    nextPageEl.style.display = "none";
    loaderEl.style.display = 'none';
}

function searchError() {
    errorSearchEl.style.display = "block";
}

getAllFilms()
    .then((data) => {
        filmListEl.insertAdjacentHTML('beforeend', createMarkupFilms(data.results));
        findGenres(data.results);
        pagination();
        loaderEl.style.display = 'none';
    })
    .catch(() => {
        fetchError();
    });


function findGenres(arr) {
    getGenres().then((genres) => {
        let filmsGenres = filmListEl.getElementsByClassName('filmsGenres');
        let genresArr = []

        for (let i = 0; i < genres.genres.length; i += 1) {
            let genreArr = [];
            for (let j = 0; j < arr.length; j += 1) {
                genreArr.splice(0, genreArr.length);
                arr[j].genre_ids.forEach(function (number) {
                    let genre = genres.genres.find(genre => genre.id === number);
                    genreArr.push(genre.name);
                })

                genresArr.push(genreArr.join(', '))
            }
        }
        for (let i = 0; i < filmsGenres.length; i += 1) {
            filmsGenres[i].textContent = genresArr[i];
        }
    })
        .catch(() => {
            fetchError();
        })
}

function onFilmClick(evt) {
    if (evt.target === filmListEl) {
        return
    }
    let filmId = evt.target.closest('.films__item').dataset.id;
    useModal();
    getFilmDetails(filmId)
        .then((data) => {
            backdropDescriptionEl.innerHTML = createMarkupDetails(data);
            viewedFilm = data;
            if (!data.poster_path) {
                backdropDescriptionEl.children[0].src = '/Filmoteka/no-photo.8c94442b.png';
            }
            loaderEl.style.display = 'none';
        })
        .catch(() => {
            fetchError();
        });
    viewedFilm = {};
}

if (filmFormEl[0].value) {
    window.addEventListener('keydown', onEscPress);

    function onEscPress(evt) {
        if (evt.code === 'Enter') {
            onSubmitForm();
        }

        if (!filmFormEl[0].value) {
            window.removeEventListener('keydown', onEscPress);
        }
        console.log(evt.code)
    }
}

function onSubmitForm(evt) {
    evt.preventDefault();
    paginationEl.style.display = "none";
    errorSearchEl.style.display = "none";

    let currentSearch = evt.currentTarget.searchQuery.value;
    let optimizationArr = currentSearch.toLowerCase().split(" ");
    for (let i = 0; i < optimizationArr.length; i += 1) {
        optimizationArr[i] = optimizationArr[i][0].toUpperCase() + optimizationArr[i].substr(1);
    }
    let optimizationString = optimizationArr.join(" ");

    getSearchFilms(optimizationString)
        .then((data) => {
            console.log(data)
            filmListEl.innerHTML = createMarkupFilms(data.results);
            findGenres(data.results);
            errorImage(data.results, filmListEl.children);

            data.results.forEach(function (el) {
                if (!el.poster_path) {
                    throw new Error('There is no picture');
                }
            })

            if (!data.total_results) {
                throw new searchError();
            }
            filmListEl.innerHTML = "";
            loaderEl.style.display = 'none';
        })
        .catch(() => {
            console.log('There is no picture');
        });
    evt.currentTarget.searchQuery.value = '';
}

function onAddWatchClick() {
    const inStorage = watchFilmArr.some(({ id }) => id === viewedFilm.id);
    if (inStorage) {
        return
    }
    watchFilmArr.push(viewedFilm);
    localStorage.setItem(common.keyWatchFilm, JSON.stringify(watchFilmArr));
}

function onAddQueClick() {
    const inStorage = queFilmArr.some(({ id }) => Number(id) === viewedFilm.id);
    if (inStorage) {
        return
    }

    queFilmArr.push(viewedFilm);
    localStorage.setItem(common.keyQueFilm, JSON.stringify(queFilmArr));
}

function pagination() {
    getAllFilms()
        .then((data) => {
            for (let i = 1; i <= data.total_pages; i += 1) {
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
                currentPage = item.textContent;

                getAllFilms(currentPage)
                    .then((data) => {
                        filmListEl.insertAdjacentHTML('beforeend', createMarkupFilms(data.results));
                        findGenres(data.results);
                        errorImage(data.results, filmListEl.children);
                        loaderEl.style.display = 'none';
                    })
                    .catch(() => {
                        fetchError();
                        paginationEl.style.display = "none";
                    });
                filmListEl.innerHTML = "";
                hideOverPages();
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
        })
        .catch(error => console.log(error));
}