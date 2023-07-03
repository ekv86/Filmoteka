export function createMarkupFilms(arr) {
    return arr.map(({ poster_path, title, release_date, id }) =>
        `<li class="films__item" data-id="${id}">
        <img class="films__img" src="http://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
        <h3 class="films__description text">${title}</h3>
        <span class="filmsGenres"></span>
        <span class="films__description text films__release"> | ${release_date.split("-")[0]}</span>
        </li>`).join('')
}

export function createMarkupDetails(obj) {
    const { poster_path, title, vote_average, vote_count, popularity, original_title,
        genres, overview } = obj;
    let filmGenres = genres.map(genre => genre.name).join(', ');
    const markupDetails = `<img src="http://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" class="backdrop__description-img films__img">
        <div class="backdrop__info"><h2 class="backdrop__description-title text">${title}</h2>
        <div class="backdrop__description-block">
        <p class="backdrop__description-option text">Vote / Votes</p>
        <div class="backdrop__description-value">
        <button class="text backdrop__description-vote">${vote_average.toFixed(1)}</button>
        <span class="text">/</span>
        <button class="text backdrop__description-vote vote_count">${vote_count}</button></div>
        <p class="backdrop__description-option text">Popularity</p>
        <p class="backdrop__description-value text">${popularity.toFixed(1)}</p>
        <p class="backdrop__description-option text">Original Title</p>
        <p class="backdrop__description-value text">${original_title}</p>
        <p class="backdrop__description-option text">Genre</p>
        <p class="backdrop__description-value text">${filmGenres}</p>
        </div>
          <h3 class="backdrop__description-text_title text">About</h3>
          <p class="backdrop__description-text text">${overview}</p></div>`;

    return markupDetails;
}

export function createMarkupForLibrary(arr) {
    return arr.map(({ poster_path, title, release_date, id, vote_average }) =>
        `<li class="films__item" data-id="${id}">
        <img class="films__img" src="http://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
        <h3 class="films__description text">${title}</h3>
        <div class="films__options">
        <span class="filmsGenres"></span>
        <span class="films__description text films__release"> | ${release_date.split("-")[0]}</span></div>
        <button class="backdrop__description-vote library__description-vote">${vote_average.toFixed(1)}</button>
        </li>`).join('')
}