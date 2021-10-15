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
        <div v-if="ingredientsSelected">
            <Modal classpop="flex flex-col text-center bg-white xl:w-128 w-10/12  fixed">
                <div
                    class="w-full bg-brightsalmon flex justify-center items-center text-white xl:text-2xl text-lg px-6 xl:py-6 py-4"
                >
                    <i
                        class="material-icons cursor-pointer xl:text-3xl text-2xl absolute xl:left-4 left-2"
                        @click="ingredientsSelected = null, ingredientsNum = 1"
                    >close</i>
                    <IngredientstypeSVG
                                        :ingredient="ingredientsSelected.ingredientstype"
                                        classingredient="xl:w-8 xl:h-8 w-6 h-6 mr-2"
                                        fill="#FFFFFF"
                                        class="flex justify-center items-center"
                                    />
                    <span>{{ ingredientsSelected.ingredientsname }}</span>
                </div>
                <div class="w-full bg-white py-8 flex flex-col justify-center text-center">
                    <div class="xl:text-xl text-lg">
                        {{ ingredientsSelected.kcalpunit }} kcal. ต่อ
                        1 {{ ingredientsSelected.unit }}
                        <br />
                        โดยเท่ากับ {{ ingredientsSelected.descriptionunit }}
                    </div>
                    <div class="flex items-center justify-center xl:text-xl text-lg mt-4 mx-2">
                        <span class="flex-1 text-right xl:mr-4 mr-2">จำนวน</span>
                        <i
                            class="material-icons text-brightsalmon cursor-pointer"
                            @click="ingredientsNum > 1 ? ingredientsNum-- : ''"
                        >remove_circle_outline</i>
                        <input
                            id="ingredientsNum"
                            v-model="ingredientsNum"
                            type="number"
                            min="1"
                            step="1"
                            class="w-1/6 focus:outline-none text-center xl:text-2xl text-xl"
                        />
                        <i
                            class="material-icons text-brightsalmon cursor-pointer"
                            @click="ingredientsNum++"
                        >add_circle_outline</i>
                        <span class="flex-1 text-left xl:ml-4 ml-2">{{ ingredientsSelected.unit }}</span>
                    </div>
                    <div
                        class="rounded-2xl px-6 py-2 bg-green-300 mx-auto text-white mt-6 cursor-pointer xl:text-base text-sm hover:bg-green-400"
                        @click="ingredientsNum > 0 ? addingredients(ingredientsSelected, ingredientsNum) : ''"
                    >บันทึก</div>
                </div>
            </Modal>
        </div>
        <div class="flex xl:flex-row flex-col w-full min-h-screen xl:py-6">
            <div class="xl:w-1/3 xl:border-r-4 flex flex-col xl:px-8 px-6 py-2 mt-2 xl:mt-0">
                <div class="flex justify-between items-center">
                    <div class="xl:text-2xl text-xl">คำนวณใหม่</div>
                    <div
                        class="text-gray-500 xl:text-base text-sm"
                    >ยอดรวม {{ newfoodmenu.totalkcal }} kcal</div>
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
                    <label for="description">คำอธิบายอาหาร</label>
                    <br />
                    <textarea
                        id="description"
                        v-model.lazy.trim="newfoodmenu.description"
                        type="text"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-16 px-4 bg-gray-100 xl:text-base text-sm"
                        placeholder="คำอธิบาย"
                    ></textarea>
                </div>
                <div class="xl:mt-2 mt-0 xl:text-lg text-base relative">
                    <label for="foodtype">ระดับการแชร์</label>
                    <br />
                    <select
                        id="foodtype"
                        v-model="newfoodmenu.foodmenustatus"
                        required
                        class="rounded-xl border-2 border-gray-100 w-full h-8 px-4 bg-gray-100 xl:text-base text-sm"
                    >
                        <option value="PERSONAL">&nbsp;&nbsp;ส่วนตัว</option>
                        <option value="PUBLISH">&nbsp;&nbsp;สาธารณะ</option>
                    </select>
                    <i
                        class="material-icons absolute xl:top-7 top-6 mt-0.5 left-3 xl:text-lg text-base text-brightsalmon"
                    >{{ newfoodmenu.foodmenustatus === 'PERSONAL' ? 'lock' : 'public' }}</i>
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
                            class="py-2 flex items-center justify-between cursor-pointer hover:bg-salmon hover:bg-opacity-10"
                        >
                            <div
                                class="flex-grow"
                                @click="ingredientsSelected = ingredients, haveIngredients(ingredients) ? ingredientsNum = newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit : ''"
                            >
                                <Item
                                    :item="{
                                        name: ingredients.ingredientsname,
                                        description: `1 ${ingredients.unit}, ${ingredients.descriptionunit}`,
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
                            </div>
                            <div
                                class="flex justify-center items-center w-9 h-9 bg-brightsalmon rounded-full mr-2 cursor-pointer hover:bg-salmon"
                                @click="haveIngredients(ingredients) ? addingredients(ingredients, newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit + 1) : addingredients(ingredients)"
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
                    class="fixed z-30 inset-0 w-full h-full bg-white xl:hidden"
                >
                    <div class="w-full h-full relative overflow-y-scroll">
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
                                <PageNumber
                                    :page="ingredientsArray"
                                    classnum="text-sm text-gray-500"
                                />
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
                                @click="ingredientsSelected = ingredients, haveIngredients(ingredients) ? ingredientsNum = newfoodmenu.foodmenuHasIngredientsList[ingredientsIndex(ingredients)].totalunit : ''"
                            >
                                <Item
                                    :item="{
                                        name: ingredients.ingredientsname,
                                        description: `1 ${ingredients.unit}, ${ingredients.descriptionunit}`,
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
                    <div
                        class="absolute flex items-center justify-center bottom-6 right-6 rounded-full bg-lightsalmon h-12 w-12 shadow-md cursor-pointer"
                        @click="foodmenuShow = true"
                    >
                        <div class="relative">
                            <i class="material-icons text-2xl text-white">restaurant_menu</i>
                            <div
                                class="h-6 w-6 flex items-center justify-center absolute -top-3 -right-5 bg-white text-sm rounded-full filter drop-shadow-all"
                            >{{ newfoodmenu.foodmenuHasIngredientsList.length }}</div>
                        </div>
                    </div>
                    <div v-if="foodmenuShow">
                        <div
                            class="fixed bg-opacity-20 bg-black flex z-40 inset-0 overflow-y-auto overflow-x-auto"
                        >
                            <div class="w-11/12 py-2 my-auto mx-auto">
                                <FoodmenuItem
                                    :newfoodmenu="newfoodmenu"
                                    class="xl:mt-10 mt-4 xl:w-11/12 w-full mx-auto shadow-lg"
                                >
                                    <template #top>
                                        <div class="absolute flex items-center top-1 left-2"
                                             @click="foodmenuShow = false">
                                            <i
                                                class="material-icons text-xl text-gray-400"
                                            >close</i>
                                        </div>
                                    </template>
                                    <template #footer>
                                        <div class="mt-4 text-right mr-2 text-lg">
                                            แคลอรี่รวม {{ newfoodmenu.totalkcal }} kcal.
                                        </div>
                                    </template>
                                    <template #bottom>
                                        <div class="py-1 text-gray-700">
                                            ประเภท : {{ newfoodmenu.foodtype ? newfoodmenu.foodtype.typename : '-' }}
                                        </div>
                                    </template>
                                </FoodmenuItem>
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
                        <template #top>
                            <div
                                class="absolute flex items-center xl:top-3 top-1 xl:right-4 right-2"
                            >
                                <i
                                    class="material-icons xl:text-lg text-base text-brightsalmon"
                                >{{ newfoodmenu.foodmenustatus === 'PERSONAL' ? 'lock' : 'public' }}</i>
                                <span
                                    class="ml-2 xl:text-base text-sm"
                                >{{ newfoodmenu.foodmenustatus === 'PERSONAL' ? 'ส่วนตัว' : 'สาธารณะ' }}</span>
                            </div>
                        </template>
                        <template #header>
                            <div>
                                <div class="flex items-center flex-col xl:flex-row">
                                    <img
                                        :src="img"
                                        class="filter drop-shadow xl:ml-8 object-cover h-36 w-48 mt-4 xl:mt-0"
                                    />
                                    <div
                                        class="mt-3 flex items-center justify-center w-11/12 xl:justify-start mx-2 xl:mx-0 xl:hidden"
                                    >
                                        <label
                                            for="image"
                                            class="xl:ml-8 mr-1 xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                                        >อัพโหลดรูป</label>
                                        <div
                                            class="text-xs text-gray-500 truncate"
                                        >{{ newfoodmenu.image }}</div>
                                    </div>
                                    <div
                                        class="flex flex-col items-start xl:ml-4 xl:gap-y-4 text-lg mt-4 xl:mt-0 w-full px-8 xl:px-0"
                                    >
                                        <div
                                            class="xl:text-base text-sm"
                                        >ประเภท : {{ newfoodmenu.foodtype ? newfoodmenu.foodtype.typename : '-' }}</div>
                                        <div class="xl:text-base text-sm text-left">
                                            คำอธิบาย :
                                            <br />
                                            {{ newfoodmenu.description ? newfoodmenu.description : '-' }}
                                        </div>
                                    </div>
                                    <div
                                        class="xl:text-lg text-base xl:mr-2 mt-2 xl:mt-0 flex-shrink-0 xl:ml-2"
                                    >แคลอรี่รวม {{ newfoodmenu.totalkcal }} kcal.</div>
                                </div>
                                <div
                                    class="mt-2 xl:flex items-center justify-center xl:justify-start mx-2 xl:mx-0 hidden"
                                >
                                    <label
                                        for="image"
                                        class="xl:ml-8 mr-1 xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                                    >อัพโหลดรูป</label>
                                    <input
                                        id="image"
                                        type="file"
                                        class="hidden"
                                        accept="image/*"
                                        @change="uploadImg"
                                    />
                                    <div
                                        class="text-xs text-gray-500 truncate"
                                    >{{ newfoodmenu.image }}</div>
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
import Modal from '../components/Modal.vue';

export default {
    components: {
        IngredientstypeSVG,
        PageNumber,
        FoodmenuItem,
        Modal
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
            img: require("../assets/img/chooseimg.svg"),
            file: null,
            foodmenuShow: false,
            ingredientsShow: false,
            ingredientsSelected: null,
            foodtypeArray: [],
            ingredientstypeArray: [],
            ingredientsArray: [],
            searchInput: "",
            search: "",
            ingredientstype: "",
            ingredientsNum: 1,
            newfoodmenu: {
                foodname: "",
                totalkcal: 0,
                image: "ยังไม่ได้เลือกรูป",
                description: "",
                foodmenustatus: "PERSONAL",
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
            if (totalunit < 1) {
                return
            }
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
            this.ingredientsSelected = null
            this.ingredientsNum = 1
            this.calculatetotalkcal()
        },
        deleteingredients(ingredients) {
            this.newfoodmenu.foodmenuHasIngredientsList = this.newfoodmenu.foodmenuHasIngredientsList.filter(i => i.key.ingredientsIngredientsid !== ingredients.ingredientsid)
            this.calculatetotalkcal()
        },
        calculatetotalkcal() {
            this.newfoodmenu.totalkcal = this.newfoodmenu.foodmenuHasIngredientsList.map(i => i.totalkcal).reduce((a, b) => a + b, 0)
        },
        uploadImg(event) {
            const file = event.target.files[0]
            if (this.isImage(file.name)) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.img = event.target.result;
                };
                reader.readAsDataURL(file);
                this.file = file
                this.newfoodmenu.image = file.name
            }
        },
        getExtension(filename) {
            const parts = filename.split('.');
            return parts[parts.length - 1];
        },
        isImage(filename) {
            const ext = this.getExtension(filename);
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'bmp':
                case 'png':
                    return true;
            }
            return false;
        },
    }
}
</script>
<style>
.bgimge {
    background-image: url("../assets/img/bgfoodmenu.svg");
    background-position: center;
    background-size: 700px auto;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>