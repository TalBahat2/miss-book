import { bookService } from '/js/services/book-service.js'
import bookFilter from '/js/cmps/book-filter.cmps.js'
import bookList from '/js/cmps/book-list.cmps.js'
import bookAdd from '/js/cmps/book-add.cmps.js'

export default {
    components: {
        bookFilter,
        bookList,
        bookAdd
    },
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter"/>
            <book-add />
            <book-list :books="booksToShow" @selected="selectBook" />
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null,
            currency: { EUR: 3.59, USD: 3.11, ILS: 1 },
            selectedBook: null
        }
    },

    created() {
        this.loadBooks();
    },

    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
            console.log('filterBy', filterBy);
        },
        selectBook(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId);
        },
    },

    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const { byName, toPrice, fromPrice } = this.filterBy
            return this.books.filter(book => {
                const priceInILS = +(book.listPrice.amount * this.currency[book.listPrice.currencyCode]).toFixed(3);
                return priceInILS >= fromPrice &&
                    (priceInILS <= toPrice || !toPrice) &&
                    book.title.includes(byName)
            })
        }
    }
}