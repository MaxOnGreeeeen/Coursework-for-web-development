//функции для манипуляции элементами страницы
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();
    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarNav .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    return loadPage();
});

document.body.onload = () =>{
    setTimeout(()=>{
        const preloader = document.getElementById("preloader");
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
    }, 1000);

}

const loadPage  = () => {

    const workButton = document.getElementById("workPage");
    const aboutButton = document.getElementById("aboutPage");
    const welcomeButton = document.getElementById("welcomePage");
    const workBtn = document.getElementById("btnWork");
    const executeButton = document.getElementById("sup");

    const mainPage = document.getElementById("main-page");
    const workPage = document.getElementById("scroll-wind");
    const aboutPage = document.getElementById("aboutPageContent");

    executeButton.addEventListener("click", ( executeFunction));
    workButton.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            workPage.style.display = "block";
            mainPage.style.display = "none";
            aboutPage.style.display = "none";
        } catch (e) {
            result.innerHTML = e.message;
        }
    });
    workBtn.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            workPage.style.display = "block";
            mainPage.style.display = "none";
            aboutPage.style.display = "none";
        } catch (e) {
            result.innerHTML = e.message;
        }
    });
    aboutButton.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            workPage.style.display = "none";
            mainPage.style.display = "none";
            aboutPage.style.display = "block";
        } catch (e) {
            result.innerHTML = e.message;
        }
    });
    welcomeButton.addEventListener("click", (event) => {
        event.preventDefault();
        try {
            workPage.style.display = "none";
            mainPage.style.display = "block";
            aboutPage.style.display = "none";
        } catch (e) {
            result.innerHTML = e.message;
        }
    });
}