!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){i[e]=t},t.parcelRequired7c6=r);var l=r("8nrFW"),a=r("446fK"),o=r("knNGv"),s=(o=r("knNGv"),r("a5TQa")),c=document.querySelector(".js-library-btn-watch"),d=document.querySelector(".js-library-btn-que"),u=document.querySelector(".js-film_list"),m=document.querySelector(".js-pagination__list"),v=document.querySelector(".js-pagination__arrow_prev"),f=document.querySelector(".js-pagination__arrow_next"),p=document.querySelector(".backdrop__description"),y=document.querySelector(".backdrop__buttons"),g=document.querySelector(".js-error"),b=document.querySelector(".loader"),h=localStorage.getItem("watchFilm"),L=JSON.parse(h),S=localStorage.getItem("queFilm"),_=JSON.parse(S),E=4;function x(t){m.innerHTML="",u.innerHTML=(0,o.createMarkupForLibrary)(t),w(t),function(t){for(var n,i=Math.ceil(t.length/E),r=1;r<=i;r+=1){var a=document.createElement("li");a.classList.add("pagination__item"),a.classList.add("text"),a.textContent=r,m.appendChild(a)}g(m.children[0]);var s=!0,c=!1,d=void 0;try{for(var p,y=m.children[Symbol.iterator]();!(s=(p=y.next()).done);s=!0){p.value.addEventListener("click",(function(){g(this)}))}}catch(e){c=!0,d=e}finally{try{s||null==y.return||y.return()}finally{if(c)throw d}}function g(e){n&&n.classList.remove("active"),n=e,e.classList.add("active");var i=(e.textContent-1)*E,r=i+E,l=t.slice(i,r);u.innerHTML=(0,o.createMarkupForLibrary)(l),w(l),L()}function b(){n.nextElementSibling&&g(n.nextElementSibling)}function h(){n.previousElementSibling&&g(n.previousElementSibling)}function L(){var t=e(l)(m.children);if(t.length>5){t.forEach((function(e){return e.classList.add("hide")})),t[0].classList.remove("hide");try{n.previousElementSibling&&(n.previousElementSibling.classList.remove("hide"),n.previousElementSibling.previousElementSibling.classList.remove("hide")),n.classList.remove("hide"),n.nextElementSibling&&(n.nextElementSibling.classList.remove("hide"),n.nextElementSibling.nextElementSibling.classList.remove("hide"))}catch(e){n.previousElementSibling&&n.previousElementSibling.classList.remove("hide"),n.classList.remove("hide"),n.nextElementSibling&&n.nextElementSibling.classList.remove("hide")}}}f.addEventListener("click",b),v.addEventListener("click",h)}(t)}function w(e){for(var t=u.getElementsByClassName("filmsGenres"),n=0;n<t.length;n+=1){var i=e[n].genres.map((function(e){return e.name}));t[n].textContent=i.join(", ")}}window.innerWidth>767&&(E=6),window.innerWidth>1279&&(E=9),d.addEventListener("click",(function(){c.classList.remove("active__btn"),d.classList.add("active__btn"),x(_)})),c.addEventListener("click",(function(){c.classList.add("active__btn"),d.classList.remove("active__btn"),x(L)})),u.addEventListener("click",(function(e){if(e.target===u)return;var t=e.target.closest(".films__item").dataset.id;(0,s.useModal)(),y.style.display="none",p.style.marginBottom="0",(0,a.getFilmDetails)(t).then((function(e){p.innerHTML=(0,o.createMarkupDetails)(e),b.style.display="none"})).catch((function(){g.style.display="block",v.style.display="none",f.style.display="none",b.style.display="none"}))})),c.classList.add("active__btn"),b.style.display="none",x(L)}();
//# sourceMappingURL=library.725ef662.js.map
