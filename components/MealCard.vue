<template>
    <div
        class="xl:w-16 w-14 xl:h-24 h-20 rounded-md bg-white cursor-pointer"
        :class="[{ 'xl:w-20 w-16 xl:h-28 h-24 shadow-md xl:p-1 p-0.5 text-white': date === 1 }, BMR - sumkcaldate >= 0 ? 'xl:border-4 border-3 border-green-400 border-opacity-95' : 'xl:border-4 border-3 border-red-400 border-opacity-95']"
        @click="date === 1 ? $router.push('/profile/dailymeal') : $router.push(({ path: '/profile/dailymeal', query: { date: getDate() } }))"
    >
        <div class="flex flex-col justify-center items-center w-full h-full rounded-sm"
        :class="date !== 1? '' : BMR-sumkcaldate >= 0 ? 'border-opacity-95 bg-gradient-to-tr from-green-500 to-green-200':'border-opacity-95 bg-gradient-to-tr from-red-500 to-red-300'">
            <div 
                class="xl:text-lg text-base"
                :class="{ 'xl:text-xl text-lg': date === 1 }"
            >{{ selectedDate.getDate() }}</div>
            <div
                class="xl:text-sm text-xs"
                :class="date === 1 ? 'xl:text-base text-sm ' :'text-gray-500'"
            >{{ daysToSrting() }}</div>
            <div class="xl:text-sm text-xs" :class="{ 'xl:text-base text-sm': date === 1 }">
                {{ sumkcaldate }}
            </div>
        </div>
    </div>
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
            user: this.$auth.user,
            BMR: "",
            selectedDate: new Date(),
            mealdate: []
        }
    },
    computed: {
        sumkcaldate() {
            return this.mealdate.map(m => m.totalkcal).reduce((a, b) => a + b, 0)
        },
    },
    mounted() {
        this.selectedDate = new Date();
        this.selectedDate.setDate(this.selectedDate.getDate() - (this.date - 1))
        this.getMeal()
        this.calculateBMR()
    },
    methods: {
        calculateBMR() {
            const today = new Date();
            const birthDate = new Date(this.user.doB);
            const age = today.getFullYear() - birthDate.getFullYear();

            let dailycal
            if (this.user.gender === "M") {
                dailycal = 66 + (13.7 * this.user.weight) + (5 * this.user.height) - (6.8 * age)
            } else if (this.user.gender === "F") {
                dailycal = 665 + (9.6 * this.user.weight) + (1.8 * this.user.height) - (4.7 * age)
            }
            this.BMR = parseInt(dailycal)
        },
        daysToSrting() {
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return daysOfWeek[this.selectedDate.getDay()]
        },
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