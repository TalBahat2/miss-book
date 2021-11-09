import bookPreview from '/js/cmps/book-preview.cmps.js'

export default {
    props: ['books'],
    components: {
        bookPreview
    },
    template: `
    <ul class="book-list">
        <li v-for="book in books" @click="selectBook(book.id)">
            <book-preview :book="book"/>
            <router-link :to="'/book/'+book.id">Details</router-link>
        </li>
    </ul>
    `,
    methods: {
        selectBook(bookId) {
            this.$emit('selected', bookId);
        }
    }
}