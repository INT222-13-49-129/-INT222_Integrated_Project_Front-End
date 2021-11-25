<template>
  <div class="flex flex-col w-288 mx-8 border-4 divide-y-2">
    <div class="flex divide-x-4 text-center">
      <div class="w-1/12 py-1 flex-shrink-0">Id</div>
      <div class="flex-grow py-1">Ingredients name</div>
      <div class="w-1/7 py-1">Unit</div>
      <div class="w-1/7 py-1">kcal. per unit</div>
      <div class="w-1/5 py-1">Description unit</div>
      <div class="w-1/6 py-1">Ingredients type</div>
      <div class="w-1/12 py-1 flex-shrink-0">Action</div>
    </div>
    <div class="flex divide-x-4 text-center">
      <div class="w-1/12 py-1 flex-shrink-0 text-gray-500">Auto</div>
      <div class="flex-grow">
        <div class="bg-gray-100 h-full">
          <input
            v-model="newingredients.ingredientsname"
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
        <div class="bg-gray-100 h-full">
          <input
            v-model="newingredients.unit"
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
        <div class="bg-gray-100 h-full">
          <input
            v-model="newingredients.kcalpunit"
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
        <div class="bg-gray-100 h-full flex flex-col justify-center">
          <textarea
            v-model="newingredients.descriptionunit"
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
        <div class="bg-gray-100 h-full flex flex-col justify-center">
          <select
            v-model="newingredients.ingredientstype"
            class="w-full focus:outline-none text-center bg-gray-100 pl-3.5"
            @change="validate.from ? '' : validateFrom()"
          > 
            <option :value="null" disabled selected></option>
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
      <div
        class="w-1/12 py-1 flex-shrink-0 flex justify-center items-center text-gray-400 relative"
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
import * as GeneralApi from "../../utils/generalApi";
import * as AdminApi from "../../utils/adminApi";

export default {
  data() {
    return {
      ingredientstypeArray: [],
      newingredients: {
        ingredientsname: "",
        kcalpunit: "",
        unit: "",
        descriptionunit: "",
        ingredientstype: null,
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
  async mounted() {
    const ingredientstyperesponse = await GeneralApi.ingredientsType();
    this.ingredientstypeArray = ingredientstyperesponse.data;
  },
  methods: {
    async submitFrom() {
      this.validateFrom();
      if (this.validate.from) {
        try {
          const response = await AdminApi.createIngredients(this.newingredients);
          if (response.data) {
            location.reload();
          }
        } catch (err) {
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
      if (this.newingredients.ingredientsname === "") {
        this.validatetext.ingredientsname = "กรุณาใส่ชื่อวัตถุดิบ";
        this.validate.ingredientsname = false;
      } else if (this.newingredients.ingredientsname.length > 50) {
        this.validatetext.ingredientsname = "ชื่อวัตถุดิบห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.ingredientsname = false;
      } else {
        this.validate.ingredientsname = true;
      }

      if (this.newingredients.kcalpunit === "") {
        this.validatetext.kcalpunit = "กรุณาใส่แคลอรี่ต่อหน่วย";
        this.validate.kcalpunit = false;
      } else if (this.newingredients.kcalpunit <= 0) {
        this.validatetext.kcalpunit = "แคลอรี่ต้องมากกว่า 0";
        this.validate.kcalpunit = false;
      } else if (this.newingredients.kcalpunit >= 1000) {
        this.validatetext.kcalpunit = "แคลอรี่ต้องน้อยกว่า 1000";
        this.validate.kcalpunit = false;
      } else {
        this.newingredients.kcalpunit = parseInt(this.newingredients.kcalpunit);
        this.validate.kcalpunit = true;
      }

      if (this.newingredients.unit === "") {
        this.validatetext.unit = "กรุณาใส่หน่วย";
        this.validate.unit = false;
      } else if (this.newingredients.unit.length > 50) {
        this.validatetext.unit = "ชื่อหน่วยห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.unit = false;
      } else {
        this.validate.unit = true;
      }

      if (this.newingredients.descriptionunit === "") {
        this.validatetext.descriptionunit = "กรุณาใส่คำอธิบายหน่วย";
        this.validate.descriptionunit = false;
      } else if (this.newingredients.descriptionunit.length > 255) {
        this.validatetext.descriptionunit = "คำอธิบายหน่วยห้ามยาวกว่า 255 ตัวอักษร";
        this.validate.descriptionunit = false;
      } else {
        this.validate.descriptionunit = true;
      }

      if (this.newingredients.ingredientstype === null) {
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
  },
};
</script>
