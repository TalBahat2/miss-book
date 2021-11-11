export default {
    template: `
    <form class="book-filter">
        <h3>Search Your Book</h3>
        <input @input="filter" v-model="filterBy.byName" placeholder="Enter book name">
        <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="Enter min price (ILS)">
        <input @input="filter" v-model.number="filterBy.toPrice" type="number" placeholder="Enter max price (ILS)">
        <button @click.prevent="filter">search</button>
    </form>
    `,
    data() {
        return {
            filterBy: {byName: '', fromPrice: 0, toPrice: 999999},
        }
    },
    methods: {
        filter() {
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)))
            this.$emit('filtered', { ... this.filterBy})
        }
    }
}