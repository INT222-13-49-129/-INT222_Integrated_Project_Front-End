<template>
  <div>
    <div class="py-6 pl-8 text-3xl border-b-2 xl:mt-0 mt-16 xl:text-left text-center">Manage Category</div>
    <div class="flex items-center xl:justify-start justify-center px-8 py-6 ">
      <div class="flex gap-x-4">
        <div class="relative text-gray-500 flex-grow flex">
          <div class="flex justify-start">
            <button type="submit" class="focus:outline-none absolute mt-1.5 ml-2">
              <i class="material-icons text-gray-500">search</i>
            </button>
          </div>
          <input
            v-model.lazy="search"
            class="rounded-xl w-full border-2 border-gray-500 h-9 px-5 pl-10 text-sm focus:outline-none"
            placeholder="Search Categories "
          />
        </div>
        <div
          class="flex gap-x-1 justify-center items-center w-20 h-9 rounded-xl border-2 cursor-pointer border-gray-500"
          @click="add = !add"
        >
          Add <i class="material-icons text-gray-500 text-xl">add</i>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto xl:w-auto w-screen">
      <AdminAddFoodtype v-if="add" class="mb-4"></AdminAddFoodtype>
      <div class="flex flex-col w-96 mx-8 border-4 divide-y-2">
        <div class="flex divide-x-4 border-b-2 text-center">
          <div class="w-1/6 py-1 flex-shrink-0">Id</div>
          <div class="flex-grow py-1">Category name</div>
          <div class="w-1/4 py-1 flex-shrink-0">Action</div>
        </div>
        <div
          v-for="foodtype in foodtypeArray
            .sort(compare)
            .filter((f) => f.typename.includes(search))"
          :key="foodtype.foodtypeid"
        >
          <AdminFoodtype :foodtype="foodtype" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as GeneralApi from "../../utils/generalApi";
import AdminFoodtype from "../../components/Admin/AdminFoodtype.vue";
import AdminAddFoodtype from "../../components/Admin/AdminAddFoodtype.vue";

export default {
  component: {
    AdminFoodtype,
    AdminAddFoodtype,
  },
  layout: "admin",
  middleware: ["auth", "admin"],
  async asyncData() {
    const foodtypesresponse = await GeneralApi.foodtypes();
    const foodtypeArray = foodtypesresponse.data;

    return { foodtypeArray };
  },
  data() {
    return {
      search: "",
      foodtypeArray: [],
      add: false
    };
  },
  methods: {
    compare(a, b) {
      if (a.foodtypeid < b.foodtypeid) {
        return -1;
      }
      if (a.foodtypeid > b.foodtypeid) {
        return 1;
      }
      return 0;
    },
  },
};
</script>
