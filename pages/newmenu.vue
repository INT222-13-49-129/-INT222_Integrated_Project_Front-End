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
                    <div
                        class="text-gray-500 xl:text-base text-sm"
                    >ยอดรวม {{ newfoodmenu.totalkcal }} cal</div>
                </div>
                <div class="xl:mt-4 mt-2 xl:text-lg text-base">
                    <label for="foodname">ชื่ออาหาร</label>
                    <br />
                    <input
                        id="foodname"
                        v-model.lazy.trim="newfoodmenu.foodname"
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
                        v-model="newfoodmenu.foodtype"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                    >
                        <option :value="null" disabled selected>ประเภทอาหาร</option>
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
                        <div
                            class="text-gray-500 cursor-pointer"
                            :class="{ 'text-brightsalmon': '' === ingredientstype }"
                            @click="ingredientstypefilter('')"
                        >all</div>
                    </div>
                    <div class="flex justify-between mt-2 mb-1">
                        <div v-for="i in ingredientstypeArray" :key="i">
                            <div class="flex flex-col justify-center items-center xl:w-14 w-12">
                                <div
                                    class="rounded-full bg-gray-100 p-2 shadow-lg cursor-pointer"
                                    :class="{ 'shadow-inner': i === ingredientstype }"
                                    @click="ingredientstypefilter(i)"
                                >
                                    <IngredientstypeSVG
                                        :ingredient="i"
                                        classingredient="w-6 h-6"
                                        :fill="i === ingredientstype ? '#FCC090' : '#B4C1CC'"
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
                                    @click="searchfilter"
                                >
                                    <i class="material-icons text-gray-400">search</i>
                                </button>
                            </div>
                            <input
                                v-model.trim="searchInput"
                                class="rounded-xl w-full bg-white h-9 px-5 pl-10 text-sm focus:outline-none"
                                placeholder="ค้นหาวัตถุดิบ"
                                @keyup.enter="searchfilter"
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
                            @click="haveIngredients(ingredients) ? addingredients(ingredients, newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit + 1) : addingredients(ingredients)"
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
                        <div v-if="ingredientsArray.totalElements === 0" class="mx-6 mt-6">
                            <div class="xl:text-2xl text-xl xl:my-2 my-3">No results found</div>
                            <div class="xl:text-lg text-base text-gray-600">
                                <p>Here are some hints:</p>
                                <ul class="list-disc ml-6 xl:text-base text-sm">
                                    <li>Make sure the spelling is correct.</li>
                                    <li>Use generic terms. Instead of specific brands, use their generic equivalent. For Example, instead of 'Pepsi'; use 'soda'</li>
                                    <li>If you continue to have problems, visit the Contact Us page to reach a customer support rep</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="ingredientsShow"
                    class="fixed z-30 inset-0 w-full h-full bg-white xl:hidden overflow-y-scroll"
                >
                    <div class="w-full h-32 bg-brightsalmon text-white text-2xl">
                        <div class="flex items-center pt-10 px-8 justify-between">
                            <i
                                class="material-icons cursor-pointer text-xl"
                                @click="ingredientsShow = false"
                            >arrow_back_ios</i>
                            <div>{{ ingredientstype === '' ? 'All ingredients' : ingredientstype }}</div>
                            <i class="material-icons cursor-pointer">add</i>
                        </div>
                    </div>
                    <div
                        class="relative text-gray-600 flex-grow flex filter drop-shadow-all px-10 -mt-6"
                    >
                        <div class="flex justify-start">
                            <button
                                type="submit"
                                class="focus:outline-none absolute mt-3 ml-3"
                                @click="searchfilter"
                            >
                                <i class="material-icons text-gray-400">search</i>
                            </button>
                        </div>
                        <input
                            v-model.trim="searchInput"
                            class="rounded-2xl w-full bg-white h-12 px-5 pl-10 text-base focus:outline-none"
                            placeholder="ค้นหาวัตถุดิบ"
                            @keyup.enter="searchfilter"
                        />
                    </div>
                    <div class="flex justify-between mt-4 px-8">
                        <div class="flex gap-x-4 text-gray-500">
                            <div>ค้นหา</div>
                            <div>คำขอ</div>
                        </div>
                        <div>
                            <PageNumber :page="ingredientsArray" classnum="text-sm text-gray-500" />
                        </div>
                    </div>
                    <div
                        class="flex flex-col mt-3 divide-y-2 border-t-2"
                        :class="{ 'border-b-2': ingredientsArray.totalElements !== 0 }"
                    >
                        <div
                            v-for="ingredients in ingredientsArray.content"
                            :key="ingredients.ingredientsid"
                            class="py-2 flex items-center justify-center w-full"
                        >
                            <Item
                                :item="{
                                    name: ingredients.ingredientsname,
                                    description: ingredients.descriptionunit,
                                    totalkcal: ingredients.kcalpunit
                                }"
                                class="w-11/12"
                            >
                                <IngredientstypeSVG
                                    :ingredient="ingredients.ingredientstype"
                                    classingredient="w-10 h-10 mr-2"
                                    fill="#FCC090"
                                    class="flex justify-center items-center"
                                />
                            </Item>
                        </div>
                        <div v-if="ingredientsArray.totalElements === 0" class="mx-6 mt-4">
                            <div class="xl:text-2xl text-xl xl:my-2 my-3">No results found</div>
                            <div class="xl:text-lg text-base text-gray-600">
                                <p>Here are some hints:</p>
                                <ul class="list-disc ml-6 xl:text-base text-sm">
                                    <li>Make sure the spelling is correct.</li>
                                    <li>Use generic terms. Instead of specific brands, use their generic equivalent. For Example, instead of 'Pepsi'; use 'soda'</li>
                                    <li>If you continue to have problems, visit the Contact Us page to reach a customer support rep</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xl:w-2/3 xl:px-8 px-6 py-2">
                <div class="xl:text-3xl text-lg">สรุปรายการ</div>
                <div>
                    <FoodmenuItem
                        :newfoodmenu="newfoodmenu"
                        class="xl:mt-10 mt-4 xl:w-11/12 w-full mx-auto shadow-lg"
                    >
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
                                        class="flex flex-col items-start xl:ml-4 xl:gap-y-4 text-lg mt-4 xl:mt-0"
                                    >
                                        <div
                                            class="truncate"
                                        >{{ newfoodmenu.foodname ? newfoodmenu.foodname : 'ชื่ออาหาร' }}</div>
                                        <div
                                            class="xl:text-base text-sm"
                                        >ประเภท : {{ newfoodmenu.foodtype ? newfoodmenu.foodtype.typename : '-' }}</div>
                                    </div>
                                    <div class="flex-grow xl:block hidden"></div>
                                    <div
                                        class="xl:text-lg text-base xl:mr-2 mt-2 xl:mt-0"
                                    >แคลอรี่รวม {{ newfoodmenu.totalkcal }} kcal.</div>
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
                <div
                    class="flex flex-col xl:flex-row text-white xl:mt-12 mt-6 mb-6 xl:mb-0 justify-center gap-x-6 gap-y-4 xl:w-full w-11/12 mx-auto"
                >
                    <div
                        class="bg-salmon shadow-md px-5 py-2 rounded-full flex justify-center cursor-pointer"
                    >
                        เพิ่มในรายการอาหารของฉัน
                        <i class="material-icons text-xl ml-3">playlist_add</i>
                    </div>
                    <div
                        class="bg-salmon shadow-md px-5 py-2 rounded-full flex justify-center cursor-pointer"
                    >
                        แคลอรี่ที่เหมาะสมต่อวัน
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
            ingredientsShow: false,
            foodtypeArray: [],
            ingredientstypeArray: [],
            ingredientsArray: [],
            searchInput: "",
            search: "",
            ingredientstype: "",
            newfoodmenu: {
                foodname: "",
                totalkcal: 0,
                description: "",
                foodmenustatus: "",
                foodtype: null,
                foodmenuHasIngredientsList: []
            }
        }
    },
    methods: {
        changPage(n) {
            const pagenumber = this.ingredientsArray.pageable.pageNumber + n
            this.getingredient(pagenumber);
        },
        searchfilter() {
            this.search = encodeURIComponent(this.searchInput)
            this.getingredient();
        },
        ingredientstypefilter(ingredientstype) {
            this.ingredientsShow = true
            this.ingredientstype = ingredientstype
            this.getingredient();
        },
        async getingredient(pagenumber = 0) {
            this.searchInput = decodeURIComponent(this.search)
            const response = await GeneralApi.ingredientsWithPage(this.ingredientstype, this.search, pagenumber)
            this.ingredientsArray = response.data
        },
        haveIngredients(ingredients) {
            return this.newfoodmenu.foodmenuHasIngredientsList.map(i => i.key.ingredientsIngredientsid).includes(ingredients.ingredientsid)
        },
        ingredientsIndex(ingredients) {
            return this.newfoodmenu.foodmenuHasIngredientsList.findIndex((i => i.key.ingredientsIngredientsid === ingredients.ingredientsid))
        },
        addingredients(ingredients, totalunit = 1) {
            if (this.haveIngredients(ingredients)) {
                const index = this.ingredientsIndex(ingredients)
                this.newfoodmenu.foodmenuHasIngredientsList[index].totalunit = totalunit
                this.newfoodmenu.foodmenuHasIngredientsList[index].totalkcal = totalunit * ingredients.kcalpunit
            } else {
                this.newfoodmenu.foodmenuHasIngredientsList.push({
                    key: {
                        ingredientsIngredientsid: ingredients.ingredientsid
                    },
                    ingredients,
                    totalunit,
                    totalkcal: totalunit * ingredients.kcalpunit
                })
            }
            this.calculatetotalkcal()

        },
        deleteingredients(ingredients) {
            this.newfoodmenu.foodmenuHasIngredientsList = this.newfoodmenu.foodmenuHasIngredientsList.filter(i => i.key.ingredientsIngredientsid !== ingredients.ingredientsid)
            this.calculatetotalkcal()
        },
        calculatetotalkcal(){
             this.newfoodmenu.totalkcal = this.newfoodmenu.foodmenuHasIngredientsList.map(i => i.totalkcal).reduce((a, b) => a + b, 0)
        }
    }
}
</script>
<style>
.bgimge {
    background-image: url("../assets/img/bgfoodmenu.svg");
    background-position: center;
    background-size: 700px auto;
}
</style>
