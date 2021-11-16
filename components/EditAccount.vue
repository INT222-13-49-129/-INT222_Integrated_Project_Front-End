<template>
  <div
    class="xl:w-full w-10/12 mx-auto xl:mx-0 xl:my-0 my-6 flex flex-col items-center xl:px-20"
  >
    <client-only>
      <UserImg class="xl:h-28 xl:w-28 w-24 h-24" />
    </client-only>
    <div class="w-full xl:mt-6 mt-4">
      <form class="text-gray-500" @submit.prevent="submitFrom()">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="userupdate.username"
          required
          class="border-2 rounded-md h-10 w-full block mt-2 px-3"
          @keyup="validate.from ? '' : validateFrom()"
        />
        <span
          v-if="!validate.username && !validate.from"
          class="text-red-600 text-xs font-thin mt-1"
          >*{{ validatetext.username }}</span
        >
        <div class="flex xl:flex-row flex-col gap-x-6 gap-y-2 xl:mt-4 mt-2">
          <div class="flex-1">
            <label for="firstname">Firstname</label>
            <input
              id="firstname"
              v-model="userupdate.firstname"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              @keyup="validate.from ? '' : validateFrom()"
            />
            <span
              v-if="!validate.firstname && !validate.from"
              class="text-red-600 text-xs font-thin mt-1"
              >*{{ validatetext.firstname }}</span
            >
          </div>
          <div class="flex-1">
            <label for="lastname">Lastname</label>
            <input
              id="lastname"
              v-model="userupdate.lastname"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              @keyup="validate.from ? '' : validateFrom()"
            />
            <span
              v-if="!validate.lastname && !validate.from"
              class="text-red-600 text-xs font-thin mt-1"
              >*{{ validatetext.lastname }}</span
            >
          </div>
        </div>
        <div class="flex xl:flex-row flex-col gap-x-6 gap-y-2 xl:mt-4 mt-2">
          <div class="flex-1">
            <label for="gender">Gender</label>
            <select
              id="gender"
              v-model="userupdate.gender"
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              @change="validate.from ? '' : validateFrom()"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <span
              v-if="!validate.gender && !validate.from"
              class="text-red-600 text-xs font-thin mt-1"
              >*{{ validatetext.gender }}</span
            >
          </div>
          <div class="flex-1">
            <label for="doB">Date of Birth</label>
            <input
              id="doB"
              v-model="userupdate.doB"
              type="date"
              required
              :max="currentDate()"
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              @change="validate.from ? '' : validateFrom()"
            />
            <span
              v-if="!validate.doB && !validate.from"
              class="text-red-600 text-xs font-thin mt-1"
              >*{{ validatetext.doB }}</span
            >
          </div>
        </div>
        <div class="flex xl:flex-row flex-col gap-x-6 gap-y-2 xl:mt-4 mt-2">
          <div class="flex-1">
            <label for="weight">Weight</label>
            <div class="flex items-center">
              <input
                id="weight"
                v-model="userupdate.weight"
                type="number"
                min="0.01"
                max="999.99"
                step="any"
                required
                class="border-2 rounded-md h-10 mt-2 px-3 flex-grow"
                @keyup="validate.from ? '' : validateFrom()"
              />
              <span class="ml-2">kg.</span>
            </div>
            <span
              v-if="!validate.weight && !validate.from"
              class="text-red-600 text-xs font-thin mt-1"
              >*{{ validatetext.weight }}</span
            >
          </div>
          <div class="flex-1">
            <label for="height">Height</label>
            <div class="flex items-center">
              <input
                id="height"
                v-model="userupdate.height"
                type="number"
                min="0.01"
                max="999.99"
                step="any"
                required
                class="border-2 rounded-md h-10 mt-2 px-3 flex-grow"
                @keyup="validate.from ? '' : validateFrom()"
              />
              <span class="ml-2">cm.</span>
            </div>
            <span
              v-if="!validate.height && !validate.from"
              class="text-red-600 text-xs font-thin mt-1"
              >*{{ validatetext.height }}</span
            >
          </div>
        </div>
        <div
              v-if="!validate.all && !validate.from"
              class="text-red-600 text-xs mt-4"
            >*{{ validatetext.all }}</div>
        <div class="flex justify-end xl:mt-6 mt-4">
          <button
            type="submit"
            class="py-1.5 px-3 bg-orange rounded text-white text-sm cursor-pointer xl:mb-0 mb-6"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as UserApi from '../utils/userApi'
import UserImg from "../components/UserImg.vue";

export default {
  components: {
    UserImg,
  },
  data() {
    return {
      user: this.$auth.user,
      userupdate: {
        userid: this.$auth.user.userid,
        username: this.$auth.user.username,
        firstname: this.$auth.user.firstname,
        lastname: this.$auth.user.lastname,
        doB: this.$auth.user.doB,
        gender: this.$auth.user.gender,
        weight: this.$auth.user.weight,
        height: this.$auth.user.height,
      },
      validatetext: {
        username: "",
        firstname: "",
        lastname: "",
        doB: "",
        gender: "",
        weight: "",
        height: "",
        all: "",
      },
      validate: {
        username: false,
        firstname: false,
        lastname: false,
        doB: false,
        gender: false,
        weight: false,
        height: false,
        all: false,
        from: true,
      },
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      let dd = current.getDate();
      let mm = current.getMonth() + 1;
      const yyyy = current.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      const date = yyyy + "-" + mm + "-" + dd;
      return date;
    },
    async submitFrom() {
        this.validateFrom()
        if (this.validate.from) {
        try {
          const response = await UserApi.updateUser(this.userupdate)
          if (response.data) {
            this.$auth.setUser(response.data)
            this.$router.replace('/profile/setting')
          }
        } catch (err) {
          this.validate.from = false
          const status = err.response?.data?.status
          if (status === 2008) {
            this.validatetext.all = 'ข้อมูล ID ผู้ใช้ไม่ถูกต้อง'
            this.validate.all = false
          }
          if (status === 2003) {
            this.validatetext.username = 'Username นี้มีอยู่แล้วในระบบ'
            this.validate.username = false
          }
          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            this.validatetext.all = 'ลงทะเบียนไม่สำเร็จกรุณาลองใหม่'
            this.validate.all = false
          }
        }
      }
    },
    validateFrom() {
      if (this.userupdate.username === '') {
        this.validatetext.username = 'กรุณาใส่ Username '
        this.validate.username = false
      } else if (!/^[a-zA-Z0-9]+$/.test(this.userupdate.username)) {
        this.validatetext.username = 'ใส่ค่าได้เฉพาะ A-Z,a-z และตัวเลข'
        this.validate.username = false
      } else if (this.userupdate.username.length > 50) {
        this.validatetext.username = 'Username ห้ามยาวกว่า 50 ตัวอักษร'
        this.validate.username = false
      } else {
        this.validate.username = true
      }

      if (this.userupdate.firstname === '') {
        this.validatetext.firstname = 'กรุณาใส่ Firstname '
        this.validate.firstname = false
      } else if (this.userupdate.firstname.length > 50) {
        this.validatetext.firstname = 'Firstname ห้ามยาวกว่า 50 ตัวอักษร'
        this.validate.firstname = false
      } else {
        this.validate.firstname = true
      }

      if (this.userupdate.lastname === '') {
        this.validatetext.lastname = 'กรุณาใส่ Lastname '
        this.validate.lastname = false
      } else if (this.userupdate.lastname.length > 50) {
        this.validatetext.lastname = 'Lastname ห้ามยาวกว่า 50 ตัวอักษร'
        this.validate.lastname = false
      } else {
        this.validate.lastname = true
      }

      if (this.userupdate.doB === '') {
        this.validatetext.doB = 'กรุณาใส่วันเกิด '
        this.validate.doB = false
      } else if (+new Date(this.userupdate.doB) > +new Date(this.currentDate())) {
        this.validatetext.doB = 'ค่าต้องน้อยกว่าวันที่ปัจจุบัน'
        this.validate.doB = false
      } else {
        this.validate.doB = true
      }

      if (this.userupdate.gender === '') {
        this.validatetext.gender = 'กรุณาเลือกเพศ '
        this.validate.gender = false
      } else {
        this.validate.gender = true
      }

      if (this.userupdate.weight === '') {
        this.validatetext.weight = 'กรุณาใส่น้ำหนัก '
        this.validate.weight = false
      } else if (this.userupdate.weight <= 0) {
        this.validatetext.weight = 'ค่าต้องมากกว่า 0'
        this.validate.weight = false
      } else if (this.userupdate.weight >= 1000) {
        this.validatetext.weight = 'ค่าต้องน้อยกว่า 1000'
        this.validate.weight = false
      } else {
        this.validate.weight = true
      }

      if (this.userupdate.height === '') {
        this.validatetext.height = 'กรุณาใส่ส่วนสูง '
        this.validate.height = false
      } else if (this.userupdate.height <= 0) {
        this.validatetext.height = 'ค่าต้องมากกว่า 0'
        this.validate.height = false
      } else if (this.userupdate.height >= 1000) {
        this.validatetext.height = 'ค่าต้องน้อยกว่า 1000'
        this.validate.height = false
      } else {
        this.validate.height = true
      }

      this.validate.all = true
      this.validate.from = true
      Object.values(this.validate).forEach(v => {
        this.validate.from = v && this.validate.from
      });
    },
  },
};
</script>
