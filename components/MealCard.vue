<template>
    <div
        class="xl:w-16 w-14 xl:h-24 h-20 border-2 rounded-md bg-white flex justify-center items-center"
        :class="{ 'xl:w-20 w-16 xl:h-28 h-24 shadow-md': date === 1 }"
    >
    {{selectedDate.getDate()}}
    <br>
    {{ sumkcaldate }}</div>
</template>
<script>
import * as UserApi from '../utils/userApi'

export default {
    props: {
        date: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            selectedDate: new Date(),
            mealdate:[]
        }
    },
    computed: {
        sumkcaldate() {
            return this.mealdate.map(m => m.totalkcal).reduce((a, b) => a + b, 0)
        }
    },
    mounted() {
        this.selectedDate = new Date();
        this.selectedDate.setDate(this.selectedDate.getDate() - (this.date - 1))
        this.getMeal()
    },
    methods: {
        async getMeal() {
            const date = this.getDate()
            const response = await UserApi.mealDate(date)
            this.mealdate = response.data
        },
        getDate() {
            const year = this.selectedDate.getFullYear()
            const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0')
            const date = String(this.selectedDate.getDate()).padStart(2, '0');

            return year + "-" + month + "-" + date
        },
    },
}
</script>