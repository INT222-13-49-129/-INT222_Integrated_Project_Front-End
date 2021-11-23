<template>
  <div class="flex flex-col w-96 mx-8 border-4 divide-y-2">
    <div class="flex divide-x-4 text-center">
      <div class="w-1/6 py-1 flex-shrink-0">Id</div>
      <div class="flex-grow py-1">Category name</div>
      <div class="w-1/4 py-1 flex-shrink-0">Action</div>
    </div>
    <div class="flex divide-x-4 text-center">
      <div class="w-1/6 py-1 flex-shrink-0 text-gray-500">Auto</div>
      <div class="flex-grow">
        <input
          v-model="newfoodtype.typename"
          class="w-full focus:outline-none text-center py-1 bg-gray-50"
          @keyup="validate ? '' : validateFrom()"
        />
        <div v-if="!validate" class="text-xs text-red-600 bg-gray-50 px-3 text-left">
          *{{ validatetext }}
        </div>
      </div>
      <div
        class="w-1/4 py-1 flex-shrink-0 flex justify-center items-center text-gray-400 relative"
      >
        <i
          class="material-icons text-xl absolute left-5 cursor-pointer"
          @click="$parent.add = false"
          >close</i
        >
        <i
          class="material-icons text-xl absolute right-5 cursor-pointer"
          @click="submitFrom()"
          >save</i
        >
      </div>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";

export default {
  data() {
    return {
      newfoodtype: {
        typename: "",
      },
      validate: true,
      validatetext: "",
    };
  },
  methods: {
    async submitFrom() {
      this.validateFrom();
      if (this.validate) {
        try {
          const response = await AdminApi.createFoodtype(this.newfoodtype);
          if (response.data) {
            location.reload();
          }
        } catch (err) {
          const status = err.response?.data?.status;

          if (status === 7002) {
            this.validatetext = "ชื่อประเภทอาหารนี้มีอยู่แล้วในระบบ";
            this.validate = false;
          }

          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            alert("ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่");
          }
        }
      }
    },
    validateFrom() {
      if (this.newfoodtype.typename === "") {
        this.validatetext = "กรุณาใส่ชื่อประเภทอาหาร";
        this.validate = false;
      } else if (this.newfoodtype.typename.length > 50) {
        this.validatetext = "ชื่อประเภทอาหารห้ามยาวกว่า 50 ตัวอักษร";
        this.validate = false;
      } else {
        this.validate = true;
      }
    },
  },
};
</script>
