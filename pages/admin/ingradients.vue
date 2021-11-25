<template>
  <div class="w-full">
    <div class="py-6 pl-8 text-3xl border-b-2 xl:mt-0 mt-16 xl:text-left text-center">
      Manage Ingradients
    </div>
    <div
      class="flex xl:flex-row flex-col w-full items-center xl:justify-between justify-center px-8 py-6 gap-y-4"
    >
      <div class="flex gap-x-4">
        <div class="relative text-gray-500 flex-grow flex">
          <div class="flex justify-start">
            <button
              type="submit"
              class="focus:outline-none absolute mt-1.5 ml-2"
              @click="searchfilter"
            >
              <i class="material-icons text-gray-500">search</i>
            </button>
          </div>
          <input
            v-model="searchInput"
            class="rounded-xl w-full border-2 border-gray-500 h-9 px-5 pl-10 text-sm focus:outline-none"
            placeholder="Search Ingradients"
            @keyup.enter="searchfilter"
          />
        </div>
        <select
          v-model="ingredientstype"
          class="flex gap-x-1 justify-center items-center px-2 h-9 rounded-xl border-2 cursor-pointer border-gray-500"
          @change="ingredientstypefilter(ingredientstype)"
        > 
          <option value="">All</option>
          <option v-for="itype in ingredientstypeArray" :key="itype" :value="itype">{{itype}}</option>
        </select>
      </div>
      <div class="flex items-center gap-x-4 justify-between xl:w-auto w-full">
        <div
          class="flex gap-x-1 justify-center items-center w-20 h-9 rounded-xl border-2 cursor-pointer border-gray-500"
          @click="add = !add"
        >
          Add <i class="material-icons text-gray-500 text-xl">add</i>
        </div>
        <PageNumber :page="ingredientsArray" classnum="text-base text-gray-500" />
      </div>
    </div>
    <div class="overflow-x-auto xl:w-auto w-screen">
    <AdminAddIngredients v-if="add" class="mb-4"></AdminAddIngredients>
      <div class="flex flex-col w-288 mx-8 border-4 divide-y-2">
        <div class="flex divide-x-4 border-b-2 text-center">
          <div class="w-1/12 py-1 flex-shrink-0">Id</div>
          <div class="flex-grow py-1">Ingredients name</div>
          <div class="w-1/7 py-1">Unit</div>
          <div class="w-1/7 py-1">kcal. per unit</div>
          <div class="w-1/5 py-1">Description unit</div>
          <div class="w-1/6 py-1">Ingredients type</div>
          <div class="w-1/12 py-1 flex-shrink-0">Action</div>
        </div>
        <div
          v-for="ingredients in ingredientsArray.content"
          :key="ingredients.ingredientsid"
        >
            <AdminIngredients :ingredients="ingredients" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as GeneralApi from "../../utils/generalApi";
import PageNumber from "../../components/PageNumber.vue";
import AdminIngredients from "../../components/Admin/AdminIngredients.vue";
import AdminAddIngredients from "../../components/Admin/AdminAddIngredients.vue";

export default {
  component: {
    PageNumber,
    AdminIngredients,
    AdminAddIngredients
  },
  layout: "admin",
  middleware: ["auth", "admin"],
  async asyncData() {
    const ingredientstyperesponse = await GeneralApi.ingredientsType();
    const ingredientstypeArray = ingredientstyperesponse.data;

    const ingredientsresponse = await GeneralApi.ingredientsWithPage("","",0,15,"ASC");
    const ingredientsArray = ingredientsresponse.data;

    return { ingredientsArray, ingredientstypeArray };
  },
  data() {
    return {
      search: "",
      searchInput: "",
      ingredientstypeArray: [],
      ingredientsArray: [],
      ingredientstype: "",
      add: false,
    };
  },
  methods: {
    changPage(n) {
      const pagenumber = this.ingredientsArray.pageable.pageNumber + n;
      this.getingredient(pagenumber);
    },
    searchfilter() {
      this.search = encodeURIComponent(this.searchInput);
      this.getingredient();
    },
    ingredientstypefilter(ingredientstype) {
      this.ingredientstype = ingredientstype;
      this.getingredient();
    },
    async getingredient(pagenumber = 0) {
      this.searchInput = decodeURIComponent(this.search);
      const response = await GeneralApi.ingredientsWithPage(
        this.ingredientstype,
        this.search,
        pagenumber,
        15,
        "ASC"
      );
      this.ingredientsArray = response.data;
    },
  },
};
</script>
