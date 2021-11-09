import { bookService } from '/js/services/book-service.js'
import reviewAdd from '/js/cmps/review-add.cmps.js'
import { eventBus } from '/js/services/event-bus-service.js';

export default {
    components: {
        reviewAdd
    },
    template: `
        <section class="book-details" :style="styleObject">
            <h2>Book Details:</h2>
            <pre>{{book}}</pre>
            <p>{{readingLength}}</p>
            <p>{{isOld}}</p>
            <p>{{saleSign}}</p>
            <ul v-if="reviews" v-for="(review, reviewIdx) in reviews">Reviews:
                <li>
                    <p>Name: {{review.fullName}}</p>
                    <p>Rate: {{review.rate}}</p>
                    <p>Read At: {{review.readAt}}</p>
                    <p>Name: {{review.fullName}}</p>
                    <button @click="deleteReview(reviewIdx)">Delete</button>
                </li>
            </ul>
            <review-add @submitted="saveReview"></review-add>
        </section>
    `, data() {
        return {
            book: null,
        }
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);
    },
    methods: {
        saveReview(review) {
            bookService.addReview(this.book.id, review)
                .then(book => {
                    this.book = book;
                    var msg = {
                        txt: `review on ${book.title} added successfully!`,
                        type: 'success',
                        link: `/book/${book.id}`
                    }
                    eventBus.$emit('showMsg', msg);
                })
        },
        deleteReview(reviewIdx) {
            bookService.deleteReview(this.book.id, reviewIdx)
                .then(book => {
                    this.book = book
                    var msg = {
                        txt: 'review deleted successfully!',
                        type: 'success'
                    }
                    eventBus.$emit('showMsg', msg);
                })
        }
    },
    computed: {
        reviews() {
            if (!this.book || !this.book.reviews) return null;
            return this.book.reviews;
        },
        readingLength() {
            if (!this.book) return ''
            if (this.book.pageCount > 500) return 'Long Reading';
            if (this.book.pageCount > 200) return 'Decent Reading';
            if (this.book.pageCount < 100) return 'Light Reading';
            else return '';
        },
        isOld() {
            if (!this.book) return '';
            const bookAge = +((new Date(Date.now())).toString().slice(11, 15)) - this.book.publishedDate;
            if (bookAge > 10) return 'Veteran book';
            if (bookAge < 1) return 'New!';
        },
        styleObject() {
            if (!this.book) return '';
            var color = '';
            if (this.book.listPrice.amount > 150) color = 'red';
            else if (this.book.listPrice.amount < 20) color = 'green';
            return { color };
        },
        saleSign() {
            if (!this.book) return '';
            if (this.book.listPrice.isOnSale) {
                return 'SALE!'
            }
            else return '';
        }
    }
}