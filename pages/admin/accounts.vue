<template>
  <div class="w-full">
    <div class="py-6 pl-8 text-3xl border-b-2 xl:mt-0 mt-16 xl:text-left text-center">
      Manage Accounts
    </div>
    <div
      class="flex xl:flex-row flex-col w-full items-center xl:justify-between justify-center px-8 py-6 gap-y-4"
    >
      <div class="flex gap-x-4"></div>
      <div
        class="flex items-center gap-x-4 xl:justify-between justify-center xl:w-auto w-full"
      >
        <PageNumber
          v-if="userArray.length !== 0"
          :page="userArray"
          classnum="text-base text-gray-500"
        />
      </div>
    </div>
    <div class="overflow-x-auto xl:w-auto w-screen">
      <div class="flex flex-col w-304 mx-5 border-4 divide-y-2">
        <div class="flex divide-x-4 border-b-2 text-center">
          <div class="w-14 py-1 flex-shrink-0">Id</div>
          <div class="flex-grow py-1">Username</div>
          <div class="w-52 py-1">Email</div>
          <div class="w-36 py-1">Firstname</div>
          <div class="w-36 py-1">Lastname</div>
          <div class="w-16 py-1">Gender</div>
          <div class="w-28 py-1">Date of Birth</div>
          <div class="w-16 py-1">Weigth</div>
          <div class="w-16 py-1">Height</div>
          <div class="w-24 py-1">Role</div>
          <div class="w-16 py-1 flex-shrink-0">Action</div>
        </div>
        <div
          v-for="user in userArray.content"
          :key="user.userid"
        >
        <AdminUser :user="user"></AdminUser>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";
import AdminUser from "../../components/Admin/AdminUser.vue";

export default {
  component: {
    AdminUser,
  },
  layout: "admin",
  middleware: ["auth", "admin"],
  data() {
    return {
      search: "",
      userArray: [],
      add: false,
      useradd: {},
    };
  },
  async mounted() {
    const userresponse = await AdminApi.usersWithPage();
    this.userArray = userresponse.data;
  },
  methods: {
    async changPage(n) {
      const pagenumber = this.userArray.pageable.pageNumber + n;
      const userresponse = await AdminApi.usersWithPage(pagenumber);
      this.userArray = userresponse.data;
    },
  },
};
</script>
