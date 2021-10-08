<template>
  <div class="xl:w-336 w-11/12 mt-16 mx-auto pt-6 xl:pt-0 bg-white shadow-lg">
    <div
      class="bgimge object-cover xl:w-full py-2 xl:h-28 mx-6 xl:mx-0 rounded-3xl xl:rounded-none"
    >
      <div class="flex xl:flex-row flex-col">
        <div class="text-white font-normal xl:pt-8 pt-4 xl:ml-32 flex-shrink-0">
          <div class="xl:text-xl text-2xl xl:text-right text-center">ปริมาณแคลอรี่ในอาหาร</div>
          <div class="text-base xl:text-right text-center">หุ่นสวย ด้วยตัวเรา</div>
        </div>
        <div class="xl:w-1/4 xl:pr-20 flex-grow mx-6 xl:mx-0 my-4 xl:my-0">
          <div class="relative text-gray-600 flex justify-end xl:pt-8 pt-2 z-0">
            <div class="flex justify-start">
              <button type="submit" class="focus:outline-none absolute mt-3 ml-3 mr-1" @click="searchfilter">
                <i class="material-icons text-gray-400">search</i>
              </button>
            </div>
            <input
              v-model="searchInput"
              class="rounded-2xl bg-white w-full xl:w-auto h-12 px-5 pl-10 text-sm focus:outline-none"
              placeholder="ค้นหาอาหาร"
              @keyup.enter="searchfilter"
            />
            <div class="flex justify-end">
              <button type="submit" class="focus:outline-none absolute mt-3 mr-3">
                <i class="material-icons text-gray-200">filter_alt</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex xl:flex-row flex-col w-full min-h-screen">
      <div
        class="xl:w-1/6 xl:bg-gray-200 mx-auto mt-2 xl:mt-0 flex items-center xl:items-start xl:flex-col flex-row xl:py-10 py-4 xl:pl-8 pl-4 pr-4 xl:text-2xl text-lg xl:gap-y-8 gap-x-8 xl:gap-x-0 xl:text-salmon text-gray-600"
      >
        <div class="flex-shrink-0 xl:w-full">
          <div>General</div>
          <div class="text-base text-gray-500 pl-3 xl:block hidden">
            <div class="pt-2 text-lg text-gray-600">Catagory</div>
            <div>
              <div class="pl-2 py-0.5 bg-brightsalmon rounded-md shadow-lg">ทั้งหมด</div>
              <div
                v-for="t in foodtypeArray"
                :key="t.foodtypeid"
                class="pl-2 py-0.5"
              >{{ t.typename }}</div>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 xl:w-full">
          <div>My foods</div>
          <div v-if="false" class="text-base text-gray-500 pl-3 xl:block hidden">
            <div class="pt-2 text-lg text-gray-600">Catagory</div>
            <div>
              <div class="pl-2 py-0.5 bg-brightsalmon rounded-md shadow-lg">ทั้งหมด</div>
              <div
                v-for="t in foodtypeArray"
                :key="t.foodtypeid"
                class="pl-2 py-0.5"
              >{{ t.typename }}</div>
            </div>
          </div>
        </div>
        <div class="flex-shrink-0 xl:w-full">Favorites</div>
      </div>
      <div
        class="text-xs text-right mr-4 -mt-3 xl:hidden text-gray-400"
      >catagory: {{ foodtypeArray[2].typename }}</div>
      <div class="xl:w-5/6 xl:p-10">
        <div
          class="flex justify-between xl:pb-2 pb-1.5 xl:pt-0 pt-1.5 px-3 xl:px-0 mt-2 xl:mt-0 items-center bg-gray-400 xl:bg-white text-white xl:text-gray-700"
        >
          <div class="xl:text-3xl text-lg">All items</div>
          <div>
            <PageNumber :page="foodmenusArray" />
          </div>
        </div>
        <div v-if="foodmenusArray.totalElements===0" class="text-center text-2xl mt-12"> ไม่พบข้อมูลที่ค้นหา </div>
        <div
          class="flex xl:flex-wrap flex-col xl:flex-row xl:gap-y-4 xl:gap-x-4 xl:pl-5 pl-2 xl:pr-0 pr-2 xl:pt-0 pt-2 divide-y-2 xl:divide-y-0"
        >
          <div
            v-for="foodmenu in foodmenusArray.content"
            :key="foodmenu.foodmenuid"
            class="py-2 xl:py-0"
          >
            <Item
              :item="{
                name: foodmenu.foodname,
                description: `${parseInt((foodmenu.totalkcal / 2000) * 100)}% ของแคลอรี่ที่ควรบริโภคต่อวัน`,
                totalkcal: foodmenu.totalkcal
              }"
            >
              <div class="xl:w-24 xl:h-24 w-12 h-12 items-center xl:mr-2 mr-1 flex flex-shrink-0">
                <img class="object-cover h-full" src="../assets/img/food-index.png" />
              </div>
            </Item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as GeneralApi from '../utils/generalApi'
import Item from '../components/Item.vue';
import PageNumber from '../components/PageNumber.vue';
export default {
  components: {
    Item,
    PageNumber
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
      foodtypeArray: [],
      foodmenusArray: [],
      searchInput: "",
      url: ""
    };
  },
  methods: {
    async changPage(n) {
      let response
      if(this.url==='foodmenusWithPageSearch'){
        response = await GeneralApi.foodmenusWithPageSearch(encodeURIComponent(this.searchInput),this.foodmenusArray.pageable.pageNumber+n)
      }else{
        response = await GeneralApi.foodmenusWithPage(this.foodmenusArray.pageable.pageNumber+n)
      }
      this.foodmenusArray = response.data
    },
    async searchfilter(){
      const response = await GeneralApi.foodmenusWithPageSearch(encodeURIComponent(this.searchInput))
      this.foodmenusArray = response.data
      this.url = 'foodmenusWithPageSearch'
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
