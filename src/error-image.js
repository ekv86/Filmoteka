export function errorImage(arr, listEl) {
    let errorImage = [];
    arr.forEach(function (el) {
        if (!el.poster_path) {
            for (let i = 0; i < listEl.length; i += 1) {
                if (listEl[i].dataset.id == el.id) {
                    errorImage.push(listEl[i]);
                }
            }
        }
    })
    errorImage.forEach(function (item) {
        item.children[0].src = "/no-photo.6ebb93e4.png";
    })
}
