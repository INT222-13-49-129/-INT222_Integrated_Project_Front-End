<template>
  <div class="w-full">
    <div class="py-6 pl-8 text-3xl border-b-2 xl:mt-0 mt-16 xl:text-left text-center">
      Manage Request
    </div>
    <div
      class="flex xl:flex-row flex-col w-full items-center xl:justify-between justify-center px-8 py-6 gap-y-4"
    >
      <div class="flex gap-x-4"></div>
      <div
        class="flex items-center gap-x-4 xl:justify-between justify-center xl:w-auto w-full"
      >
        <PageNumber
          v-if="requestArray.length !== 0"
          :page="requestArray"
          classnum="text-base text-gray-500"
        />
      </div>
    </div>
    <div class="overflow-x-auto xl:w-auto w-screen">
      <AdminAddIngredients
        v-if="add && requestadd.ingredientsreq"
        :ingredients="requestadd.ingredientsreq"
        class="mb-4"
      ></AdminAddIngredients>
      <AdminAddFoodtype
        v-if="add && requestadd.foodtypereq"
        :foodtype="requestadd.foodtypereq"
        class="mb-4"
      ></AdminAddFoodtype>
      <div class="flex flex-col w-224 mx-8 border-4 divide-y-2">
        <div class="flex divide-x-4 border-b-2 text-center">
          <div class="w-1/7 py-1 flex-shrink-0">Id</div>
          <div class="flex-grow py-1">Request name</div>
          <div class="w-1/6 py-1">Request type</div>
          <div class="w-1/7 py-1">User Id</div>
          <div class="w-1/5 py-1">Status</div>
          <div class="w-1/7 py-1 flex-shrink-0">Action</div>
        </div>
        <div
          v-for="request in requestArray.content"
          :key="request.requestid"
        >
          <AdminRequest :request="request"></AdminRequest>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";
import AdminRequest from "../../components/Admin/AdminRequest.vue";

export default {
  component: {
    AdminRequest,
  },
  layout: "admin",
  middleware: ["auth", "admin"],
  data() {
    return {
      search: "",
      requestArray: [],
      add: false,
      requestadd: {},
    };
  },
  async mounted() {
    const requestresponse = await AdminApi.requestsWithPage();
    this.requestArray = requestresponse.data;
  },
  methods: {
    async changPage(n) {
      const pagenumber = this.requestArray.pageable.pageNumber + n;
      const requestresponse = await AdminApi.requestsWithPage(pagenumber);
      this.requestArray = requestresponse.data;
    }
  },
};
</script>
