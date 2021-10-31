<template>
    <div>
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
                    class="flex xl:gap-x-5 gap-x-3 overflow-x-scroll xl:overflow-visible xl:w-auto w-full items-center justify-between mt-4 xl:mt-0"
                >
                    <div v-for="i in 7" :key="i">
                        <div
                            class="xl:w-16 w-14 xl:h-24 h-20 border-2 rounded-md bg-white"
                            :class="{ 'xl:w-20 w-16 xl:h-28 h-24 shadow-md': i === 7 }"
                        ></div>
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
                        <div class="relative h-full flex justify-center items-center">
                            <div
                                class="absolute xl:top-10 top-7 xl:text-sm text-xs"
                            >แคลอรี่ที่ได้รับจากอาหาร</div>
                            <div class="xl:text-6xl text-4xl text-salmon">1187</div>
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
                            <div class="text-lightsalmon xl:text-5xl text-3xl">+1690</div>
                            <div class="xl:text-xl text-base text-gray-500">kcal.</div>
                        </div>
                        <div class="xl:h-24 h-16 flex justify-center items-center">
                            <div
                                class="py-2 px-4 bg-salmon text-white rounded-full xl:text-base text-sm"
                            >ดูรายการที่บันทึกวันนี้</div>
                        </div>
                    </div>
                    <div class="flex justify-between xl:mt-0 mt-6 gap-x-3">
                        <div
                            class="xl:w-40 xl:flex-none flex-1 xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow xl:px-6 px-2 xl:py-10 py-3 xl:text-xl text-sm flex flex-col justify-between"
                        >
                            <div class="flex items-center justify-between text-gray-500">
                                <div>น้ำหนัก</div>
                                <i class="material-icons xl:text-xl text-sm">edit</i>
                            </div>
                            <div class="xl:text-2xl text-xl">
                                181.40
                                <span class="xl:text-lg text-sm text-gray-500">กก.</span>
                            </div>
                        </div>
                        <div
                            class="xl:w-40 xl:flex-none flex-1 xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow xl:px-6 px-2 xl:py-10 py-3 xl:text-xl text-sm flex flex-col justify-between"
                        >
                            <div class="text-gray-500">
                                <div>BMI 31.8</div>
                            </div>
                            <div class="xl:text-2xl text-lg">น้ำหนักเกิน</div>
                        </div>
                        <div
                            class="xl:w-40 xl:flex-none flex-1 xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow xl:px-6 px-2 xl:py-10 py-3 xl:text-xl text-sm flex flex-col justify-between"
                        >
                            <div class="text-gray-500">
                                <div>BMR</div>
                            </div>
                            <div class="xl:text-2xl text-xl">1533</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="xl:mt-8 mt-6 xl:mb-12 mb-8 w-full xl:h-128 h-40 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
            ></div>
        </div>
        <div class="w-full xl:h-12 h-10 bg-salmon"></div>
    </div>
</template>
<script>
import UserImg from '../../components/UserImg.vue';
import MealTime from '../../components/MealTime.vue';

export default {
    components: {
        UserImg,
        MealTime
    },
    layout: 'user',
    middleware: ['auth'],
    data() {
        return {
            user: this.$auth.user
        }
    },
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.replace('/')
        }
    },
}
</script>