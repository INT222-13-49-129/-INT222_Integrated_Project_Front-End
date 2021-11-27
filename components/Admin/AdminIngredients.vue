<template>
  <div class="flex flex-shrink-0 divide-x-4 text-center">
    <div class="w-1/12 py-1 flex-shrink-0 text-right px-2">
      {{ ingredients.ingredientsid }}
    </div>
    <div class="flex-1">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.ingredientsname }}
      </div>
      <div v-else class="bg-gray-100 h-full">
        <input
          v-model="updateingredients.ingredientsname"
          type="text"
          class="w-full focus:outline-none bg-gray-100 text-center py-1"
          @keyup="validate.from ? '' : validateFrom()"
        />
        <div
          v-if="!validate.ingredientsname && !validate.from"
          class="text-xs text-red-600 bg-gray-100 px-3 text-left"
        >
          *{{ validatetext.ingredientsname }}
        </div>
      </div>
    </div>
    <div class="w-1/7">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.unit }}
      </div>
      <div v-else class="bg-gray-100 h-full">
        <input
          v-model="updateingredients.unit"
          type="text"
          class="w-full focus:outline-none text-center bg-gray-100 py-1"
          @keyup="validate.from ? '' : validateFrom()"
        />
        <div
          v-if="!validate.unit && !validate.from"
          class="text-xs text-red-600 bg-gray-100 px-3 text-left"
        >
          *{{ validatetext.unit }}
        </div>
      </div>
    </div>
    <div class="w-1/7">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.kcalpunit }}
      </div>
      <div v-else class="bg-gray-100 h-full">
        <input
          v-model="updateingredients.kcalpunit"
          type="number"
          step="1"
          class="w-full focus:outline-none text-center bg-gray-100 py-1"
          @keyup="validate.from ? '' : validateFrom()"
        />
        <div
          v-if="!validate.kcalpunit && !validate.from"
          class="text-xs text-red-600 bg-gray-100 px-3 text-left"
        >
          *{{ validatetext.kcalpunit }}
        </div>
      </div>
    </div>
    <div class="w-1/5">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.descriptionunit }}
      </div>
      <div v-else class="bg-gray-100 h-full flex flex-col justify-center">
        <textarea
          v-model="updateingredients.descriptionunit"
          type="text"
          class="w-full focus:outline-none text-center bg-gray-100 h-6"
          @keyup="validate.from ? '' : validateFrom()"
        ></textarea>
        <div
          v-if="!validate.descriptionunit && !validate.from"
          class="text-xs text-red-600 bg-gray-100 px-3 text-left"
        >
          *{{ validatetext.descriptionunit }}
        </div>
      </div>
    </div>
    <div class="w-1/6">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.ingredientstype }}
      </div>
      <div v-else class="bg-gray-100 h-full flex flex-col justify-center">
        <select
          v-model="updateingredients.ingredientstype"
          class="w-full focus:outline-none text-center bg-gray-100 pl-3.5"
          @change="validate.from ? '' : validateFrom()"
        >
          <option v-for="i in ingredientstypeArray" :key="i" :value="i">{{ i }}</option>
        </select>
        <div
          v-if="!validate.ingredientstype && !validate.from"
          class="text-xs text-red-600 bg-gray-100 px-3 text-left"
        >
          *{{ validatetext.ingredientstype }}
        </div>
      </div>
    </div>
    <div class="w-1/12 py-1 flex-shrink-0 text-gray-400 relative">
      <i
        class="material-icons text-xl absolute left-5 cursor-pointer"
        @click="edit = !edit"
      >
        {{ edit ? "close" : "edit" }}
      </i>
      <i
        class="material-icons text-xl absolute right-5 cursor-pointer"
        @click="edit ? submitFrom() : deleteingredients()"
      >
        {{ edit ? "save" : "delete" }}
      </i>
    </div>
  </div>
</template>
<script>
import * as GeneralApi from "../../utils/generalApi";
import * as AdminApi from "../../utils/adminApi";

export default {
  props: {
    ingredients: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      ingredientstypeArray: [],
      edit: false,
      updateingredients: {
        ingredientsid: this.ingredients.ingredientsid,
        ingredientsname: this.ingredients.ingredientsname,
        kcalpunit: this.ingredients.kcalpunit,
        unit: this.ingredients.unit,
        descriptionunit: this.ingredients.descriptionunit,
        ingredientstype: this.ingredients.ingredientstype,
      },
      validate: {
        ingredientsname: false,
        kcalpunit: false,
        unit: false,
        descriptionunit: false,
        ingredientstype: false,
        from: true,
      },
      validatetext: {
        ingredientsname: "",
        kcalpunit: "",
        unit: "",
        descriptionunit: "",
        ingredientstype: "",
      },
    };
  },
  watch: {
    edit: function editchange() {
      this.updateingredients = {
        ingredientsid: this.ingredients.ingredientsid,
        ingredientsname: this.ingredients.ingredientsname,
        kcalpunit: this.ingredients.kcalpunit,
        unit: this.ingredients.unit,
        descriptionunit: this.ingredients.descriptionunit,
        ingredientstype: this.ingredients.ingredientstype,
      };
    },
  },
  async mounted() {
    const ingredientstyperesponse = await GeneralApi.ingredientsType();
    this.ingredientstypeArray = ingredientstyperesponse.data;
  },
  methods: {
    async submitFrom() {
      this.validateFrom();
      if (this.validate) {
        try {
          const response = await AdminApi.updateIngredients(
            this.updateingredients,
            this.ingredients.ingredientsid
          );
          if (response.data) {
            location.reload();
          }
        } catch (err) {
          this.validate.from = false;
          const status = err.response?.data?.status;

          if (status === 6002) {
            this.validatetext.ingredientsname = "ชื่อวัตถุดิบนี้มีอยู่แล้วในระบบ";
            this.validate.ingredientsname = false;
          }

          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            alert("ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่");
          }
        }
      }
    },
    validateFrom() {
      if (this.updateingredients.ingredientsname === "") {
        this.validatetext.ingredientsname = "กรุณาใส่ชื่อวัตถุดิบ";
        this.validate.ingredientsname = false;
      } else if (this.updateingredients.ingredientsname.length > 50) {
        this.validatetext.ingredientsname = "ชื่อวัตถุดิบห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.ingredientsname = false;
      } else {
        this.validate.ingredientsname = true;
      }

      if (this.updateingredients.kcalpunit === "") {
        this.validatetext.kcalpunit = "กรุณาใส่แคลอรี่ต่อหน่วย";
        this.validate.kcalpunit = false;
      } else if (this.updateingredients.kcalpunit <= 0) {
        this.validatetext.kcalpunit = "แคลอรี่ต้องมากกว่า 0";
        this.validate.kcalpunit = false;
      } else if (this.updateingredients.kcalpunit >= 1000) {
        this.validatetext.kcalpunit = "แคลอรี่ต้องน้อยกว่า 1000";
        this.validate.kcalpunit = false;
      } else {
        this.updateingredients.kcalpunit = parseInt(this.updateingredients.kcalpunit);
        this.validate.kcalpunit = true;
      }

      if (this.updateingredients.unit === "") {
        this.validatetext.unit = "กรุณาใส่หน่วย";
        this.validate.unit = false;
      } else if (this.updateingredients.unit.length > 50) {
        this.validatetext.unit = "ชื่อหน่วยห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.unit = false;
      } else {
        this.validate.unit = true;
      }

      if (this.updateingredients.descriptionunit === "") {
        this.validatetext.descriptionunit = "กรุณาใส่คำอธิบายหน่วย";
        this.validate.descriptionunit = false;
      } else if (this.updateingredients.descriptionunit.length > 255) {
        this.validatetext.descriptionunit = "คำอธิบายหน่วยห้ามยาวกว่า 255 ตัวอักษร";
        this.validate.descriptionunit = false;
      } else {
        this.validate.descriptionunit = true;
      }

      if (this.updateingredients.ingredientstype === null) {
        this.validatetext.ingredientstype = "กรุณาเลือกประเภทวัตถุดิบ";
        this.validate.ingredientstype = false;
      } else {
        this.validate.ingredientstype = true;
      }

      this.validate.from = true;
      Object.values(this.validate).forEach((v) => {
        this.validate.from = v && this.validate.from;
      });
    },
    async deleteingredients() {
      try {
        if (
          confirm(`ต้องการลบ ${this.ingredients.ingredientsname} ใช่หรือไม่ ?
การลบวัตถุดิบจะทำให้เมนูที่มีวัตถุดิบนี้เปลี่ยนค่าไป`)
        ) {
          const response = await AdminApi.deleteIngredients(this.ingredients.ingredientsid);
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
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
