import homePage from '/js/pages/home-page.cmps.js';
import aboutPage from '/js/pages/about-page.cmps.js';
import bookApp from '/js/pages/book-app.cmps.js';
import bookDetails from '/js/pages/book-details.cmps.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
];

export const router = new VueRouter({ routes });