// script.js
function positionSearchBar() {
    const perfil = document.querySelector('.perfil');
    const hora = document.querySelector('.hora');
    const busqueda = document.querySelector('.busqueda');
    const topbar = document.querySelector('.topbar');

    // Verifica si la pantalla es mayor a 768px (donde .topbar es horizontal)
    if (window.innerWidth > 768 && perfil && hora && busqueda && topbar) {
        const perfilRect = perfil.getBoundingClientRect();
        const horaRect = hora.getBoundingClientRect();
        const busquedaRect = busqueda.getBoundingClientRect();
        const topbarRect = topbar.getBoundingClientRect();

        const perfilCenter = (perfilRect.left + perfilRect.right) / 2 - topbarRect.left;
        const horaLeft = horaRect.left - topbarRect.left;
        const spaceBetween = horaLeft - perfilCenter;
        const busquedaWidth = busquedaRect.width;
        const centerPosition = perfilCenter + (spaceBetween - busquedaWidth) / 2;

        busqueda.style.left = `${centerPosition}px`;
    } else {
        busqueda.style.left = 'auto';
    }
}

// Función para alternar el menú hamburguesa
function toggleMenu() {
    const topbarContent = document.querySelector('.topbar-content');
    topbarContent.classList.toggle('active');
}

// Añade eventos
window.addEventListener('load', positionSearchBar);
window.addEventListener('resize', positionSearchBar);

// Añade el evento de clic al ícono de hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
});