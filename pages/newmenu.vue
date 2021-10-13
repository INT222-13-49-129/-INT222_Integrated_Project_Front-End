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
            <div class="xl:w-1/3 xl:border-r-4 flex flex-col xl:px-8 px-6 py-2 mt-2 xl:mt-0">
                <div class="flex justify-between items-center">
                    <div class="xl:text-2xl text-xl">คำนวณใหม่</div>
                    <div class="text-gray-500 xl:text-base text-sm">ยอดรวม 321 cal</div>
                </div>
                <div class="xl:mt-4 mt-2 xl:text-lg text-base">
                    <label for="foodname">ชื่ออาหาร</label>
                    <br />
                    <input
                        id="foodname"
                        type="text"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                        placeholder="ชื่ออาหาร"
                    />
                </div>
                <div class="xl:mt-4 mt-2 xl:text-lg text-base">
                    <label for="foodtype">ประเภทอาหาร</label>
                    <br />
                    <select
                        id="foodtype"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                    >
                        <option value disabled selected>ประเภทอาหาร</option>
                        <option
                            v-for="t in foodtypeArray"
                            :key="t.foodtypeid"
                            :value="t"
                        >{{ t.typename }}</option>
                    </select>
                </div>
                <div class="xl:mt-4 mt-2 xl:text-lg text-base">
                    <div class="flex justify-between">
                        <div>วัตถุดิบ</div>
                        <div class="text-gray-500">all</div>
                    </div>
                    <div class="flex justify-between mt-2 mb-1">
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
                <div class="xl:block hidden">
                    <div class="xl:mt-4 mt-2 flex gap-x-4">
                        <div class="relative text-gray-600 flex-grow flex filter drop-shadow-all">
                            <div class="flex justify-start">
                                <button
                                    type="submit"
                                    class="focus:outline-none absolute mt-1.5 ml-2"
                                >
                                    <i class="material-icons text-gray-400">search</i>
                                </button>
                            </div>
                            <input
                                class="rounded-xl w-full bg-white h-9 px-5 pl-10 text-sm focus:outline-none"
                                placeholder="ค้นหาวัตถุดิบ"
                            />
                        </div>
                        <div
                            class="flex justify-center items-center w-9 h-9 bg-white filter rounded-xl drop-shadow-all"
                        >
                            <i class="material-icons text-gray-400">add</i>
                        </div>
                    </div>
                    <div class="flex justify-between mt-4">
                        <div class="flex gap-x-4 text-gray-500">
                            <div>ค้นหา</div>
                            <div>คำขอ</div>
                        </div>
                        <div>
                            <PageNumber :page="ingredientsArray" classnum="text-sm text-gray-500" />
                        </div>
                    </div>
                    <div class="flex flex-col mt-3 divide-y-2 border-t-2">
                        <div
                            v-for="ingredients in ingredientsArray.content"
                            :key="ingredients.ingredientsid"
                            class="py-2 flex items-center justify-between"
                        >
                            <Item
                                :item="{
                                    name: ingredients.ingredientsname,
                                    description: ingredients.descriptionunit,
                                    totalkcal: ingredients.kcalpunit
                                }"
                            >
                                <IngredientstypeSVG
                                    :ingredient="ingredients.ingredientstype"
                                    classingredient="w-12 h-12 mr-2"
                                    fill="#FCC090"
                                    class="flex justify-center items-center"
                                />
                            </Item>
                            <div
                                class="flex justify-center items-center w-9 h-9 bg-brightsalmon rounded-full mr-2 cursor-pointer"
                            >
                                <i class="material-icons text-white">add</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xl:w-2/3 xl:px-8 px-6 py-2">
                <div class="xl:text-3xl text-lg">สรุปรายการ</div>
                <div>
                    <FoodmenuItem class="xl:mt-10 mt-4 xl:w-11/12 w-full mx-auto shadow-lg">
                        <template #header>
                            <div>
                                <div class="flex items-center flex-col xl:flex-row">
                                    <img
                                        src="../assets/img/chooseimg.svg"
                                        class="filter drop-shadow xl:ml-8 object-cover h-36 w-48 mt-4 xl:mt-0"
                                    />
                                    <div
                                        class="mt-3 flex items-center justify-center xl:justify-start mx-2 xl:mx-0 xl:hidden"
                                    >
                                        <label
                                            for="image"
                                            class="xl:ml-8 mr-1 xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                                        >อัพโหลดรูป</label>
                                        <input id="image" type="file" class="hidden" />
                                        <div
                                            class="text-xs text-gray-500 truncate"
                                        >ยังไม่ได้เลือกรูป</div>
                                    </div>
                                    <div
                                        class="flex flex-col items-start xl:ml-4 xl:gap-y-4 text-lg  mt-4 xl:mt-0"
                                    >
                                        <div class="truncate">กระเพราะหมูสับไข่ดาว</div>
                                        <div class="xl:text-base text-sm">ประเภท : ผัด</div>
                                    </div>
                                    <div class="flex-grow xl:block hidden"></div>
                                    <div class="xl:text-lg text-base xl:mr-2 mt-2 xl:mt-0">แคลอรี่รวม 340 kcal.</div>
                                </div>
                                <div
                                    class="mt-2 xl:flex items-center justify-center xl:justify-start mx-2 xl:mx-0 hidden"
                                >
                                    <label
                                        for="image"
                                        class="xl:ml-8 mr-1 xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                                    >อัพโหลดรูป</label>
                                    <input id="image" type="file" class="hidden" />
                                    <div class="text-xs text-gray-500 truncate">ยังไม่ได้เลือกรูป</div>
                                </div>
                            </div>
                        </template>
                    </FoodmenuItem>
                </div>
                <div class="flex flex-col xl:flex-row text-white xl:mt-12 mt-6 mb-6 xl:mb-0 justify-center gap-x-6 gap-y-4 xl:w-full w-11/12 mx-auto">
                    <div
                        class="bg-salmon shadow-md px-5 py-2 rounded-full flex justify-center cursor-pointer"
                    >
                        เพิ่มในรายการอาหารของฉัน
                        <i class="material-icons text-xl ml-3">playlist_add</i>
                    </div>
                    <div
                        class="bg-salmon shadow-md px-5 py-2 rounded-full flex justify-center cursor-pointer"
                    >
                        คำนวณแคลอรี่เหมาะสมต่อวัน
                        <i class="material-icons text-xl ml-3">east</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as GeneralApi from '../utils/generalApi'
import IngredientstypeSVG from '../components/IngredientstypeSVG.vue'
import PageNumber from '../components/PageNumber.vue';
import FoodmenuItem from '../components/FoodmenuItem.vue';

export default {
    components: {
        IngredientstypeSVG,
        PageNumber,
        FoodmenuItem
    },
    async asyncData() {
        const foodtypesresponse = await GeneralApi.foodtypes()
        const foodtypeArray = foodtypesresponse.data

        const ingredientstyperesponse = await GeneralApi.ingredientsType()
        const ingredientstypeArray = ingredientstyperesponse.data

        const ingredientsresponse = await GeneralApi.ingredientsWithPage()
        const ingredientsArray = ingredientsresponse.data

        return { foodtypeArray, ingredientstypeArray, ingredientsArray }
    },
    data() {
        return {
            foodtypeArray: [],
            ingredientstypeArray: [],
            ingredientsArray: []
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
