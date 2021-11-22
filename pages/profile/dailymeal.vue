<template>
    <div>
        <Calendar v-if="calendar"></Calendar>
        <div class="bgimgepro w-full h-32 flex items-center">
            <div class="xl:w-11/12 mx-auto flex justify-between items-center xl:pt-0 pt-16">
                <div class="text-white font-normal">
                    <h1
                        class="xl:text-3xl text-2xl xl:text-right text-center"
                    >รายการอาหาร{{ selectdate ? `วันที่ ${dateMeal}` : 'วันนี้' }}</h1>
                    <div class="text-base text-right xl:block hidden">หุ่นสวย ด้วยตัวเรา</div>
                </div>
                <i class="material-icons xl:block hidden text-white text-5xl ml-1 cursor-pointer" @click="setcalendar(true)" >date_range</i>
            </div>
        </div>
        <div v-if="mealShow" class="xl:hidden">
            <Modal classpop="flex my-auto mx-auto py-4 xl:w-auto w-11/12">
                <MealItem :meal="mealtime[selectmeal]" :edit="false">
                    <i
                        class="material-icons cursor-pointer xl:text-3xl text-2xl absolute xl:left-4 left-2 xl:top-2 top-1 text-gray-400"
                        @click="mealShow = false"
                    >close</i>
                </MealItem>
            </Modal>
        </div>
        <div v-if="foodmenuShow">
            <div
                class="fixed font-light bg-opacity-20 bg-black flex z-40 inset-0 overflow-y-auto overflow-x-auto"
            >
                <div class="w-full my-auto mx-auto">
                    <div class="xl:w-224 w-11/12 py-4 my-auto mx-auto">
                        <FoodmenuItem :foodmenu="foodmenuSelected">
                            <template #top>
                                <div
                                    class="absolute flex items-center top-1 left-2 cursor-pointer"
                                    @click="foodmenuShow = false"
                                >
                                    <i
                                        class="material-icons xl:text-3xl text-2xl text-gray-400"
                                    >close</i>
                                </div>
                            </template>
                            <template #header>
                                <div class="flex xl:flex-row flex-col items-center">
                                    <FoodmenuImg
                                        :id="foodmenuSelected.foodmenuid"
                                        :general="foodmenuSelected.foodmenustatus === 'PUBLISH'"
                                        class="w-48 h-36 items-center xl:ml-10 xl:mt-2 mt-4 flex flex-shrink-0 filter drop-shadow-md"
                                    />
                                    <div
                                        class="w-full xl:ml-4 mt-4 xl:mt-2 xl:pt-2 pl-8 pr-8 xl:pr-6 xl:pl-0 xl:h-36 flex flex-col justify-between"
                                    >
                                        <div class="xl:text-base text-sm text-left">
                                            คำอธิบาย :
                                            <br />
                                            {{ foodmenuSelected.description }}
                                        </div>
                                        <div
                                            class="xl:text-lg text-base xl:text-right text-center mt-2"
                                        >แคลอรี่รวม {{ foodmenuSelected.totalkcal }} kcal.</div>
                                    </div>
                                </div>
                            </template>
                            <template #bottom>
                                <div
                                    class="py-1 text-gray-700 xl:text-lg text-base"
                                >ประเภท : {{ foodmenuSelected.foodtype.typename }}</div>
                            </template>
                        </FoodmenuItem>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="ingredientsItemShow">
            <Modal classpop="flex justify-center items-center w-full h-full">
                <IngredientsItem :ingredients="ingredientsItem">
                    <i
                        class="material-icons cursor-pointer xl:text-3xl text-2xl absolute xl:left-4 left-2 xl:top-2 top-1 text-gray-400"
                        @click="ingredientsItemShow = false"
                    >close</i>
                </IngredientsItem>
            </Modal>
        </div>
        <div class="flex justify-center w-full xl:mt-6 mt-3 pb-3 gap-x-6">
            <div class="xl:w-96 w-11/12 flex flex-col gap-y-4 mt-1 pt-0.5 pb-1.5">
                <div
                    v-for="(value,key) in Meal"
                    :key="key"
                    @click="selectmeal = key, mealShow = true"
                >
                    <MealTimeItem
                        :editmeal="!selectdate"
                        :meal="{ key, value }"
                        :mealtime="mealtime[key]"
                        :selectmeal="key === selectmeal"
                        :class="{ 'xl:transform xl:scale-113 xl:translate-x-6': key === selectmeal }"
                        class="cursor-pointer"
                    />
                </div>
            </div>
            <div
                class="w-176 min-h-full bg-white rounded-md z-10 filter drop-shadow-r hidden xl:flex flex-col px-8 py-4"
            >
                <div class="flex justify-between">
                    <div>สรุปรายการ</div>
                    <div>รวม {{ mealtime[selectmeal].totalkcal }} kcal.</div>
                </div>
                <div class="flex flex-wrap mt-6 gap-y-4 gap-x-4">
                    <div
                        v-for="f in mealtime[selectmeal].mealHasFoodmenuList"
                        :key="f.key.foodmenuFoodmenuid"
                        class="py-2 xl:py-0 cursor-pointer hover:bg-brightsalmon hover:bg-opacity-10"
                        @click="foodmenuSelected = f.foodmenu, foodmenuShow = true"
                    >
                        <Item
                            :item="{
                                name: f.foodmenu.foodname,
                                description: `จำนวน ${f.totaldish} ที่`,
                                totalkcal: f.totalkcal
                            }"
                            classitem="w-52"
                        >
                            <FoodmenuImg
                                :id="f.key.foodmenuFoodmenuid"
                                :general="f.foodmenu.foodmenustatus === 'PUBLISH'"
                                class="xl:w-24 xl:h-24 w-12 h-12 items-center xl:mr-2 mr-1 flex flex-shrink-0"
                            />
                        </Item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as GeneralApi from '../../utils/generalApi'
import * as UserApi from '../../utils/userApi'
import MealItem from '../../components/MealItem.vue';
import MealTimeItem from '../../components/MealTimeItem.vue';
import FoodmenuItem from '../../components/FoodmenuItem.vue';
import FoodmenuImg from '../../components/FoodmenuImg.vue';
import IngredientsItem from '../../components/IngredientsItem.vue';
import Modal from '../../components/Modal.vue';
import Calendar from '../../components/Calendar.vue';

const Meal = Object.freeze({ Breakfast: "อาหารเช้า", Lunch: "อาหารเที่ยง", Dinner: "อาหารเย็น", Lightmeal: "อาหารว่าง" });

export default {
    components: {
        MealItem,
        MealTimeItem,
        FoodmenuItem,
        FoodmenuImg,
        IngredientsItem,
        Modal,
        Calendar
    },
    layout: 'user',
    middleware: ['auth'],
    data() {
        return {
            Meal,
            date: '',
            selectdate: this.$route.query.date,
            mealdate: [],
            selectmeal: 'Breakfast',
            mealtime: {
                Breakfast: {
                    mealHasFoodmenuList: [],
                    totalkcal: 0
                },
                Lunch: {
                    mealHasFoodmenuList: [],
                    totalkcal: 0
                },
                Dinner: {
                    mealHasFoodmenuList: [],
                    totalkcal: 0
                },
                Lightmeal: {
                    mealHasFoodmenuList: [],
                    totalkcal: 0
                }
            },
            foodmenuSelected: null,
            foodmenuShow: false,
            ingredientsItem: null,
            ingredientsItemShow: false,
            mealShow: false,
            calendar: false
        }
    },
    computed: {
        dateMeal() {
            const date = this.date.split("-");
            return date[2] + "/" + date[1] + "/" + date[0]
        }
    },
    watch: {
        "$route.query.date":async function dateChange() {
            this.selectdate = this.$route.query.date
            this.date = this.getDate()
            await this.getMeal()
            for (const key in this.Meal) {
                if (Object.hasOwnProperty.call(this.Meal, key)) {
                    const m = await this.getMealtime(key)
                    this.mealtime[key] = m
                }
            }
        },
    },
    async mounted() {
        this.date = this.getDate()
        await this.getMeal()
        for (const key in this.Meal) {
            if (Object.hasOwnProperty.call(this.Meal, key)) {
                const m = await this.getMealtime(key)
                this.mealtime[key] = m
            }
        }
    },
    methods: {
        getDate() {
            if (this.selectdate) {
                if (this.isValidDate(this.selectdate) && +new Date(this.getCurrentDate()) > +new Date(this.selectdate)) {
                    return this.getCurrentDate(false, this.selectdate)
                } else {
                    this.$router.push('/profile/dailymeal')
                    this.selectdate = undefined
                    return this.getCurrentDate()
                }
            } else {
                return this.getCurrentDate()
            }
        },
        getCurrentDate(current = true, selectdate) {
            let day
            if (current) {
                day = new Date();
            } else {
                day = new Date(selectdate);
            }
            const year = day.getFullYear()
            const month = String(day.getMonth() + 1).padStart(2, '0')
            const date = String(day.getDate()).padStart(2, '0');

            return year + "-" + month + "-" + date
        },
        isValidDate(dateString) {
            const regexdate = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[ 1-2][0-9]|3[0-1])$/;

            if (!regexdate.test(dateString)) {
                return false;
            }

            const parts = dateString.split("-");
            const day = parseInt(parts[2], 10);
            const month = parseInt(parts[1], 10);
            const year = parseInt(parts[0], 10);

            if (year < 1000 || year > 3000 || month === 0 || month > 12) {
                return false;
            }

            const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                monthLength[1] = 29;
            }

            return day > 0 && day <= monthLength[month - 1];
        },
        async getFoodmenuMeal(meal) {
            const foodmenuList = [];
            for (let i = 0; i < meal.mealHasFoodmenuList.length; i++) {
                const m = meal.mealHasFoodmenuList[i];
                const f = await this.getFoodmenu(m.key.foodmenuFoodmenuid);
                if (f) {
                    foodmenuList.push({ foodmenu: f, ...meal.mealHasFoodmenuList[i] })
                }
            }
            return foodmenuList
        },
        async getFoodmenu(id, general = false) {
            if (general) {
                try {
                    const response = await GeneralApi.foodmenu(id)
                    if (response.data) {
                        return response.data
                    }
                } catch (err) {
                    const status = err.response?.data?.status
                    if (status === 1001) {
                        return null
                    }
                }
            } else {
                try {
                    const response = await UserApi.foodmenu(id)
                    if (response.data) {
                        return response.data
                    }
                } catch (err) {
                    const status = err.response?.data?.status
                    if (status === 1001) {
                        return this.getFoodmenu(id, true)
                    }
                }
            }
        },
        async getMeal() {
            const response = await UserApi.mealDate(this.date)
            this.mealdate = response.data
        },
        async getMealtime(mealtime) {
            const meal = this.mealdate.find(m => m.mealtime === mealtime)
            if (meal) {
                meal.mealHasFoodmenuList = await this.getFoodmenuMeal(meal)
                return meal
            } else {
                return {
                    mealtime,
                    datemeal: this.date,
                    mealHasFoodmenuList: [],
                    totalkcal: 0
                }
            }
        },
        setcalendar(c){
            this.calendar = c
        },
    }
}
</script>
<style>
.bgimgepro {
    background-image: url("../../assets/img/bgprofile.svg");
    background-position: center;
    background-size: 700px auto;
}
</style>