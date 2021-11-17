<template>
  <div
    class="xl:w-full w-10/12 mx-auto xl:mx-0 xl:my-0 my-6 flex flex-col items-center xl:px-20"
  >
    <div v-if="loading">
      <Modal
        classpop="flex flex-col justify-center text-center xl:py-12 py-6 bg-opacity-95 bg-gray-100  rounded-xl fixed xl:px-16 px-10"
      >
        <img src="../assets/img/loading.svg" class="xl:h-32 h-20" />
        <div class="xl:text-3xl text-xl xl:mt-5 mt-2">กำลังตรวจสอบข้อมูล</div>
      </Modal>
    </div>
    <div v-if="edit" class="w-full xl:mt-6 mt-4">
      <div class="text-gray-500">Email Address : {{ user.email }}</div>
      <form class="text-gray-500 mt-4" @submit.prevent="submitFrom()">
        <div>
          <label for="email">New Email Address</label>
          <input
            id="email"
            v-model="useremail.email"
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
              v-model="useremail.password"
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
            Send Email
          </button>
        </div>
      </form>
    </div>
    <div v-else class="w-full text-gray-500 xl:text-xl text-base">
      <div>Email Address : {{ emailpin.email }}</div>
      <div class="my-4 xl:text-base text-sm text-gray-400">
        Enter the confirmation code sent to email and click button to complete the
        process.
      </div>
      <div class="mt-6">OTP Verification code</div>
      <div class="flex justify-center">
        <OtpInput v-model="emailpin.pin" classtext="xl:w-14 w-8 xl:text-4xl text-2xl" />
      </div>
      <div v-if="!otp.validate" class="text-red-600 text-xs font-thin mt-1">
        *{{ otp.text }}
      </div>
      <div class="flex justify-end gap-x-4 mt-8">
        <button
          class="py-1.5 px-3 border-2 bg-gray-100 rounded text-gray-700 text-sm cursor-pointer xl:mb-0 mb-6"
          @click="edit = true"
        >
          แก้ไข Email
        </button>
        <button
          class="py-1.5 px-3 bg-orange rounded text-white text-sm cursor-pointer xl:mb-0 mb-6"
          @click="otpverify()"
        >
          ยืนยัน Email
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import * as UserApi from "../utils/userApi";
import Modal from "../components/Modal.vue";
import OtpInput from "../components/OtpInput.vue";

export default {
  components: {
    Modal,
    OtpInput,
  },
  data() {
    return {
      user: this.$auth.user,
      loading: false,
      edit: true,
      useremail: {
        userid: this.$auth.user.userid,
        email: "",
        password: "",
      },
      validatetext: {
        email: "",
        password: "",
        all: "",
      },
      validate: {
        email: false,
        password: false,
        all: false,
        from: true,
      },
      showpass: true,
      emailpin: {
        email: "",
        pin: "",
      },
      otp: {
        validate: true,
        text: "",
      },
    };
  },
  watch: {
    "emailpin.pin": function otpCheck() {
      if (!this.otp.validate) {
        this.otp.validate = this.emailpin.pin.length === 6;
        this.validatetext = "กรุณาใส่ค่าให้ครบ";
      }
    },
  },
  methods: {
    async submitFrom() {
      this.validateFrom();
      if (this.validate.from) {
        try {
          this.loading = true;
          const response = await UserApi.updateUserEmail(this.useremail);
          this.loading = false;
          if (response.data) {
            this.emailpin.email = response.data.email;
            this.edit = false;
          }
        } catch (err) {
          this.loading = false;
          this.validate.from = false;
          const status = err.response?.data?.status;
          if (status === 2008) {
            this.validatetext.all = "ข้อมูล ID ผู้ใช้ไม่ถูกต้อง";
            this.validate.all = false;
          }
          if (status === 2002) {
            this.validatetext.email = "Email นี้มีอยู่แล้วในระบบ";
            this.validate.email = false;
          }
          if (status === 2005) {
            this.validatetext.password = "Password ไม่ถูกต้อง";
            this.validate.password = false;
          }
          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            this.validatetext.all = "ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่";
            this.validate.all = false;
          }
        }
      }
    },
    validateFrom() {
      if (this.useremail.email === "") {
        this.validatetext.email = "กรุณาใส่ Email ";
        this.validate.email = false;
      } else if (!this.validateEmail(this.useremail.email)) {
        this.validatetext.email = "กรุณาใส่ Email ให้ถูกต้อง";
        this.validate.email = false;
      } else if (this.useremail.email.length > 50) {
        this.validatetext.email = "Email ห้ามยาวกว่า 50 ตัวอักษร";
        this.validate.email = false;
      } else {
        this.validate.email = true;
      }

      if (this.useremail.password === "") {
        this.validatetext.password = "กรุณาใส่ Password";
        this.validate.password = false;
      } else if (this.useremail.password.length < 6) {
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
    async otpverify() {
      if (this.emailpin.pin.length < 6) {
        this.otp.validate = false;
        this.otp.text = "กรุณาใส่ค่าให้ครบ";
      } else {
        try {
          const response = await UserApi.pinverify(this.emailpin);
          if (response.data) {
            this.$auth.setUser(response.data);
            this.$router.replace("/profile/setting");
          }
        } catch (err) {
          this.otp.validate = false;
          const status = err.response?.data?.status;
          if (status === 2004) {
            this.otp.text = "ไม่พบ Email นี้ในระบบ";
          }
          if (status === 9001) {
            this.otp.text = "ไม่พบรหัสยืนยันของ Email นี้ในระบบ";
          }
          if (status === 9003) {
            this.otp.text = "OTP ของ Email หมดอายุการใช้งานแล้ว";
          }
          if (status === 9002) {
            this.otp.text = "OTP ไม่ถูกต้อง";
          }
          if ([500, 400].includes(err.response?.status) || err.response === undefined) {
            this.otp.text = "ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่";
          }
        }
      }
    },
  },
};
</script>
