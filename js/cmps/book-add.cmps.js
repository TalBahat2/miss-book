export default {
    template: `
        <section class="book-add">
            <h3>Add a book</h3>
            <input type="text" v-model="bookName" placeholder="search for a book">
        </section>
    `,
    data() {
        return {
            bookName:''
        }
    }
}