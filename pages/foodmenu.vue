<template>
  <div class="xl:w-336 w-11/12 pt-24 mx-auto xl:pt-16 bg-white shadow-lg">
    <div
      class="bgimge object-cover xl:w-full py-2 xl:h-28 mx-6 xl:mx-0 rounded-3xl xl:rounded-none"
    >
      <div class="flex xl:flex-row flex-col">
        <div class="text-white font-normal xl:pt-8 pt-4 xl:ml-32 flex-shrink-0">
          <div
            class="xl:text-3xl text-2xl xl:text-right text-center"
          >{{ mealtime ? (Meal[meal.mealtime]?`บันทึกรายการ${Meal[meal.mealtime]}`:'') : 'ปริมาณแคลอรี่ในอาหาร' }}</div>
          <div class="text-base xl:text-right text-center">หุ่นสวย ด้วยตัวเรา</div>
        </div>
        <div class="xl:w-1/4 xl:pr-20 flex-grow mx-6 xl:mx-0 my-4 xl:my-0">
          <div class="relative text-gray-600 flex justify-end xl:pt-8 pt-2 z-0">
            <div class="flex justify-start">
              <button
                type="submit"
                class="focus:outline-none absolute mt-3 ml-3 mr-1"
                @click="searchfilter"
              >
                <i class="material-icons text-gray-400">search</i>
              </button>
            </div>
            <input
              v-model.trim="searchInput"
              class="rounded-2xl bg-white w-full xl:w-auto h-12 px-5 pl-10 text-sm focus:outline-none"
              placeholder="ค้นหาอาหาร"
              @keyup.enter="searchfilter"
            />
            <div class="flex justify-end">
              <button
                type="submit"
                class="focus:outline-none absolute mt-3 mr-3"
                @click="popfilter = !popfilter"
              >
                <i
                  class="material-icons text-gray-200"
                  :class="{ 'text-brightsalmon': popfilter }"
                >filter_alt</i>
              </button>
            </div>
            <div
              v-if="popfilter"
              class="absolute z-10 xl:top-20 top-12 rounded-md shadow-md bg-white max-w-min xl:mt-0.5 mt-2.5 py-2 text-sm"
            >
              <div
                class="px-5 pt-1 cursor-pointer"
                :class="{ 'bg-gray-100': null === foodtypeSelected }"
                @click="foodtypefilter(null)"
              >ทั้งหมด</div>
              <div
                v-for="t in foodtypeArray"
                :key="t.foodtypeid"
                class="px-5 cursor-pointer"
                :class="{ 'bg-gray-100': foodtypeSelected ? t.foodtypeid === foodtypeSelected.foodtypeid : false }"
                @click="foodtypefilter(t)"
              >{{ t.typename }}</div>
            </div>
          </div>
        </div>
      </div>
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
                  <i class="material-icons xl:text-3xl text-2xl text-gray-400">close</i>
                </div>
                <div
                  v-if="isLoggedIn && foodmenuSelected.userid === $auth.user.userid"
                  class="absolute xl:top-3 top-1 xl:right-4 right-2 flex flex-col items-end"
                >
                  <div class="flex items-center">
                    <i
                      class="material-icons xl:text-lg text-base text-brightsalmon"
                    >{{ foodmenuSelected.foodmenustatus === 'PERSONAL' ? 'lock' : 'public' }}</i>
                    <span
                      class="ml-2 xl:text-base text-sm"
                    >{{ foodmenuSelected.foodmenustatus === 'PERSONAL' ? 'ส่วนตัว' : 'สาธารณะ' }}</span>
                  </div>
                  <div
                    class="flex items-center justify-center border-2 hover:bg-gray-100 xl:w-20 w-16 xl:mb-2 mb-1 rounded-lg xl:gap-x-2 gap-x-1 cursor-pointer"
                    @click="$router.push(`/newmenu?edit=${foodmenuSelected.foodmenuid}`)"
                  >
                    <i class="material-icons text-base text-gray-400">edit</i>
                    <div class="text-gray-700 xl:text-base text-sm">edit</div>
                  </div>
                  <div
                    class="flex items-center justify-center border-2 hover:bg-gray-100 xl:w-20 w-16 rounded-lg xl:gap-x-1 gap-x-0.5 cursor-pointer"
                    @click="popup.show = true, popup.delete = true"
                  >
                    <i class="material-icons text-base text-gray-400">delete</i>
                    <div class="text-gray-700 xl:text-base text-sm">delete</div>
                  </div>
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
              <template v-if="mealtime" #footer>
                <div class="flex items-center justify-center xl:text-lg text-base mt-4 mx-2">
                  <span class="flex-1 text-right xl:mr-4 mr-2">จำนวน</span>
                  <button
                    class="material-icons text-brightsalmon cursor-pointer"
                    @click="foodmenuNum > 1 ? foodmenuNum-- : ''"
                  >remove_circle_outline</button>
                  <input
                    id="ingredientsNum"
                    v-model="foodmenuNum"
                    type="number"
                    min="1"
                    step="1"
                    class="w-1/6 focus:outline-none text-center xl:text-2xl text-xl"
                  />
                  <button
                    class="material-icons text-brightsalmon cursor-pointer"
                    @click="foodmenuNum++"
                  >add_circle_outline</button>
                  <span class="flex-1 text-left xl:ml-4 ml-2">ที่</span>
                </div>
                <div class="flex xl:justify-end justify-center -mb-3 pt-2 xl:pt-0 xl:mb-0 px-3">
                  <div
                    class="xl:text-base text-sm xl:w-20 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                    @click="foodmenuNum > 0 ? (addFoodmenu(foodmenuSelected, foodmenuNum), foodmenuShow = false) : ''"
                  >บันทึก</div>
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
    <div v-if="popup.show">
      <Modal classpop="flex flex-col text-center bg-white xl:w-128 w-11/12 rounded-xl fixed">
        <div v-if="popup.checkmark" class="my-6">
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="24" fill="none" />
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <div v-if="popup.meal">
          <div class="xl:text-xl text-lg py-1">บันทึกรายการมื้อ{{ Meal[meal.mealtime] }}สำเร็จ</div>
          <div
            class="py-5 px-2 mb-2 flex xl:flex-row flex-col-reverse items-center justify-center gap-x-6 gap-y-4"
          >
            <div
              class="xl:w-4/12 w-9/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
              @click="clearpopup()"
            >เพิ่มมื้ออาหารอีก</div>
            <nuxt-link
              to="/profile"
              class="xl:w-4/12 w-9/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
            >ไปยังรายการที่บันทึก</nuxt-link>
          </div>
        </div>
        <div v-if="popup.delete">
          <img src="../assets/img/delete.svg" class="mb-6 mt-8 mx-auto w-20" />
        </div>
        <div v-if="popup.delete">
          <div class="xl:text-xl text-lg py-1 px-6">
            ยืนยันที่จะลบรายการอาหาร
            <br />
            <span class="xl:text-2xl text-xl">"{{ foodmenuSelected.foodname }}"</span> ใช่หรือไม่?
          </div>
          <div class="py-5 px-2 mb-2 flex items-center justify-center gap-x-6">
            <div
              class="xl:w-3/12 w-4/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
              @click="clearpopup()"
            >ยกเลิก</div>
            <div
              class="xl:w-3/12 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
              @click="deleteFoodmenu(foodmenuSelected.foodmenuid)"
            >ลบ</div>
          </div>
        </div>
        <div v-if="popup.alert">
          <img src="../assets/img/alert.svg" class="my-6 mx-auto w-20" />
        </div>
        <div v-if="popup.fail" class="flex flex-col items-center">
          <div class="text-2xl">ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่</div>
          <div
            class="px-3 py-1 mt-6 mb-4 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
            @click="clearpopup()"
          >ตกลง</div>
        </div>
        <div v-if="popup.mealdelete">
          <div class="xl:text-xl text-lg py-1 px-6">
            ไม่มีเมนูในรายการมื้ออาหาร
            <br>
            หากเคยบันทึกไปแล้วมื้ออาหารจะถูกลบ
          </div>
          <div class="py-5 px-2 mb-2 flex items-center justify-center gap-x-6">
            <div
              class="xl:w-3/12 w-4/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
              @click="clearpopup()"
            >ยกเลิก</div>
            <div
              class="xl:w-3/12 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
              @click="editmeal?deleteMeal(true):clearpopup()"
            >ลบ</div>
          </div>
        </div>
      </Modal>
    </div>
    <div v-if="mealShow">
      <Modal classpop="flex my-auto mx-auto py-4 xl:w-auto w-11/12">
        <MealItem :meal="meal">
          <i
            class="material-icons cursor-pointer xl:text-3xl text-2xl absolute xl:left-4 left-2 xl:top-2 top-1 text-gray-400"
            @click="mealShow = false"
          >close</i>
        </MealItem>
      </Modal>
    </div>
    <div class="flex xl:flex-row flex-col w-full min-h-screen">
      <div
        class="xl:w-1/6 xl:bg-gray-200 mx-auto mt-2 xl:mt-0 flex items-center xl:items-start xl:flex-col flex-row xl:py-10 py-3 xl:pl-8 pl-4 pr-4 xl:text-2xl text-lg xl:gap-y-8 gap-x-8 xl:gap-x-0 xl:text-salmon text-gray-600"
      >
        <div class="flex-shrink-0 xl:w-full" :class="{ 'xl:block hidden': !isLoggedIn }">
          <div
            class="cursor-pointer"
            :class="{ 'underline xl:no-underline': showing === Show.General }"
            @click="changShow(Show.General)"
          >General</div>
          <div
            v-if="showing === Show.General"
            class="text-base text-gray-500 pl-3 xl:block hidden animate__animated animate__fadeIn"
          >
            <div class="pt-2 text-lg text-gray-600">Category</div>
            <div>
              <div
                class="pl-2 py-0.5 cursor-pointer"
                :class="{ 'bg-brightsalmon rounded-md shadow-lg': null === foodtypeSelected }"
                @click="foodtypefilter(null)"
              >ทั้งหมด</div>
              <div
                v-for="t in foodtypeArray"
                :key="t.foodtypeid"
                class="pl-2 py-0.5 cursor-pointer"
                :class="{ 'bg-brightsalmon rounded-md shadow-lg': foodtypeSelected ? t.foodtypeid === foodtypeSelected.foodtypeid : false }"
                @click="foodtypefilter(t)"
              >{{ t.typename }}</div>
            </div>
          </div>
        </div>
        <div v-if="isLoggedIn" class="flex-shrink-0 xl:w-full">
          <div
            class="cursor-pointer"
            :class="{ 'underline xl:no-underline': showing === Show.Myfoods }"
            @click="changShow(Show.Myfoods)"
          >My foods</div>
          <div
            v-if="showing === Show.Myfoods"
            class="text-base text-gray-500 pl-3 xl:block hidden animate__animated animate__fadeIn"
          >
            <div class="pt-2 text-lg text-gray-600">Category</div>
            <div>
              <div
                class="pl-2 py-0.5 cursor-pointer"
                :class="{ 'bg-brightsalmon rounded-md shadow-lg': null === foodtypeSelected }"
                @click="foodtypefilter(null)"
              >ทั้งหมด</div>
              <div
                v-for="t in foodtypeArray"
                :key="t.foodtypeid"
                class="pl-2 py-0.5 cursor-pointer"
                :class="{ 'bg-brightsalmon rounded-md shadow-lg': foodtypeSelected ? t.foodtypeid === foodtypeSelected.foodtypeid : false }"
                @click="foodtypefilter(t)"
              >{{ t.typename }}</div>
            </div>
          </div>
        </div>
        <div v-if="isLoggedIn" class="flex-shrink-0 xl:w-full">Favorites</div>
      </div>
      <div
        class="text-xs text-right mr-4 -mt-3 xl:hidden text-gray-400"
        :class="{ '-mt-5 text-sm': !isLoggedIn }"
      >category: {{ foodtypeSelected ? foodtypeSelected.typename : 'ทั้งหมด' }}</div>
      <div class="xl:w-5/6 xl:p-10">
        <div
          class="flex justify-between xl:pb-2 pb-1.5 xl:pt-0 pt-1.5 px-3 xl:px-0 mt-2 xl:mt-0 items-center bg-gray-400 xl:bg-white text-white xl:text-gray-700"
        >
          <div class="xl:text-3xl text-lg">All items</div>
          <div>
            <PageNumber :page="foodmenusArray" />
          </div>
        </div>
        <div v-if="foodmenusArray.totalElements === 0" class="mx-6 mt-6">
          <div class="xl:text-4xl text-3xl xl:my-2 my-3">No results found</div>
          <div class="xl:text-xl text-lg text-gray-600">
            <p>Here are some hints:</p>
            <ul class="list-disc ml-6 xl:text-lg text-base">
              <li>Make sure the spelling is correct.</li>
              <li>Use generic terms. Instead of specific brands, use their generic equivalent. For Example, instead of 'Pepsi'; use 'soda'</li>
              <li>If you continue to have problems, visit the Contact Us page to reach a customer support rep</li>
            </ul>
          </div>
        </div>
        <div
          class="flex xl:flex-wrap flex-col xl:flex-row xl:gap-y-4 xl:gap-x-4 xl:pl-5 pl-2 xl:pr-0 pr-2 xl:pt-0 pt-2 divide-y-2 xl:divide-y-0"
        >
          <div
            v-for="foodmenu in foodmenusArray.content"
            :key="foodmenu.foodmenuid"
            class="py-2 xl:py-0 cursor-pointer hover:bg-brightsalmon hover:bg-opacity-10"
            @click="showFoodmenu(foodmenu)"
          >
            <Item
              :item="{
                name: foodmenu.foodname,
                description: `${parseInt((foodmenu.totalkcal / dailyCalorie) * 100)}% ของแคลอรี่ที่ควรบริโภคต่อวัน`,
                totalkcal: foodmenu.totalkcal
              }"
            >
              <FoodmenuImg
                :id="foodmenu.foodmenuid"
                :general="foodmenu.foodmenustatus === 'PUBLISH'"
                class="xl:w-24 xl:h-24 w-12 h-12 items-center xl:mr-2 mr-1 flex flex-shrink-0"
              />
            </Item>
          </div>
        </div>
        <div
          v-if="foodmenusArray.totalElements > 0"
          class="xl:text-sm xl:mt-4 mt-2 text-xs px-3 py-2"
        >
          <i class="xl:text-base text-sm">หมายเหตุ</i>
          <span
            v-if="isLoggedIn"
            class="text-gray-600"
          >BMR (Basal Metabolic Rate) อัตราการเผาผลาญพลังงานขั้นพื้นฐานในแต่ละวัน : {{ dailyCalorie }} กิโลแคลอรี่</span>
          <span
            v-else
            class="text-gray-600"
          >ร้อยละของปริมาณสารอาหารที่แนะนำให้บริโภคต่อวันสำหรับคนไทยอายุตั้งแต่ 6 ปีขึ้นไป โดยคิดจากความต้องการพลังงานวันละ 2,000 กิโลแคลอรี่</span>
        </div>
      </div>
    </div>
    <div v-if="mealtime" class="fixed xl:bottom-8 bottom-6 right-7 xl:ml-320 xl:right-auto">
      <div
        class="relative xl:w-16 w-12 xl:h-16 h-12 rounded-full bg-salmon -ml-6 shadow-lg flex justify-center items-center cursor-pointer"
        @click="mealShow = true"
      >
        <i class="material-icons xl:text-4xl text-3xl text-white">format_list_bulleted</i>
        <div
          class="xl:h-8 h-6 xl:w-8 w-6 flex items-center justify-center absolute -top-2 xl:-right-3 -right-2 bg-white text-sm xl:text-base text-salmon rounded-full filter drop-shadow-all"
        >{{ meal.mealHasFoodmenuList.length }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as GeneralApi from '../utils/generalApi'
import * as UserApi from '../utils/userApi'
import Item from '../components/Item.vue';
import MealItem from '../components/MealItem.vue';
import FoodmenuItem from '../components/FoodmenuItem.vue';
import FoodmenuImg from '../components/FoodmenuImg.vue';
import PageNumber from '../components/PageNumber.vue';
import 'animate.css'

const Url = Object.freeze({ foodmenusWithPage: 1, foodmenusWithPageSearch: 2, foodmenusWithPageSearchFoodtype: 3 });
const Show = Object.freeze({ General: 1, Myfoods: 2 });
const Meal = Object.freeze({ Lightmeal: "อาหารว่าง", Breakfast: "อาหารเช้า", Lunch: "อาหารเที่ยง", Dinner: "อาหารเย็น" });

export default {
  components: {
    Item,
    MealItem,
    FoodmenuItem,
    PageNumber,
    FoodmenuImg,
  },
  async asyncData() {
    const foodtypesresponse = await GeneralApi.foodtypes()
    const foodtypeArray = foodtypesresponse.data

    const foodmenusresponse = await GeneralApi.foodmenusWithPage()
    const foodmenusArray = foodmenusresponse.data

    return { foodtypeArray, foodmenusArray }
  },
  data() {
    return {
      user: this.$auth.user,
      Url, Show, Meal,
      meal: {
        mealtime: "",
        datemeal: "",
        mealHasFoodmenuList: [],
        totalkcal: 0
      },
      savemeal: true,
      editmeal: false,
      mealtime: this.$route.query.meal,
      mealdate: [],
      mealShow: false,
      popup: {
        show: false,
        delete: false,
        alert: false,
        fail: false,
        checkmark: false,
        meal: false
      },
      isLoggedIn: this.$auth.loggedIn,
      showing: Show.General,
      dailyCalorie: 2000,
      foodtypeArray: [],
      foodmenusArray: [],
      foodtypeSelected: null,
      popfilter: false,
      foodmenuSelected: null,
      foodmenuShow: false,
      foodmenuNum: 1,
      ingredientsItem: null,
      ingredientsItemShow: false,
      searchInput: "",
      search: "",
      url: Url.foodmenusWithPage
    };
  },
  watch: {
    '$route.query.meal': function mealtimeCheck() {
      this.mealtime = this.$route.query.meal
      if (this.mealtime) {
        this.getMeal()
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.calculateDailycal()
      this.getMeal()
    }
  },
  methods: {
    async addMeal() {
      try {
        let response
        if (this.editmeal) {
          response = await UserApi.updateMeal(this.meal, this.meal.mealid)
        } else {
          response = await UserApi.createMeal(this.meal)
        }
        if (response.data) {
          this.popup.show = true
          this.popup.meal = true
          this.popup.checkmark = true
          this.savemeal = true
          this.mealShow = false
        }
      } catch (err) {
        this.popup.show = true
        this.popup.alert = true
        this.popup.fail = true
        this.mealShow = false
      }
    },
    async deleteMeal(alert = false) {
      if (!alert) {
        this.popup.show = true
        this.popup.alert = true
        this.popup.mealdelete = true
        this.mealShow = false
        return
      }
      try {
        const response = await UserApi.deleteMeal(this.meal.mealid)
        if (response.data.success) {
          this.clearpopup()
          this.$router.push("/foodmenu")
        }
      } catch (err) {
        this.popup.show = true
        this.popup.alert = true
        this.popup.fail = true
        this.mealShow = false
      }
    },
    haveFoodmenu(foodmenu) {
      return this.meal.mealHasFoodmenuList.map(f => f.key.foodmenuFoodmenuid).includes(foodmenu.foodmenuid)
    },
    foodmenuIndex(foodmenu) {
      return this.meal.mealHasFoodmenuList.findIndex((f => f.key.foodmenuFoodmenuid === foodmenu.foodmenuid))
    },
    addFoodmenu(foodmenu, totaldish = 1) {
      if (totaldish < 1) {
        return
      }
      if (this.haveFoodmenu(foodmenu)) {
        const index = this.foodmenuIndex(foodmenu)
        this.meal.mealHasFoodmenuList[index].totaldish = totaldish
        this.meal.mealHasFoodmenuList[index].totalkcal = totaldish * foodmenu.totalkcal
      } else {
        this.meal.mealHasFoodmenuList.push({
          key: {
            foodmenuFoodmenuid: foodmenu.foodmenuid
          },
          foodmenu,
          totaldish,
          totalkcal: totaldish * foodmenu.totalkcal
        })
      }
      this.foodmenuSelected = null
      this.foodmenuNum = 1
      this.mealShow = true
      this.calculatetotalkcal()
    },
    calculatetotalkcal() {
      this.meal.totalkcal = this.meal.mealHasFoodmenuList.map(f => f.totalkcal).reduce((a, b) => a + b, 0)
      this.savemeal = false
    },
    deleteMealFoodmenu(foodmenu) {
      this.meal.mealHasFoodmenuList = this.meal.mealHasFoodmenuList.filter(f => f.key.foodmenuFoodmenuid !== foodmenu.foodmenuid)
      this.calculatetotalkcal()
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const date = String(today.getDate()).padStart(2, '0');

      return year + "-" + month + "-" + date
    },
    async getMeal() {
      if (this.mealtime && this.Meal[this.mealtime]) {
        const date = this.getCurrentDate()
        const response = await UserApi.mealDate(date)
        this.mealdate = response.data

        const meal = this.mealdate.find(m => m.mealtime === this.mealtime)
        if (meal) {
          const temp = meal
          temp.mealHasFoodmenuList = await this.getFoodmenuMeal(meal)
          this.meal = temp
          this.calculatetotalkcal()
          if (meal.totalkcal === this.meal.totalkcal) {
            this.savemeal = true
          }
          this.editmeal = true
        } else {
          this.meal = {
            mealtime: this.mealtime,
            datemeal: this.getCurrentDate(),
            mealHasFoodmenuList: [],
            totalkcal: 0
          }
        }
      } else {
        this.$router.replace("/foodmenu")
      }
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
    showFoodmenu(foodmenu) {
      this.foodmenuSelected = foodmenu
      this.foodmenuShow = true
      if (this.haveFoodmenu(foodmenu) && this.mealtime) {
        this.foodmenuNum = this.meal.mealHasFoodmenuList[this.foodmenuIndex(foodmenu)].totaldish
        this.mealShow = false
      }
    },
    calculateDailycal() {
      const today = new Date();
      const birthDate = new Date(this.user.doB);
      const age = today.getFullYear() - birthDate.getFullYear();

      let dailycal
      if (this.user.gender === "M") {
        dailycal = 66 + (13.7 * this.user.weight) + (5 * this.user.height) - (6.8 * age)
      } else if (this.user.gender === "F") {
        dailycal = 665 + (9.6 * this.user.weight) + (1.8 * this.user.height) - (4.7 * age)
      }
      this.dailyCalorie = parseInt(dailycal)
    },
    async changShow(show) {
      this.showing = show
      this.searchInput = ""
      this.foodtypeSelected = null
      this.popfilter = false
      this.url = Url.foodmenusWithPage
      if (show === Show.General) {
        const response = await GeneralApi.foodmenusWithPage()
        this.foodmenusArray = response.data
      } else if (show === Show.Myfoods) {
        const response = await UserApi.foodmenusWithPage()
        this.foodmenusArray = response.data
      }
    },
    async changPage(n) {
      const pagenumber = this.foodmenusArray.pageable.pageNumber + n
      let response
      if (this.showing === Show.General) {
        if (this.url === Url.foodmenusWithPageSearch) {
          response = await GeneralApi.foodmenusWithPageSearch(this.search, pagenumber)
        }
        else if (this.url === Url.foodmenusWithPageSearchFoodtype) {
          response = await GeneralApi.foodmenusWithPageSearchFoodtype(this.search, this.foodtypeSelected.foodtypeid, pagenumber)
        }
        else if (this.url === Url.foodmenusWithPage) {
          response = await GeneralApi.foodmenusWithPage(pagenumber)
        }
      } else if (this.showing === Show.Myfoods) {
        if (this.url === Url.foodmenusWithPageSearch) {
          response = await UserApi.foodmenusWithPageSearch(this.search, pagenumber)
        }
        else if (this.url === Url.foodmenusWithPageSearchFoodtype) {
          response = await UserApi.foodmenusWithPageSearchFoodtype(this.search, this.foodtypeSelected.foodtypeid, pagenumber)
        }
        else if (this.url === Url.foodmenusWithPage) {
          response = await UserApi.foodmenusWithPage(pagenumber)
        }
      }
      this.foodmenusArray = response.data
      this.searchInput = decodeURIComponent(this.search)
    },
    async searchfilter() {
      this.search = encodeURIComponent(this.searchInput)
      if (this.foodtypeSelected !== null) {
        this.foodtypefilter(this.foodtypeSelected)
        return
      }
      let response
      if (this.showing === Show.General) {
        response = await GeneralApi.foodmenusWithPageSearch(this.search)
      } else if (this.showing === Show.Myfoods) {
        response = await UserApi.foodmenusWithPageSearch(this.search)
      }
      this.foodmenusArray = response.data
      this.url = Url.foodmenusWithPageSearch
    },
    async foodtypefilter(foodtype) {
      this.popfilter = false
      this.foodtypeSelected = foodtype
      if (this.foodtypeSelected === null) {
        this.searchfilter()
        return
      }
      let response
      if (this.showing === Show.General) {
        response = await GeneralApi.foodmenusWithPageSearchFoodtype(this.search, this.foodtypeSelected.foodtypeid)
      } else if (this.showing === Show.Myfoods) {
        response = await UserApi.foodmenusWithPageSearchFoodtype(this.search, this.foodtypeSelected.foodtypeid)
      }
      this.foodmenusArray = response.data
      this.searchInput = decodeURIComponent(this.search)
      this.url = Url.foodmenusWithPageSearchFoodtype
    },
    async deleteFoodmenu(id) {
      try {
        const response = await UserApi.deleteFoodmenu(id)
        if (response.data.success) {
          this.clearpopup()
          this.foodmenuSelected = null
          this.foodmenuShow = false
          this.changShow(this.showing)
        }
      } catch (err) {
        this.clearpopup()
        this.popup.show = true
        this.popup.alert = true
        this.popup.fail = true
      }
    },
    clearpopup() {
      Object.keys(this.popup).forEach(i => { this.popup[i] = false })
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


.checkmark {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: block;
    stroke-width: 3;
    stroke: #4bb71b;
    stroke-miterlimit: 10;
    box-shadow: inset 0px 0px 0px #4bb71b;
    animation: fill 0.4s ease-in-out 0.4s forwards,
        scale 0.3s ease-in-out 0.9s both;
    position: relative;
    top: 5px;
    right: 5px;
    margin: 0 auto;
}
.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 3;
    stroke-miterlimit: 10;
    stroke: #4bb71b;
    fill: #fff;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0;
    }
}

@keyframes scale {
    0%,
    100% {
        transform: none;
    }

    50% {
        transform: scale3d(1.1, 1.1, 1);
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #4bb71b;
    }
}
</style>
