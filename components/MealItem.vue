<template>
    <div class="xl:w-128 w-full bg-white rounded-lg relative">
        <slot></slot>
        <div class="pt-6 pb-4">
            <div class="text-center xl:text-base text-sm">{{ dateMeal }}</div>
            <div
                class="text-center xl:text-2xl text-xl flex items-center justify-center ml-6 relative"
            >
                {{ Meal[meal.mealtime] }}
                <i
                    class="material-icons cursor-pointer"
                    @click="mealtime = !mealtime"
                >{{ mealtime ? 'expand_less' : 'expand_more' }}</i>
                <div
                    v-if="mealtime"
                    class="absolute bg-white ml-12 rounded-md top-8 xl:text-base text-sm text-left py-2 filter drop-shadow"
                >
                    <div
                        v-for="(value, key) in Meal"
                        :key="key"
                        class="px-2 py-0.5 cursor-pointer"
                        :class="{ 'bg-gray-300': meal.mealtime === key }"
                        @click="meal.mealtime === key?'':$parent.$parent.changeMealTime(key),mealtime=false"
                    >{{ value }}</div>
                </div>
            </div>
        </div>
        <div class="py-4 xl:px-8 px-4 border-b-2 border-t-2">
            <div class="flex justify-between">
                <div>สรุปรายการ</div>
                <div>รวม {{ meal.totalkcal }} kcal.</div>
            </div>
            <div class="flex flex-col gap-y-3 py-4">
                <div
                    v-for="f in meal.mealHasFoodmenuList"
                    :key="f.key.foodmenuFoodmenuid"
                    class="flex items-center xl:gap-x-2"
                >
                    <Item
                        :item="{
                            name: f.foodmenu.foodname,
                            description: `จำนวน ${f.totaldish} ที่`,
                            totalkcal: f.totalkcal
                        }"
                        class="flex-grow"
                    >
                        <FoodmenuImg
                            :id="f.foodmenu.foodmenuid"
                            :general="f.foodmenu.foodmenustatus === 'PUBLISH'"
                            class="xl:w-20 xl:h-20 w-10 h-10 items-center xl:mr-2 mr-1 flex flex-shrink-0"
                        />
                    </Item>
                    <div
                        class="bg-gray-300 text-white rounded-full px-3 py-0.5 cursor-pointer xl:block hidden"
                        @click="$parent.$parent.showFoodmenu(f.foodmenu)"
                    >แก้ไข</div>
                    <div class="flex flex-col ml-2 xl:ml-0">
                        <i
                            class="material-icons text-gray-300 text-2xl cursor-pointer xl:hidden"
                            @click="$parent.$parent.showFoodmenu(f.foodmenu)"
                        >edit</i>
                        <i
                            class="material-icons text-gray-300 xl:text-3xl text-2xl cursor-pointer"
                            @click="$parent.$parent.deleteMealFoodmenu(f.foodmenu)"
                        >delete</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-4 px-4 flex items-center xl:justify-end justify-around gap-x-3">
            <div
                class="xl:w-2/12 w-4/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
                @click="$parent.$parent.getMeal()"
            >คืนค่า</div>
            <div
                class="xl:w-2/12 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                @click="meal.mealHasFoodmenuList.length === 0 ? $parent.$parent.deleteMeal() : $parent.$parent.addMeal()"
            >บันทึก</div>
        </div>
    </div>
</template>
<script>
const Meal = Object.freeze({ Lightmeal: "อาหารว่าง", Breakfast: "อาหารเช้า", Lunch: "อาหารเที่ยง", Dinner: "อาหารเย็น" });

export default {
    props: {
        meal: {
            type: Object,
            default() {
                return null
            },
        },
    },
    data() {
        return {
            Meal,
            mealtime: false
        }
    },
    computed: {
        dateMeal() {
            const date = this.meal.datemeal.split("-");
            return date[2] + "-" + date[1] + "-" + date[0]
        }
    }
}
</script>