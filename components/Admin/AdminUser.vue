<template>
  <div class="flex divide-x-4 text-center">
    <div class="w-14 py-1 text-right px-2 flex-shrink-0">{{ user.userid }}</div>
    <div class="flex-1 py-1 overflow-hidden">{{ user.username }}</div>
    <div class="w-52 py-1 overflow-hidden">{{ user.email }}</div>
    <div class="w-36 py-1 overflow-hidden">{{ user.firstname }}</div>
    <div class="w-36 py-1 overflow-hidden">{{ user.lastname }}</div>
    <div class="w-16 py-1">{{ user.gender }}</div>
    <div class="w-28 py-1">{{ user.doB }}</div>
    <div class="w-16 py-1">{{ user.weight }}</div>
    <div class="w-16 py-1">{{ user.height }}</div>
    <div class="w-24">
      <div v-if="!edit" class="py-1">
        {{ user.status }}
      </div>
      <div v-else class="bg-gray-100 h-full flex flex-col justify-center">
        <select
          v-model="status"
          class="w-full focus:outline-none text-center bg-gray-100"
        >
          <option v-for="s in userStatus" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <div
      v-if="user.status === 'NORMAL'"
      class="w-16 py-1 flex-shrink-0 flex justify-center items-center text-gray-400 relative"
    >
      <i
        class="material-icons text-xl absolute left-2.5 cursor-pointer"
        @click="edit = !edit"
      >
        {{ edit ? "close" : "edit" }}
      </i>
      <i
        class="material-icons text-xl absolute right-2.5 cursor-pointer"
        @click="edit ? submitFrom() : deleteuser()"
      >
        {{ edit ? "save" : "delete" }}
      </i>
    </div>
    <div v-else class="w-16 py-1 flex-shrink-0 flex justify-center items-center">-</div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";

export default {
  props: {
    user: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      edit: false,
      status: this.user.status,
      userStatus: ["ADMIN", "NORMAL"],
    };
  },
  watch: {
    edit: function editchange() {
      this.status = this.user.status;
    },
  },
  methods: {
    async submitFrom() {
      if (this.status === "ADMIN") {
        try {
          const response = await AdminApi.changestatus(this.user.userid);
          if (response.data) {
            location.reload();
          }
        } catch (err) {
          this.changestatus.status = this.status;
          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            alert("ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่");
          }
        }
      }else{
          this.edit = false
      }
    },
    async deleteuser() {
      try {
        if (
          confirm(`ต้องการลบบัญชีผู้ใช้ ${this.user.username} ใช่หรือไม่ ?
การลบผู้ใช้จะทำข้อมูลทั้งหมดของผู้ใช้หายไปรวมถึงเมนูอาหารที่เพิ่มโดยผู้ใช้บัญชีนี้`)
        ) {
          const response = await AdminApi.deleteUser(this.user.userid);
          if (response.data.success) {
            location.reload();
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
