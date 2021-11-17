<template>
  <div
    class="xl:w-full w-10/12 mx-auto xl:mx-0 xl:my-0 my-6 flex flex-col items-center xl:px-20"
  >
    <div class="w-full xl:mt-6 mt-4">
      <form class="text-gray-500" @submit.prevent="submitFrom()">
        <div>
          <label for="oldpassword">Password</label>
          <div class="relative min-w-min">
            <span
              class="material-icons absolute top-2 right-2 cursor-pointer text-gray-400"
              @click="showpass.old = !showpass.old"
              >{{ showpass.old ? "visibility_off" : "visibility" }}</span
            >
            <input
              id="oldpassword"
              v-model="userpsw.oldpassword"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              :type="showpass.old ? 'password' : 'text'"
              @keyup="validate.from ? '' : validateFrom()"
            />
          </div>
          <span
            v-if="!validate.oldpassword && !validate.from"
            class="text-red-600 text-xs font-thin mt-1"
            >*{{ validatetext.oldpassword }}</span
          >
        </div>
        <div class="mt-4">
          <label for="newpassword">New Password</label>
          <div class="relative min-w-min">
            <span
              class="material-icons absolute top-2 right-2 cursor-pointer text-gray-400"
              @click="showpass.new = !showpass.new"
              >{{ showpass.new ? "visibility_off" : "visibility" }}</span
            >
            <input
              id="newpassword"
              v-model="userpsw.newpassword"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              :type="showpass.new ? 'password' : 'text'"
              @keyup="validate.from ? '' : validateFrom()"
            />
          </div>
          <span
            v-if="!validate.newpassword && !validate.from"
            class="text-red-600 text-xs font-thin mt-1"
            >*{{ validatetext.newpassword }}</span
          >
        </div>
        <div class="mt-4">
          <label for="recheckpass">Again New Password</label>
          <div class="relative min-w-min">
            <span
              class="material-icons absolute top-2 right-2 cursor-pointer text-gray-400"
              @click="showpass.recheck = !showpass.recheck"
              >{{ showpass.recheck ? "visibility_off" : "visibility" }}</span
            >
            <input
              id="recheckpass"
              v-model="recheckpass"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              :type="showpass.recheck ? 'password' : 'text'"
              @keyup="validate.from ? '' : validateFrom()"
            />
          </div>
          <span
            v-if="!validate.recheckpass && !validate.from"
            class="text-red-600 text-xs font-thin mt-1"
            >*{{ validatetext.recheckpass }}</span
          >
        </div>
        <div v-if="!validate.all && !validate.from" class="text-red-600 text-xs mt-4">
          *{{ validatetext.all }}
        </div>
        <div class="flex justify-end mt-6">
          <button
            type="submit"
            class="py-1.5 px-3 bg-orange rounded text-white text-sm cursor-pointer xl:mb-0 mb-6"
          >
            Save Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as UserApi from '../utils/userApi'

export default {
  data() {
    return {
      user: this.$auth.user,
      userpsw: {
        userid: this.$auth.user.userid,
        oldpassword: "",
        newpassword: "",
      },
      recheckpass: "",
      validatetext: {
        oldpassword: "",
        newpassword: "",
        recheckpass: "",
        all: "",
      },
      validate: {
        oldpassword: false,
        newpassword: false,
        recheckpass: false,
        all: false,
        from: true,
      },
      showpass: {
        old: true,
        new: true,
        recheck: true,
      },
    };
  },
  methods: {
    async submitFrom() {
      this.validateFrom();
      if (this.validate.from) {
        try {
          const response = await UserApi.updateUserPassword(this.userpsw);
          if (response.data.success) {
            this.$router.replace("/profile/setting");
          }
        } catch (err) {
          this.validate.from = false;
          const status = err.response?.data?.status;
          if (status === 2008) {
            this.validatetext.all = "ข้อมูล ID ผู้ใช้ไม่ถูกต้อง";
            this.validate.all = false;
          }
          if (status === 2005) {
            this.validatetext.oldpassword = "Password ไม่ถูกต้อง";
            this.validate.oldpassword = false;
          }
          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            this.validatetext.all = "ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่";
            this.validate.all = false;
          }
        }
      }
    },
    validateFrom() {
      if (this.userpsw.oldpassword === "") {
        this.validatetext.oldpassword = "กรุณาใส่ Password ปัจจุบัน";
        this.validate.oldpassword = false;
      } else if (this.userpsw.oldpassword.length < 6) {
        this.validatetext.oldpassword = "Password ต้องยาวไม่น้อยกว่า 6 ตัวอักษร";
        this.validate.oldpassword = false;
      } else {
        this.validate.oldpassword = true;
      }

      if (this.userpsw.newpassword === "") {
        this.validatetext.newpassword = "กรุณาใส่ Password ใหม่";
        this.validate.newpassword = false;
      } else if (this.userpsw.newpassword.length < 6) {
        this.validatetext.newpassword = "Password ต้องยาวไม่น้อยกว่า 6 ตัวอักษร";
        this.validate.newpassword = false;
      } else {
        this.validate.newpassword = true;
      }

      if (this.recheckpass === "") {
        this.validatetext.recheckpass = "กรุณายืนยัน Password  ";
        this.validate.recheckpass = false;
      } else if (this.recheckpass !== this.userpsw.newpassword) {
        this.validatetext.recheckpass = "Password ไม่ตรงกัน";
        this.validate.recheckpass = false;
      } else {
        this.validate.recheckpass = true;
      }

      this.validate.all = true;
      this.validate.from = true;
      Object.values(this.validate).forEach((v) => {
        this.validate.from = v && this.validate.from;
      });
    },
  },
};
</script>
