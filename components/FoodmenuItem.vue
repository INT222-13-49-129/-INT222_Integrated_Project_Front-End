<template>
    <div class="bg-white filter drop-shadow relative">
        <slot name="top"></slot>
        <div class="flex flex-col justify-center text-center py-6 xl:px-4">
            <div class="text-gray-600">สรุปรายการ</div>
            <div class="text-xl">{{ foodmenu.foodname ? foodmenu.foodname : 'ชื่ออาหาร' }}</div>
            <slot name="header"></slot>
            <div class="xl:mt-6 mt-4 text-gray-500 px-3 xl:text-base text-sm">
                <div class="flex border-b-2 pb-2">
                    <div class="xl:w-6/12 w-5/12 text-left xl:pl-8 pl-2">รายการ</div>
                    <div class="xl:w-2/12" :class="edit?'w-3/12':'w-2/12'">kcal.</div>
                    <div class="xl:w-2/12" :class="edit?'w-3/12':'w-2/12'">จำนวน</div>
                    <div class="xl:w-2/12 w-1/12"></div>
                </div>
                <div class="mt-2 border-b-2 pb-2">
                    <div
                        v-for="i in foodmenu.foodmenuHasIngredientsList"
                        :key="i.key.ingredientsIngredientsid"
                        class="flex py-1 items-center"
                    >
                        <div
                            class="xl:w-6/12 w-5/12 text-left xl:pl-8 pl-2 truncate cursor-pointer"
                            @click="$parent.ingredientsItemShow=true,$parent.ingredientsItem=i.ingredients"
                        >{{ i.ingredients.ingredientsname }}</div>
                        <div class="xl:w-2/12" :class="edit?'w-3/12':'w-2/12'">{{ i.totalkcal }}</div>
                        <div class="xl:w-2/12" :class="edit?'w-3/12 relative':'w-2/12'">
                            <button
                                v-if="edit"
                                class="material-icons text-gray-300 absolute xl:left-5 left-2 cursor-pointer xl:text-base text-sm"
                                @click="i.totalunit !== 1 ? $parent.addingredients(i.ingredients, i.totalunit - 1) : ''"
                            >remove_circle_outline</button>
                            <span>{{ i.totalunit }}</span>
                            <button
                                v-if="edit"
                                class="material-icons text-gray-300 absolute xl:right-5 right-2 cursor-pointer xl:text-base text-sm"
                                @click="$parent.addingredients(i.ingredients, i.totalunit + 1)"
                            >add_circle_outline</button>
                        </div>
                        <div class="text-left flex xl:justify-start  xl:w-2/12" :class="edit?'w-1/12 justify-end':'w-3/12'">
                            <div class="truncate" :class="{'w-10/12 xl:block hidden':edit}">{{ i.ingredients.unit }}</div>
                            <i  v-if="edit"
                                class="material-icons text-gray-200 cursor-pointer"
                                @click="$parent.deleteingredients(i.ingredients)"
                            >delete</i>
                        </div>
                    </div>
                </div>
            </div>
            <slot name="footer"></slot>
        </div>
        <div class="w-full xl:py-5 py-3 bg-gray-100 flex justify-center items-center">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        foodmenu: {
            type: Object,
            default() {
                return null
            },
        },
        edit: {
            type: Boolean,
            default: false,
        },
    }
}
</script>