function loadImage(id, targetId) {
    let element = document.getElementById(id);
    let targetElement = targetId ? document.getElementById(targetId) : element;
    let image;
    if (element
        .dataset.image) {
        image = element
            .dataset.image;
    } else if (typeof element
        .currentSrc === 'undefined') {
        image = element
            .src;
    } else {
        image = element
            .currentSrc;
    }
    if (image) {
        let img = new Image();
        img.src = image;
        img.onload = function() {
            targetElement.classList.add('is-loaded');
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadImage('wallpaper');
    loadImage('pictureImage', 'picture');
});