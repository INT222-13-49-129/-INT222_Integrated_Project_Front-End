<template>
  <div class="md:w-336 w-11/12 mt-16 mx-auto pt-6 md:pt-0 bg-white shadow-lg">
    <div
      class="bgimge object-cover md:w-full py-2 md:h-28 mx-6 md:mx-0 rounded-3xl md:rounded-none"
    >
      <div class="flex md:flex-row flex-col">
        <div class="text-white font-normal md:pt-8 pt-4 md:ml-32 flex-shrink-0">
          <div class="md:text-xl text-2xl md:text-right text-center">ปริมาณแคลอรี่ในอาหาร</div>
          <div class="text-base md:text-right text-center">หุ่นสวย ด้วยตัวเรา</div>
        </div>
        <div class="md:w-1/4 md:pr-20 flex-grow mx-6 md:mx-0 my-4 md:my-0">
          <div class="relative text-gray-600 flex justify-end md:pt-8 pt-2 z-0">
            <div class="flex justify-start">
              <button type="submit" class="focus:outline-none absolute mt-3 ml-3 mr-1">
                <i class="material-icons text-gray-400">search</i>
              </button>
            </div>
            <input
              class="rounded-2xl bg-white w-full md:w-auto h-12 px-5 pl-10 text-sm focus:outline-none"
              placeholder="ค้นหาอาหาร"
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
    <div class="flex md:flex-row flex-col w-full min-h-screen">
      <div
        class="md:w-1/6 md:bg-gray-200 mx-auto mt-2 md:mt-0 flex items-center md:items-start md:flex-col flex-row md:py-10 py-4 md:pl-8 pl-4 pr-4 md:text-2xl text-lg md:gap-y-8 gap-x-6 md:gap-x-0 md:text-salmon text-gray-600"
      >
        <div class="flex-shrink-0 md:w-full">
          <div>General</div>
          <div class="text-base text-gray-500 pl-3 md:block hidden">
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
        <div class="flex-shrink-0 md:w-full">
          <div>My foods</div>
          <div v-if="false" class="text-base text-gray-500 pl-3 md:block hidden">
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
        <div class="flex-shrink-0 md:w-full">Favorites</div>
      </div>
      <div
        class="text-xs text-right mr-4 -mt-3 md:hidden text-gray-400"
      >catagory: {{ foodtypeArray[2].typename }}</div>
      <div class="md:w-5/6 md:p-10">
        <div
          class="flex justify-between md:pb-2 pb-1.5 md:pt-0 pt-1.5 px-3 md:px-0 mt-2 md:mt-0 items-center bg-gray-400 md:bg-white text-white md:text-gray-700"
        >
          <div class="md:text-3xl text-lg">All items</div>
          <div>[number page]</div>
        </div>
        <div class="flex md:flex-wrap flex-col md:flex-row md:gap-y-4 md:gap-x-4 md:pl-5 pl-2 md:pr-0 pr-2 md:pt-0 pt-2 divide-y-2 md:divide-y-0">
          <div v-for="i in 21" :key="i" class="py-2 md:py-0">
            <Item
              :item="{
                name: `ข้าวกระเพราหมู ${i}`,
                description: '100% ของแคลอรี่ที่ควรบริโภคต่อวัน',
                totalkcal: '5020'
              }"
            >
              <div class="md:w-24 md:h-24 w-12 h-12  items-center md:mr-2 mr-1 flex flex-shrink-0">
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
export default {
  components: {
    Item
  },
  async asyncData() {
    const response = await GeneralApi.foodtypes()
    const foodtypeArray = response.data
    return { foodtypeArray }
  },
  data() {
    return {
      foodtypeArray: []
    };
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
