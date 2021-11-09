export default {
    template: `
        <form class="review-add">
            <input type="text" class="full-name" v-model="fullName" placeholder="Enter full name">
            <select name="rate" id="rate" v-model="rate">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input type="date" v-model="readAt">
            <textarea name="" id="" cols="30" rows="10" v-model="txt" placeholder="Enter review"></textarea>
            <button class="submit" @click.prevent="submit">Submit</button>
        </form>
    `,
    data() {
        return {
            fullName: '',
            readAt: null,
            rate: 1,
            txt: ''
        }
    },
    created() {
        this.readAt = this.getFormattedTime();
    },
    methods: {
        getFormattedTime() {
            var now = new Date(Date.now());
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var formattedMonth = (month < 10) ? '0' + month : month;
            var date = now.getDate();
            var formattedDate = (date < 10) ? '0' + date : date;
            return year + '-' + formattedMonth + '-' + formattedDate;
        },
        print() {
            console.log('this.txt', this.txt);
        },
        submit() {
            if (!this.fullName || !this.readAt || !this.txt) return;
            this.$emit('submitted', { fullName: this.fullName, readAt: this.readAt, rate: this.rate, txt: this.txt })
            this.fullName = '';
            this.readAt = this.getFormattedTime();
            this.rate = 1;
            this.txt = '';
        }
    }
}