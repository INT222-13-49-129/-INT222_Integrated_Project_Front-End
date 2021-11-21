<template>
  <div
    class="xl:w-full w-10/12 mx-auto xl:mx-0 xl:my-0 my-6 flex flex-col items-center xl:px-20"
  >
    <div v-if="confirm">
      <Modal
        classpop="flex flex-col text-center bg-white border-2 border-red-600 xl:w-128 w-11/12 rounded-xl fixed"
      >
        <div class="py-4 mt-4">
          <div class="text-xl">ลบบัญชีโดยถาวร</div>
          <div class="text-lg mt-2 mb-3 px-3">
            คุณยืนยันการลบบัญชี
            <span class="text-red-600">{{ user.username }}</span> โดยถาวรใช่หรือไม่ ?
          </div>
          <div
            class="py-5 px-2 mb-2 flex xl:flex-row flex-col-reverse items-center justify-center gap-x-6 gap-y-4"
          >
            <div
              class="xl:w-4/12 w-9/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
              @click="confirm = false"
            >
              ยกเลิก
            </div>
            <div
              class="xl:w-4/12 w-9/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
              @click="deleteConfirm()"
            >
              ลบบัญชี
            </div>
          </div>
        </div>
      </Modal>
    </div>
    <div class="w-full xl:mt-6 mt-4">
      <div>
        <div class="text-2xl text-red-600">ลบบัญชีโดยถาวร</div>
        <div class="mt-2">
          เมื่อขั้นตอนการลบเริ่มขึ้นแล้ว คุณจะไม่สามารถเปิดใช้งานบัญชีของคุณได้อีกต่อไป
          และไม่สามารถเรียกคืนเนื้อหาหรือข้อมูลใด ๆ ที่คุณเพิ่มไว้ได้
        </div>
      </div>
      <form class="text-gray-500 mt-4" @submit.prevent="submitFrom()">
        <div class="mt-4">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="userdelete.username"
            required
            class="border-2 rounded-md h-10 w-full block mt-2 px-3"
            @keyup="validate.from ? '' : validateFrom()"
          />
          <span
            v-if="!validate.username && !validate.from"
            class="text-red-600 text-xs font-thin mt-1"
            >*{{ validatetext.username }}</span
          >
        </div>
        <div class="mt-4">
          <label for="email">Email Address</label>
          <input
            id="email"
            v-model="userdelete.email"
            required
            type="email"
            class="border-2 rounded-md h-10 w-full block mt-2 px-3"
            @keyup="validate.from ? '' : validateFrom()"
          />
          <span
            v-if="!validate.email && !validate.from"
            class="text-red-600 text-xs font-thin mt-1"
            >*{{ validatetext.email }}</span
          >
        </div>
        <div class="mt-4">
          <label for="password">Password</label>
          <div class="relative min-w-min">
            <span
              class="material-icons absolute top-2 right-2 cursor-pointer text-gray-400"
              @click="showpass = !showpass"
              >{{ showpass ? "visibility_off" : "visibility" }}</span
            >
            <input
              id="password"
              v-model="userdelete.password"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
              :type="showpass ? 'password' : 'text'"
              @keyup="validate.from ? '' : validateFrom()"
            />
          </div>
          <span
            v-if="!validate.password && !validate.from"
            class="text-red-600 text-xs font-thin mt-1"
            >*{{ validatetext.password }}</span
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
            ลบบัญชี
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Modal from "../components/Modal.vue";
import * as UserApi from "../utils/userApi";

export default {
  component: {
    Modal,
  },
  data() {
    return {
      confirm: false,
      user: this.$auth.user,
      showpass: true,
      userdelete: {
        userid: this.$auth.user.userid,
        username: "",
        email: "",
        password: "",
      },
      validatetext: {
        username: "",
        email: "",
        password: "",
        all: "",
      },
      validate: {
        username: false,
        email: false,
        password: false,
        all: false,
        from: true,
      },
    };
  },
  methods: {
    async deleteConfirm() {
      this.validateFrom();
      if (this.validate.from) {
        try {
          const response = await UserApi.deleteUser(this.userdelete);
          if (response.data.success) {
            this.$auth.logout();
            this.$router.replace("/");
          }
        } catch (err) {
          this.confirm = false;
          this.validate.from = false;
          const status = err.response?.data?.status;
          if (status === 2008) {
            this.validatetext.all = "ข้อมูล ID ผู้ใช้ไม่ถูกต้อง";
            this.validate.all = false;
          }
          if (status === 2009) {
            this.validatetext.email = "Email ไม่ถูกต้อง";
            this.validate.email = false;
          }
          if (status === 2010) {
            this.validatetext.username = "Username ไม่ถูกต้อง";
            this.validate.username = false;
          }
          if (status === 2005) {
            this.validatetext.password = "Password ไม่ถูกต้อง";
            this.validate.password = false;
          }
          if (status === 3003) {
            this.validatetext.all = "ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่";
            this.validate.all = false;
          }
          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            this.validatetext.all = "ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่";
            this.validate.all = false;
          }
        }
      } else {
        this.confirm = false;
      }
    },
    submitFrom() {
      this.validateFrom();
      if (this.validate.from) {
        this.confirm = true;
      }
    },
    validateFrom() {
      if (this.userdelete.username === "") {
        this.validatetext.username = "กรุณาใส่ Username ";
        this.validate.username = false;
      } else if (!/^[a-zA-Z0-9]+$/.test(this.userdelete.username)) {
        this.validatetext.username = "ใส่ค่าได้เฉพาะ A-Z,a-z และตัวเลข";
        this.validate.username = false;
      } else if (this.userdelete.username.length > 50) {
        this.validatetext.username = "Username ห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.username = false;
      } else {
        this.validate.username = true;
      }

      if (this.userdelete.email === "") {
        this.validatetext.email = "กรุณาใส่ Email ";
        this.validate.email = false;
      } else if (!this.validateEmail(this.userdelete.email)) {
        this.validatetext.email = "กรุณาใส่ Email ให้ถูกต้อง";
        this.validate.email = false;
      } else if (this.userdelete.email.length > 50) {
        this.validatetext.email = "Email ห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.email = false;
      } else {
        this.validate.email = true;
      }

      if (this.userdelete.password === "") {
        this.validatetext.password = "กรุณาใส่ Password";
        this.validate.password = false;
      } else if (this.userdelete.password.length < 6) {
        this.validatetext.password = "Password ต้องยาวกว่า 6 ตัวอักษร";
        this.validate.password = false;
      } else {
        this.validate.password = true;
      }

      this.validate.all = true;
      this.validate.from = true;
      Object.values(this.validate).forEach((v) => {
        this.validate.from = v && this.validate.from;
      });
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>
