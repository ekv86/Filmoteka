const BASE_URL = 'https://api.themoviedb.org/3/';
const END_POINT_ALL = 'trending/movie/day';
const END_POINT_SEARCH = 'search/movie';
const END_POINT_DETAILS = 'movie/';
const KEY_API = '583e8699bc133adc4a2f7322eb108f1f';

export async function getAllFilms(page = 1) {
    return await fetch(`${BASE_URL}${END_POINT_ALL}?api_key=${KEY_API}&page=${page}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getSearchFilms(searchQuery) {
    return await fetch(`${BASE_URL}${END_POINT_SEARCH}?api_key=${KEY_API}&query=${searchQuery}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getFilmDetails(query) {
    return await fetch(`${BASE_URL}${END_POINT_DETAILS}${query}?api_key=${KEY_API}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            return resp.json();
        })
}

export async function getGenres() {
    const response = await fetch(`${BASE_URL}genre/movie/list?api_key=${KEY_API}`)
    const genres = await response.json();
    return genres;
}