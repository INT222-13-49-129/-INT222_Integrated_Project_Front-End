<template>
    <div class="bg-white w-full rounded-md shadow-lg xl:p-4 p-3">
        <div class="flex">
            <div>
                <img class="xl:h-16 h-14" :src="require(`../assets/img/mealtime/${meal.key}.svg`)" />
            </div>
            <div class="pl-4 flex-grow">
                <div>{{ meal.value }}</div>
                <div
                    class="text-sm text-gray-500"
                >จำนวน {{ mealtime.mealHasFoodmenuList.length }} เมนู</div>
            </div>
            <div class="text-salmon mr-2">{{ mealtime.totalkcal }} kcal.</div>
            <div>
                <div v-if="editmeal"
                    class="flex items-center justify-center border-2 hover:bg-gray-100 w-14 rounded-lg xl:gap-x-0.5 gap-x-1 cursor-pointer xl:mr-2"
                    @click="$router.push(({ path: '/foodmenu', query: { meal: meal.key } }))"
                >
                    <i class="material-icons text-sm text-gray-400">edit</i>
                    <div class="text-gray-700 xl:text-sm text-sm">edit</div>
                </div>
            </div>
        </div>
        <div :class="{ 'xl:hidden': selectmeal }">
            <div class="flex border-b-2 text-gray-500 text-sm mt-4">
                <div class="w-2/3">รายการ</div>
                <div class="w-1/6 text-center">จำนวน</div>
                <div class="w-1/6 text-center">kcal.</div>
            </div>
            <div class="flex flex-col gap-y-1 mt-3">
                <div
                    v-for="f in mealtime.mealHasFoodmenuList"
                    :key="f.key.foodmenuFoodmenuid"
                    class="flex text-gray-500 text-sm"
                >
                    <div class="w-2/3 truncate">{{ f.foodmenu.foodname }}</div>
                    <div class="w-1/6 text-center">{{ f.totaldish }}</div>
                    <div class="w-1/6 text-center">{{ f.totalkcal }}</div>
                </div>
            </div>
        </div>
    </div>
</template> 
<script>

export default {
    props: {
        meal: {
            type: Object,
            default: null,
        },
        selectmeal: {
            type: Boolean,
            default: false,
        },
        editmeal: {
            type: Boolean,
            default: true,
        },
        mealtime: {
            type: Object,
            default() {
                return {
                    mealHasFoodmenuList: [],
                    totalkcal: 0
                }
            },
        },
    },
}
</script>