<template>
  <div class="flex flex-shrink-0 divide-x-4">
    <div class="w-1/6 py-1 flex-shrink-0 px-2 text-right">{{ foodtype.foodtypeid }}</div>
    <div class="flex-1">
      <div v-if="!edit" class="w-full py-1 px-3 text-center">
        {{ foodtype.typename }}
      </div>
      <div v-else>
        <input
          v-model="updatefoodtype.typename"
          class="w-full focus:outline-none text-center py-1 bg-gray-100"
          @keyup="validate ? '' : validateFrom()"
        />
        <div v-if="!validate" class="text-xs text-red-600 bg-gray-100 px-3">
          *{{ validatetext }}
        </div>
      </div>
    </div>
    <div
      class="w-1/4 py-1 flex-shrink-0 flex justify-center items-center text-gray-400 relative"
    >
      <i
        class="material-icons text-xl absolute left-5 cursor-pointer"
        @click="edit = !edit"
      >
        {{ edit ? "close" : "edit" }}
      </i>
      <i
        class="material-icons text-xl absolute right-5 cursor-pointer"
        @click="edit ? submitFrom() : deletefoodtype()"
      >
        {{ edit ? "save" : "delete" }}
      </i>
    </div>
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";

export default {
  props: {
    foodtype: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      edit: false,
      updatefoodtype: {
        foodtypeid: this.foodtype.foodtypeid,
        typename: this.foodtype.typename,
      },
      validate: true,
      validatetext: "",
    };
  },
  watch: {
    edit: function editchange() {
      this.updatefoodtype = {
        foodtypeid: this.foodtype.foodtypeid,
        typename: this.foodtype.typename,
      };
      this.validate = true;
      this.validatetext = "";
    },
  },
  methods: {
    async submitFrom() {
      this.validateFrom();
      if (this.validate) {
        try {
          const response = await AdminApi.updateFoodtype(
            this.updatefoodtype,
            this.foodtype.foodtypeid
          );
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
      if (this.updatefoodtype.typename === "") {
        this.validatetext = "กรุณาใส่ชื่อประเภทอาหาร";
        this.validate = false;
      } else if (this.updatefoodtype.typename.length > 50) {
        this.validatetext = "ชื่อประเภทอาหารห้ามยาวกว่า 50 ตัวอักษร";
        this.validate = false;
      } else {
        this.validate = true;
      }
    },
    async deletefoodtype() {
      try {
        if (
          confirm(`ต้องการลบ ${this.foodtype.typename} ใช่หรือไม่ ?
การลบประเภทอาหารจะทำให้เมนูที่เป็นประเภทอาหารนี้โดนลบไปทั้งหมด`)
        ) {
          const response = await AdminApi.deleteFoodtype(this.foodtype.foodtypeid);
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
