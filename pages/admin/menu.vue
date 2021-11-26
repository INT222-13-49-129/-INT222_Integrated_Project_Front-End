<template>
  <div class="w-full">
    <div class="py-6 pl-8 text-3xl border-b-2 xl:mt-0 mt-16 xl:text-left text-center">
      Manage Food menu
    </div>
    <div
      class="flex xl:flex-row flex-col w-full items-center xl:justify-between justify-center px-8 py-6 gap-y-4"
    >
      <div class="flex gap-x-4">
        <div class="relative text-gray-500 flex-grow flex">
          <div class="flex justify-start">
            <button type="submit" class="focus:outline-none absolute mt-1.5 ml-2">
              <i class="material-icons text-gray-500" @click="searchfilter">search</i>
            </button>
          </div>
          <input
            v-model="searchInput"
            class="rounded-xl w-full border-2 border-gray-500 h-9 px-5 pl-10 text-sm focus:outline-none"
            placeholder="Search Food menu"
            @keyup.enter="searchfilter"
          />
        </div>
        <select
          v-model="foodtypeid"
          class="flex gap-x-1 justify-center items-center px-2 h-9 rounded-xl border-2 cursor-pointer border-gray-500"
          @change="foodtypefilter(foodtypeid)"
        >
          <option :value="0">All</option>
          <option
            v-for="foodtype in foodtypeArray"
            :key="foodtype.foodtypeid"
            :value="foodtype.foodtypeid"
          >
            {{ foodtype.typename }}
          </option>
        </select>
      </div>
      <div class="flex items-center gap-x-4 justify-between xl:w-auto w-full">
        <PageNumber :page="foodmenusArray" classnum="text-base text-gray-500" />
      </div>
    </div>
    <div class="overflow-x-auto xl:w-auto w-screen">
    <AdminFoodmenuItem v-if="item" :foodmenu="foodmenu" class="mb-4"></AdminFoodmenuItem>
      <div class="flex flex-col w-304 mx-4 border-4 divide-y-2">
        <div class="flex divide-x-4 border-b-2 text-center">
          <div class="w-1/12 py-1 flex-shrink-0">Id</div>
          <div class="flex-grow py-1">Food menu name</div>
          <div class="w-1/5 py-1">Description</div>
          <div class="w-1/7 py-1">Total kcal.</div>
          <div class="w-1/6 py-1">Category</div>
          <div class="w-1/7 py-1">Status</div>
          <div class="w-1/12 py-1">User Id</div>
        </div>
        <div
          v-for="foodmenus in foodmenusArray.content"
          :key="foodmenus.foodmenuid"
          class="cursor-pointer"
          :class="{'bg-gray-100': foodmenus.foodmenuid === foodmenu.foodmenuid }"
          @click="foodmenu = foodmenus,item = true"
        >
          <AdminFoodmenu :foodmenus="foodmenus"></AdminFoodmenu>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";
import * as GeneralApi from "../../utils/generalApi";
import PageNumber from "../../components/PageNumber.vue";
import AdminFoodmenu from "../../components/Admin/AdminFoodmenu.vue";
import AdminFoodmenuItem from "../../components/Admin/AdminFoodmenuItem.vue";

export default {
  component: {
    PageNumber,
    AdminFoodmenu,
    AdminFoodmenuItem
  },
  layout: "admin",
  middleware: ["auth", "admin"],
  async asyncData() {
    const foodtypesresponse = await GeneralApi.foodtypes();
    const foodtypeArray = foodtypesresponse.data;

    const foodmenusresponse = await GeneralApi.foodmenusWithPage();
    const foodmenusArray = foodmenusresponse.data;

    return { foodtypeArray, foodmenusArray };
  },
  data() {
    return {
      foodtypeArray: [],
      foodmenusArray: [],
      foodtypeid: 0,
      search: "",
      searchInput: "",
      item:false,
      foodmenu:{}
    };
  },
  async mounted() {
    const foodmenusresponse = await AdminApi.foodmenusWithPageSearchFoodtype();
    this.foodmenusArray = foodmenusresponse.data;
  },
  methods: {
    changPage(n) {
      const pagenumber = this.foodmenusArray.pageable.pageNumber + n;
      this.getfoodmenus(pagenumber);
    },
    searchfilter() {
      this.search = encodeURIComponent(this.searchInput);
      this.getfoodmenus();
    },
    foodtypefilter(foodtypeid) {
      this.foodtypeid = foodtypeid;
      this.getfoodmenus();
    },
    async getfoodmenus(pagenumber = 0) {
      this.item = false
      this.foodmenu = {}
      this.searchInput = decodeURIComponent(this.search);
      const response = await AdminApi.foodmenusWithPageSearchFoodtype(
        this.search,
        this.foodtypeid,
        pagenumber
      );
      this.foodmenusArray = response.data;
    },
  },
};
</script>
