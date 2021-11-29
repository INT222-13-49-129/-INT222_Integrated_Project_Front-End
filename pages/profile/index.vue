<template>
    <div>
        <Calendar v-if="calendar"></Calendar>
        <div class="xl:mt-12 mt-20 mx-auto xl:w-272 w-11/12">
            <div class="flex items-center justify-between xl:flex-row flex-col">
                <div class="xl:w-5/12 w-full flex justify-between flex-shrink-0 items-center">
                    <div class="text-salmon xl:text-2xl text-xl flex-shrink-0">
                        Welcome , {{ user.username }} !
                        <span
                            class="block text-gray-500 xl:text-xl text-base xl:mt-4"
                        >Always save on eating food.</span>
                    </div>
                    <div class="h-full">
                        <client-only>
                            <UserImg class="xl:h-20 xl:w-20 w-14 h-14" />
                        </client-only>
                    </div>
                </div>
                <div
                    class="flex flex-row-reverse xl:gap-x-5 gap-x-3 overflow-x-scroll xl:overflow-visible xl:w-auto w-full items-center justify-between mt-4 xl:mt-0"
                >
                    <div v-for="i in 7" :key="i">
                        <MealCard :date="i" />
                    </div>
                </div>
            </div>
            <div class="flex xl:mt-8 mt-6 justify-between xl:flex-row flex-col">
                <div
                    class="relative xl:w-128 w-full xl:h-128 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow flex flex-col justify-between items-center"
                >
                    <div
                        class="xl:h-20 h-14 flex justify-center items-center xl:text-2xl text-xl"
                    >วันนี้</div>
                    <MealTime>
                        <div class="relative h-full flex justify-center items-center rounded-full">
                            <div
                                class="absolute xl:top-10 top-7 xl:text-sm text-xs"
                            >แคลอรี่ที่ได้รับจากอาหาร</div>
                            <div class="xl:text-6xl text-4xl text-salmon">{{ sumkcaldate }}</div>
                            <img
                                src="../../assets/img/cat.svg"
                                class="absolute xl:bottom-4 bottom-2 xl:h-16 h-11"
                            />
                        </div>
                    </MealTime>
                    <div
                        class="xl:h-20 h-14 flex justify-center items-center xl:text-xl text-base"
                    >กดบันทึกรายการอาหารในวงแหวน</div>
                </div>
                <div class="flex flex-col justify-between xl:mt-0 mt-6">
                    <div
                        class="xl:w-128 w-full xl:h-80 py-3 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow flex flex-col justify-between items-center"
                    >
                        <div
                            class="xl:h-24 h-16 flex justify-center items-center xl:text-xl text-lg"
                        >เหลือแคลอรี่ที่ทานได้</div>
                        <div class="flex items-center justify-around w-8/12 xl:my-0 my-3">
                            <i
                                class="material-icons xl:text-3xl text-2xl text-brightsalmon"
                            >lunch_dining</i>
                            <div class="text-lightsalmon xl:text-5xl text-3xl">
                                <span v-if="BMR - sumkcaldate > 0">+</span>
                                {{ BMR - sumkcaldate }}
                            </div>
                            <div class="xl:text-xl text-base text-gray-500">kcal.</div>
                        </div>
                        <div class="xl:h-24 h-16 flex justify-center items-center">
                            <div
                                class="py-2 px-4 bg-salmon text-white rounded-full xl:text-base text-sm cursor-pointer"
                                @click="$router.push('/profile/dailymeal')"
                            >ดูรายการที่บันทึกวันนี้</div>
                        </div>
                    </div>
                    <div class="flex justify-between xl:mt-0 mt-6 gap-x-3">
                        <div
                            class="xl:w-40 xl:flex-none flex-1 xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow xl:px-6 px-2 xl:py-10 py-3 xl:text-xl text-sm flex flex-col justify-between"
                        >
                            <div class="flex items-center justify-around text-gray-500">
                                <div>น้ำหนัก</div>
                                <i class="material-icons xl:text-xl text-sm cursor-pointer" @click="$router.push('/profile/setting/account')">edit</i>
                            </div>
                            <div class="xl:text-2xl text-xl text-center">
                                {{ user.weight }}
                                <span class="xl:text-lg text-sm text-gray-500">กก.</span>
                            </div>
                        </div>
                        <div
                            class="xl:w-40 xl:flex-none flex-1 xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow xl:px-6 px-2 xl:py-10 py-3 xl:text-xl text-sm flex flex-col justify-between"
                        >
                            <div class="text-gray-500 text-center">
                                <div>BMI {{ BMI }}</div>
                            </div>
                            <div class="xl:text-2xl text-lg text-center">{{ BMItext }}</div>
                        </div>
                        <div
                            class="xl:w-40 xl:flex-none flex-1 xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow xl:px-6 px-2 xl:py-10 py-3 xl:text-xl text-sm flex flex-col justify-between"
                        >
                            <div class="text-gray-500 text-center">
                                <div>BMR</div>
                            </div>
                            <div class="xl:text-2xl text-xl text-center">{{ BMR }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="xl:mt-8 mt-6 xl:mb-12 mb-8 w-full h-auto bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow flex flex-col justify-center xl:py-10 py-4"
            >
                <div class="flex items-center xl:px-12 px-4 xl:mb-4 mb-2 justify-between">
                    <div class="xl:text-2xl text-lg flex-shrink-0">ประวัติจำนวนแคลอรี่</div>
                    <div class="flex items-center xl:gap-x-2 gap-x-0.5">
                        <div class="xl:text-sm text-xs flex items-center bg-gray-100  rounded-full xl:p-1 p-0.5">
                            <div class="rounded-full py-1 xl:px-3 px-2 cursor-pointer" :class="chartWeek?'bg-white shadow-sm':'bg-gray-100'"
                            @click="chartWeek= true">Week</div>
                            <div class="rounded-full py-1 xl:px-3 px-2 cursor-pointer" :class="!chartWeek?'bg-white shadow-sm':'bg-gray-100'"
                            @click="chartWeek= false">Month</div>
                        </div>
                        <div class="relative xl:w-12 w-8 xl:h-12 h-8 bg-gray-100 flex justify-center items-center rounded-full  cursor-pointer">
                            <i class="absolute material-icons xl:text-3xl text-lg" @click="setcalendar(true)">date_range</i>
                        </div>
                    </div>
                </div>
                <div class="w-11/12 mx-auto">
                    <LineChart :rounds="chartWeek?7:30" />
                </div>
                
            </div>
        </div>
        <div class="w-full xl:h-12 h-10 bg-salmon relative">
            <img
                src="../../assets/img/barbell.svg"
                class="xl:h-16 h-10 absolute xl:-top-7 -top-5 left-2"
            />
        </div>
    </div>
</template>
<script>
import * as UserApi from '../../utils/userApi'
import UserImg from '../../components/UserImg.vue';
import MealTime from '../../components/MealTime.vue';
import MealCard from '../../components/MealCard.vue';
import LineChart from '../../components/LineChart.vue';
import Calendar from '../../components/Calendar.vue';

export default {
    components: {
        UserImg,
        MealTime,
        MealCard,
        LineChart,
        Calendar
    },
    layout: 'user',
    middleware: ['auth'],
    data() {
        return {
            user: this.$auth.user,
            BMR: "",
            BMI: "",
            BMItext: "",
            mealdate: [],
            chartWeek: true,
            calendar: false
        }
    },
    computed: {
        sumkcaldate() {
            return this.mealdate.map(m => m.totalkcal).reduce((a, b) => a + b, 0)
        }
    },
    mounted() {
        this.calculateBMR();
        this.calculateBMI();
        this.getMeal()
    },
    methods: {
        setcalendar(c){
            this.calendar = c
        },
        logout() {
            this.$auth.logout()
            this.$router.replace('/')
        },
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
        calculateBMI() {
            this.BMI = (this.user.weight / Math.pow(this.user.height / 100, 2)).toFixed(2)
            if (this.BMI < 18.5) {
                this.BMItext = "ผอมไป"
            } else if (this.BMI < 23) {
                this.BMItext = "สมส่วน"
            } else if (this.BMI < 25) {
                this.BMItext = "น้ำหนักเกิน"
            } else if (this.BMI < 30) {
                this.BMItext = "อ้วน"
            } else {
                this.BMItext = "อ้วนมาก"
            }
        },
        async getMeal() {
            const date = this.getCurrentDate()
            const response = await UserApi.mealDate(date)
            this.mealdate = response.data
        },
        getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const date = String(today.getDate()).padStart(2, '0');

            return year + "-" + month + "-" + date
        },
    }
}
</script>