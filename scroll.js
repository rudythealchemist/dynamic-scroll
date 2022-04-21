// // DATE CURRENT YEAR
// // NAV BAR SCROLLABLE 
// // SIDE BAR NOT VISIBLE AFTER CLICK
// // BACK TO BTN ONLY VISIBLE AT SPECIFIC SCROLL POSITION
// SMOOTH SCROLL

// //DATE
const date = document.querySelector('.date');
date.innerHTML = new Date().getFullYear();



//OPEN NAV, ADD LINKS DYNAMICALLY
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', () => {
    // linksContainer.classList.toggle('show-links'); not dynamic nav
    const containerHeight = linksContainer.getBoundingClientRect().height;//get height of container
    const linksHeight = links.getBoundingClientRect().height;//get hight of links

    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

const topLink = document.querySelector('.top-link');
const navbar = document.getElementById('nav');
// //fixed NAV BAR SCROLLABLE, if navbar scolls to a certain point, then apply fixed class
window.addEventListener('scroll', () => {
    // console.log(window.pageYOffset);
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }
    if (scrollHeight > 500) {//if user scrolls > 500px, show scroll btn
        topLink.classList.add('show-link');
    } else {
        topLink.classList.remove('show-link');
    }
});


//SMOOTH SCROLL
//select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        //prevent default click behaviour
        e.preventDefault();
        //navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);//target href attr in html
        const element = document.getElementById(id);
        //calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');//boolean value
        let position = element.offsetTop - navHeight;
        // console.log(position);
        //large screens
        if (!fixedNav) {
            position = position - navHeight;
        }
        //small screens
        //75 is height of navbar,see getBoundingClientRect.
        if (navHeight > 75) {
            position = position + containerHeight;
        }

        window.scrollTo({
            left: 0,
            top: position,
        });
        linksContainer.style.height = 0;//close nav menu on click
    });

});