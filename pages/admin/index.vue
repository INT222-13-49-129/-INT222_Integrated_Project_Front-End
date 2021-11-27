<template>
  <div>
    <div class="py-6 pl-8 text-3xl border-b-2 xl:mt-0 mt-16 xl:text-left text-center">
      Addmin , {{ user.username }}
    </div>
    <div
      class="flex xl:flex-row flex-col w-full items-center xl:justify-between justify-center px-8 py-6 gap-y-4"
    >
      <div class="text-2xl text-gray-600">All Information</div>
      <div
        class="flex gap-x-1 justify-center items-center px-3 h-9 rounded-xl border-2 border-red-600 text-red-700 cursor-pointer hover:bg-red-600 hover:text-white"
        @click="changestatus()"
      >
        ออกจาการเป็น Admin
      </div>
    </div>
    <div class="flex flex-wrap justify-around gap-y-5">
      <div
        class="flex flex-col justify-center items-center bg-red-400 py-6 w-48 rounded-2xl text-white gap-y-3 shadow-lg cursor-pointer"
        @click="$router.push('/admin/accounts')"
      >
        <div class="flex items-center">
          <i class="material-icons -mt-1 mr-3 text-3xl">manage_accounts</i>
          <div class="text-xl">Accounts</div>
        </div>
        <div class="opacity-90">All {{ all.user }} accounts</div>
      </div>
      <div
        class="flex flex-col justify-center items-center bg-blue-400 py-6 w-48 rounded-2xl text-white gap-y-3 shadow-lg cursor-pointer"
        @click="$router.push('/admin/menu')"
      >
        <div class="flex items-center">
          <i class="material-icons -mt-1 mr-3 text-3xl">restaurant_menu</i>
          <div class="text-xl">Menu</div>
        </div>
        <div class="opacity-90">All {{ all.foodmenu }} menu</div>
      </div>
      <div
        class="flex flex-col justify-center items-center bg-yellow-400 py-6 w-48 rounded-2xl text-white gap-y-3 shadow-lg cursor-pointer"
        @click="$router.push('/admin/ingradients')"
      >
        <div class="flex items-center">
          <i class="material-icons -mt-1 mr-3 text-3xl">tapas</i>
          <div class="text-xl">Ingradients</div>
        </div>
        <div class="opacity-90">All {{ all.ingredients }} ingradients</div>
      </div>
      <div
        class="flex flex-col justify-center items-center bg-green-400 py-6 w-48 rounded-2xl text-white gap-y-3 shadow-lg cursor-pointer"
        @click="$router.push('/admin/category')"
      >
        <div class="flex items-center">
          <i class="material-icons -mt-1 mr-3 text-3xl">ramen_dining</i>
          <div class="text-xl">Category</div>
        </div>
        <div class="opacity-90">All {{ all.foodtype }} category</div>
      </div>
      <div
        class="flex flex-col justify-center items-center bg-pink-400 py-6 w-48 rounded-2xl text-white gap-y-3 shadow-lg cursor-pointer"
        @click="$router.push('/admin/request')"
      >
        <div class="flex items-center">
          <i class="material-icons -mt-1 mr-3 text-3xl">post_add</i>
          <div class="text-xl">Request</div>
        </div>
        <div class="opacity-90">All {{ all.request }} request</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";

export default {
  layout: "admin",
  middleware: ["auth", "admin"],
  data() {
    return {
      user: this.$auth.user,
      all: {},
    };
  },
  async mounted() {
    const allInformationresponse = await AdminApi.allInformation();
    this.all = allInformationresponse.data;
  },
  methods: {
    async changestatus() {
      try {
        if (
          confirm(`${this.user.username} ต้องการออกจาการเป็น Admin ใช่หรือไม่ ?
การออกจาการเป็น Admin จะทำให้เสียสิทธิ์ทั้งหมดของ Admin และไม่สามารถกลับมาเป็น Admin ได้จนกว่า Admin คนอื่นจะอนุมัติ`)
        ) {
          const response = await AdminApi.adminChangestatus();
          if (response.data) {
            this.$auth.logout();
            this.$router.replace("/");
          }
        } else {
          return;
        }
      } catch (err) {
        if ([500, 400].includes(err.response?.status) || err.response === undefined) {
          alert("ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่");
        }
      }
    },
  },
};
</script>
