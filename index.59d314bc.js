!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){i[e]=t},t.parcelRequired7c6=r);var l,o,s=r("8nrFW"),a=r("446fK"),c=(r("446fK"),a=r("446fK"),r("knNGv")),u=(c=r("knNGv"),r("a5TQa")),d=r("71ZIC"),f={keyWatchFilm:"watchFilm",keyQueFilm:"queFilm"},m=document.querySelector(".js-film_list"),h=document.querySelector(".js-film-form"),p=document.querySelector(".pagination"),g=document.querySelector(".js-pagination__list"),v=document.querySelector(".js-pagination__arrow_prev"),y=document.querySelector(".js-pagination__arrow_next"),S=document.querySelector(".backdrop__description"),E=document.querySelector(".js-btn-watch"),b=document.querySelector(".js-btn-que"),L=document.querySelector(".js-error"),_=document.querySelector(".js-error_search"),k=document.querySelector(".loader"),w=1,x={},F=null!==(l=JSON.parse(localStorage.getItem(f.keyWatchFilm)))&&void 0!==l?l:[],q=null!==(o=JSON.parse(localStorage.getItem(f.keyQueFilm)))&&void 0!==o?o:[];function T(){L.style.display="block",v.style.display="none",y.style.display="none",k.style.display="none"}function j(){_.style.display="block"}function M(e){(0,a.getGenres)().then((function(t){for(var n=m.getElementsByClassName("filmsGenres"),i=[],r=0;r<t.genres.length;r+=1)for(var l=[],o=0;o<e.length;o+=1)l.splice(0,l.length),e[o].genre_ids.forEach((function(e){var n=t.genres.find((function(t){return t.id===e}));l.push(n.name)})),i.push(l.join(", "));for(var s=0;s<n.length;s+=1)n[s].textContent=i[s]})).catch((function(){T()}))}if(h.addEventListener("submit",N),m.addEventListener("click",(function(e){if(e.target===m)return;var t=e.target.closest(".films__item").dataset.id;(0,u.useModal)(),(0,a.getFilmDetails)(t).then((function(e){S.innerHTML=(0,c.createMarkupDetails)(e),x=e,e.poster_path||(S.children[0].src="/no-photo.6ebb93e4.png"),k.style.display="none"})).catch((function(){T()})),x={}})),b.addEventListener("click",(function(){if(q.some((function(e){var t=e.id;return Number(t)===x.id})))return;q.push(x),localStorage.setItem(f.keyQueFilm,JSON.stringify(q))})),E.addEventListener("click",(function(){if(F.some((function(e){return e.id===x.id})))return;F.push(x),localStorage.setItem(f.keyWatchFilm,JSON.stringify(F))})),(0,a.getAllFilms)().then((function(t){m.insertAdjacentHTML("beforeend",(0,c.createMarkupFilms)(t.results)),M(t.results),(0,a.getAllFilms)().then((function(t){for(var n=1;n<=t.total_pages;n+=1){var i=document.createElement("li");i.classList.add("pagination__item"),i.classList.add("text"),i.textContent=n,g.appendChild(i)}var r;S(g.children[0]);var l=!0,o=!1,u=void 0;try{for(var f,h=g.children[Symbol.iterator]();!(l=(f=h.next()).done);l=!0)f.value.addEventListener("click",(function(){S(this)}))}catch(e){o=!0,u=e}finally{try{l||null==h.return||h.return()}finally{if(o)throw u}}function S(e){r&&r.classList.remove("active"),r=e,e.classList.add("active"),w=e.textContent,(0,a.getAllFilms)(w).then((function(e){m.insertAdjacentHTML("beforeend",(0,c.createMarkupFilms)(e.results)),M(e.results),(0,d.errorImage)(e.results,m.children),k.style.display="none"})).catch((function(){T(),p.style.display="none"})),m.innerHTML="",L()}function E(){r.nextElementSibling&&S(r.nextElementSibling)}function b(){r.previousElementSibling&&S(r.previousElementSibling)}function L(){var t=e(s)(g.children);if(t.length>5){t.forEach((function(e){return e.classList.add("hide")})),t[0].classList.remove("hide");try{r.previousElementSibling&&(r.previousElementSibling.classList.remove("hide"),r.previousElementSibling.previousElementSibling.classList.remove("hide")),r.classList.remove("hide"),r.nextElementSibling&&(r.nextElementSibling.classList.remove("hide"),r.nextElementSibling.nextElementSibling.classList.remove("hide"))}catch(e){r.previousElementSibling&&r.previousElementSibling.classList.remove("hide"),r.classList.remove("hide"),r.nextElementSibling&&r.nextElementSibling.classList.remove("hide")}}}y.addEventListener("click",E),v.addEventListener("click",b)})).catch((function(e){return console.log(e)})),k.style.display="none"})).catch((function(){T()})),h[0].value){window.addEventListener("keydown",(function e(t){"Enter"===t.code&&N();h[0].value||window.removeEventListener("keydown",e);console.log(t.code)}))}function N(e){e.preventDefault(),p.style.display="none",_.style.display="none";for(var t=e.currentTarget.searchQuery.value.toLowerCase().split(" "),n=0;n<t.length;n+=1)t[n]=t[n][0].toUpperCase()+t[n].substr(1);var i=t.join(" ");(0,a.getSearchFilms)(i).then((function(e){if(console.log(e),m.innerHTML=(0,c.createMarkupFilms)(e.results),M(e.results),(0,d.errorImage)(e.results,m.children),e.results.forEach((function(e){if(!e.poster_path)throw new Error("There is no picture")})),!e.total_results)throw new j;m.innerHTML="",k.style.display="none"})).catch((function(){console.log("There is no picture")})),e.currentTarget.searchQuery.value=""}}();
//# sourceMappingURL=index.59d314bc.js.map
