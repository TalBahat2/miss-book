import bookApp from './pages/book-app.cmps.js'
import appHeader from '/js/cmps/app-header.cmps.js'
import appFooter from '/js/cmps/app-footer.cmps.js'
import userMsg from '/js/cmps/user-msg.cmps.js'
import { router } from '/js/routes.js'

const options = {
    el: '#app',
    router,
    components: {
        bookApp,
        appHeader,
        appFooter,
        userMsg
    },

    template: `
        <section class="app">
            <user-msg />
            <app-header />
            <router-view />
            <app-footer />
        </section>
    `
};

new Vue(options);