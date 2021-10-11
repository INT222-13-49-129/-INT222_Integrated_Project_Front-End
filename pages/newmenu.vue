<template>
    <div class="xl:w-336 w-11/12 pt-24 mx-auto xl:pt-16 bg-white shadow-lg">
        <div
            class="bgimge object-cover xl:w-full py-2 xl:h-28 mx-6 xl:mx-0 rounded-3xl xl:rounded-none"
        >
            <div class="flex xl:flex-row flex-col">
                <div class="text-white font-normal xl:pt-8 pt-4 pb-4 xl:ml-32 flex-shrink-0">
                    <div
                        class="xl:text-3xl text-2xl xl:text-right text-center"
                    >คำนวนแคลอรี่จานของคุณ</div>
                    <div class="text-base xl:text-right text-center">รังสรรค์ จานโปรด</div>
                </div>
            </div>
        </div>
        <div class="flex xl:flex-row flex-col w-full min-h-screen xl:py-6">
            <div class="xl:w-1/3 xl:border-r-4 flex flex-col xl:px-8 px-6 py-2">
                <div class="flex justify-between items-center">
                    <div class="xl:text-2xl text-xl">คำนวณใหม่</div>
                    <div class="text-gray-500 xl:text-base text-sm">ยอดรวม 321 cal</div>
                </div>
                <div class="mt-2 xl:text-base text-sm">
                    <label for="foodname">ชื่ออาหาร</label>
                    <br />
                    <input
                        id="foodname"
                        type="text"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-sm text-xs"
                        placeholder="ชื่ออาหาร"
                    />
                </div>
                <div class="mt-2 xl:text-base text-sm">
                    <label for="foodtype">ประเภทอาหาร</label>
                    <br />
                    <select
                        id="foodtype"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-sm text-xs"
                    >
                        <option value disabled selected>ประเภทอาหาร</option>
                        <option
                            v-for="t in foodtypeArray"
                            :key="t.foodtypeid"
                            :value="t"
                        >{{ t.typename }}</option>
                    </select>
                </div>
                <div class="mt-3 xl:text-base text-sm">
                    <div class="flex justify-between">
                        <div>วัตถุดิบ</div>
                        <div class="text-gray-500">all</div>
                    </div>
                    <div class="flex justify-between mt-1">
                        <div v-for="i in ingredientstypeArray" :key="i">
                            <div class="flex flex-col justify-center items-center xl:w-14 w-12">
                                <div
                                    class="rounded-full bg-gray-100 p-2 shadow-lg"
                                    :class="{ 'shadow-inner': i === 'Oil' }"
                                >
                                    <IngredientstypeSVG
                                        :ingredient="i"
                                        classingredient="w-6 h-6"
                                        :fill="i === 'Oil' ? '#FCC090' : '#B4C1CC'"
                                        class="flex justify-center items-center"
                                    />
                                </div>
                                <div class="text-xs mt-2 text-gray-600">{{ i }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex gap-x-4 ">
                    <div class="relative text-gray-600 flex-grow flex">
                        <div class="flex justify-start z-10">
                            <button type="submit" class="focus:outline-none absolute mt-1.5 ml-2">
                                <i class="material-icons text-gray-400">search</i>
                            </button>
                        </div>
                        <input
                            class="rounded-xl w-full bg-white h-9 px-5 pl-10 text-sm focus:outline-none filter drop-shadow-all"
                            placeholder="ค้นหาวัตถุดิบ"
                        />
                    </div>
                    <div class="flex justify-center items-center w-9 h-9 bg-white filter rounded-xl drop-shadow-all ">
                            <i class="material-icons text-gray-400">add</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as GeneralApi from '../utils/generalApi'
import IngredientstypeSVG from '../components/IngredientstypeSVG.vue'

export default {
    components: {
        IngredientstypeSVG
    },
    async asyncData() {
        const foodtypesresponse = await GeneralApi.foodtypes()
        const foodtypeArray = foodtypesresponse.data

        const ingredientstyperesponse = await GeneralApi.ingredientsType()
        const ingredientstypeArray = ingredientstyperesponse.data

        return { foodtypeArray, ingredientstypeArray }
    },
    data() {
        return {
            foodtypeArray: [],
            ingredientstypeArray: []
        }
    },
}
</script>
<style>
.bgimge {
    background-image: url("../assets/img/bgfoodmenu.svg");
    background-position: center;
    background-size: 700px auto;
}
</style>
