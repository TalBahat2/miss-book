export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <h2>{{book.title}}</h2>
            <p>price: {{fullPrice}}</p>
        </section>
    `,
    data() {
        return {
        }
    },
    computed: {
        fullPrice() {
            switch (this.book.listPrice.currencyCode) {
                case ('EUR'):
                    var currencyIcon = '€'
                    break;
                case ('USD'):
                    var currencyIcon = '$'
                    break;
                case ('ILS'):
                    var currencyIcon = '₪'
                    break;
            }
            return this.book.listPrice.amount + currencyIcon;
        }
    }
}