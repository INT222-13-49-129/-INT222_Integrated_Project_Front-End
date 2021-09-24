<template>
  <div class="w-screen h-screen fixed">
    <div class="flex flex-col item-center w-full h-full text-gray-600 overflow-scroll md:py-16">
      <div class="absolute md:top-5 top-3 left-5">
        <i
          class="material-icons md:text-5xl text-4xl text-gray-400 opacity-50 md:hover:animate-bouncexl cursor-pointer"
          @click="hasHistory()
          ? $router.go(-1)
          : $router.push('/')"
        >keyboard_backspace</i>
      </div>
      <div v-if="false"><OTP /></div>
      <div v-if="loading">
        <Modal
          classpop="flex flex-col justify-center text-center md:py-12 py-6 bg-opacity-95 bg-gray-100  rounded-xl fixed md:px-16 px-10"
        >
          <img src="../assets/img/loading.svg" class="md:h-32 h-20" />
          <div class="md:text-3xl text-xl md:mt-5 mt-2">กำลังตรวจสอบข้อมูล</div>
        </Modal>
      </div>
      <div
        class="mx-auto my-auto md:w-224 w-11/12 h-auto pb-10 bg-white from-white to-gray-200 shadow-lg rounded-xl text-center"
      >
        <div>
          <p class="md:text-4xl text-2xl font-bold text-lightorange pt-10 pb-3">Create An Account</p>
          <p class="md:text-lg text-sm">
            Create an account to enjoy all the services
            <br />without any ads for free!
          </p>
          <form @submit.prevent="submitFrom()">
            <div class="md:mt-8 mt-4 mx-10 md:mx-44 text-left text-xs md:text-base">
              <input
                id="email"
                v-model="regis.email"
                type="email"
                required
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="Email Address"
                @keyup="validate.from ? '' : validateFrom()"
              />
              <br />
              <span
                v-if="!validate.email && !validate.from"
                class="text-red-600 text-xs font-thin"
              >*{{ validatetext.email }}</span>
            </div>
            <div class="md:mt-3 mt-1 mx-10 md:mx-44 text-left text-xs md:text-base">
              <input
                id="username"
                v-model="regis.username"
                required
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="Username"
                @keyup="validate.from ? '' : validateFrom()"
              />
              <br />
              <span
                v-if="!validate.username && !validate.from"
                class="text-red-600 text-xs font-thin"
              >*{{ validatetext.username }}</span>
            </div>
            <div class="flex flex-row">
              <div
                class="flex-grow w-1/2 md:mt-3 mt-1 ml-10 md:ml-44 text-left text-xs md:text-base"
              >
                <input
                  id="firstname"
                  v-model="regis.firstname"
                  required
                  class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="Firstname"
                  @keyup="validate.from ? '' : validateFrom()"
                />
                <br />
                <span
                  v-if="!validate.firstname && !validate.from"
                  class="text-red-600 text-xs font-thin"
                >*{{ validatetext.firstname }}</span>
              </div>
              <div class="flex-shrink md:w-10 w-3">
                <!-- This item will shrink -->
              </div>
              <div
                class="flex-grow w-1/2 md:mt-3 mt-1 mr-10 md:mr-44 text-left text-xs md:text-base"
              >
                <input
                  id="lastname"
                  v-model="regis.lastname"
                  required
                  class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="Surname"
                  @keyup="validate.from ? '' : validateFrom()"
                />
                <br />
                <span
                  v-if="!validate.lastname && !validate.from"
                  class="text-red-600 text-xs font-thin"
                >*{{ validatetext.lastname }}</span>
              </div>
            </div>
            <div class="md:mt-3 mt-1 mx-10 md:mx-44 text-left text-xs md:text-base">
              <div class="relative min-w-min">
                <span
                  class="material-icons absolute md:top-3 top-1 right-2 cursor-pointer text-gray-400"
                  @click="showpass = !showpass"
                >{{ showpass ? 'visibility_off' : 'visibility' }}</span>
                <input
                  id="password"
                  v-model="regis.password"
                  required
                  class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="Password"
                  :type="showpass ? 'password' : 'text'"
                  @keyup="validate.from ? '' : validateFrom()"
                />
                <br />
                <span
                  v-if="!validate.password && !validate.from"
                  class="text-red-600 text-xs font-thin"
                >*{{ validatetext.password }}</span>
              </div>
            </div>
            <div class="md:mt-3 mt-1 mx-10 md:mx-44 text-left text-xs md:text-base">
              <div class="relative min-w-min">
                <span
                  class="material-icons absolute md:top-3 top-1 right-2 cursor-pointer text-gray-400"
                  @click="showpass = !showpass"
                >{{ showpass ? 'visibility_off' : 'visibility' }}</span>
                <input
                  id="recheckpass"
                  v-model="recheckpass"
                  required
                  class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="Again Password"
                  :type="showpass ? 'password' : 'text'"
                  @keyup="validate.from ? '' : validateFrom()"
                />
              </div>
              <span
                v-if="!validate.recheckpass && !validate.from"
                class="text-red-600 text-xs font-thin"
              >*{{ validatetext.recheckpass }}</span>
            </div>
            <div class="flex flex-row">
              <div
                class="flex-grow w-1/2 md:mt-3 mt-1 ml-10 md:ml-44 text-left text-xs md:text-base"
              >
                <select
                  id="gender"
                  v-model="regis.gender"
                  required
                  class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  @change="validate.from ? '' : validateFrom()"
                >
                  <option value disabled selected>เพศ</option>
                  <option value="M">ชาย</option>
                  <option value="F">หญิง</option>
                </select>
                <span
                  v-if="!validate.gender && !validate.from"
                  class="text-red-600 text-xs font-thin text-left"
                >*{{ validatetext.gender }}</span>
              </div>
              <div class="flex-shrink md:w-10 w-3">
                <!-- This item will shrink -->
              </div>
              <div
                class="flex-grow w-1/2 md:mt-3 mt-1 mr-10 md:mr-44 text-left text-xs md:text-base"
              >
                <input
                  id="doB"
                  v-model="regis.doB"
                  type="date"
                  required
                  :max="currentDate()"
                  class="rounded-md border-2 border-gray-100 text-gray-400 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="dd-mm-yyyy"
                  @change="validate.from ? '' : validateFrom()"
                />
                <span
                  v-if="!validate.doB && !validate.from"
                  class="text-red-600 text-xs font-thin"
                >*{{ validatetext.doB }}</span>
              </div>
            </div>

            <div class="flex flex-row">
              <div
                class="flex-grow w-1/2 md:mt-3 mt-1 ml-10 md:ml-44 text-left text-xs md:text-base"
              >
                <input
                  id="weight"
                  v-model="regis.weight"
                  type="number"
                  min="0.01"
                  max="999.99"
                  step="any"
                  required
                  class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="น้ำหนัก (กก.)"
                  @keyup="validate.from ? '' : validateFrom()"
                />
                <div class="flex flex-row-reverse flex-wrap-reverse justify-between mt-1 px-1">
                  <span class="md:mb-6 text-xs mt-1 text-right text-gray-400">ใส่ทศนิยมได้</span>
                  <span
                    v-if="!validate.weight && !validate.from"
                    class="text-red-600 text-xs font-thin mt-1"
                  >*{{ validatetext.weight }}</span>
                </div>
              </div>
              <div class="flex-shrink md:w-10 w-3"></div>
              <div
                class="flex-grow w-1/2 md:mt-3 mt-1 mr-10 md:mr-44 text-left text-xs md:text-base"
              >
                <input
                  id="height"
                  v-model="regis.height"
                  type="number"
                  min="0.01"
                  max="999.99"
                  step="any"
                  required
                  class="rounded-md border-2 border-gray-100 text-gray-400 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                  placeholder="ส่วนสูง (ซม.)"
                  @keyup="validate.from ? '' : validateFrom()"
                />
                <div class="flex flex-row-reverse flex-wrap-reverse justify-between mt-1 px-1">
                  <span class="md:mb-6 text-xs mt-1 text-right text-gray-400">ใส่ทศนิยมได้</span>
                  <span
                    v-if="!validate.height && !validate.from"
                    class="text-red-600 text-xs font-thin mt-1"
                  >*{{ validatetext.height }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="!validate.all && !validate.from"
              class="text-red-600 text-xs font-thin mx-10 md:mx-44 text-left -mb-2"
            >*{{ validatetext.all }}</div>
            <button
              type="submit"
              class="mx-auto mt-8 md:mb-6 md:px-14 w-3/6 md:w-auto py-1.5 md:text-xl text-base rounded-lg text-white bg-brightsalmon"
            >Create Account</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as AuthApi from '../utils/authApi'
import Modal from '../components/Modal.vue';
import OTP from '../components/OTP.vue';
export default {
  components: {
    Modal,
    OTP
  },
  layout: 'signinbg',
  middleware: ['guest'],
  data() {
    return {
      loading: false,
      showpass: true,
      recheckpass: '',
      regis: {
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        doB: '2000-01-01',
        gender: '',
        weight: '',
        height: '',
        repeat: false
      },
      validate: {
        username: false,
        email: false,
        password: false,
        recheckpass: false,
        firstname: false,
        lastname: false,
        doB: false,
        gender: false,
        weight: false,
        height: false,
        all: false,
        from: true,
      },
      validatetext: {
        username: '',
        email: '',
        password: '',
        recheckpass: '',
        firstname: '',
        lastname: '',
        doB: '',
        gender: '',
        weight: '',
        height: '',
        all: ''
      }
    };
  },
  methods: {
    hasHistory() {
      return window.history.length > 2
    },
    currentDate() {
      const current = new Date();
      let dd = current.getDate();
      let mm = current.getMonth() + 1;
      const yyyy = current.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }

      const date = yyyy + '-' + mm + '-' + dd;
      return date;
    },
    async submitFrom() {
      this.regis.weight = parseFloat(this.regis.weight).toFixed(2)
      this.regis.height = parseFloat(this.regis.height).toFixed(2)
      this.validateFrom()
      if (this.validate.from) {
        try {
          this.loading = true
          const response = await AuthApi.register(this.regis)
          this.loading = false
          console.log(response.data);
        } catch (err) {
          this.loading = false
          this.validate.from = false
          const status = err.response?.data?.status
          if (status === 2012) {
            this.validatetext.email = 'Email นี้อยู่ระหว่างการยืนยัน'
            this.validate.email = false
          }
          if (status === 2002) {
            this.validatetext.email = 'Email นี้มีอยู่แล้วในระบบ'
            this.validate.email = false
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
      if (this.regis.email === '') {
        this.validatetext.email = 'กรุณาใส่ Email '
        this.validate.email = false
      } else if (!this.validateEmail(this.regis.email)) {
        this.validatetext.email = 'กรุณาใส่ Email ให้ถูกต้อง'
        this.validate.email = false
      } else {
        this.validate.email = true
      }

      if (this.regis.username === '') {
        this.validatetext.username = 'กรุณาใส่ Username '
        this.validate.username = false
      } else if (!/^[a-zA-Z0-9]+$/.test(this.regis.username)) {
        this.validatetext.username = 'ใส่ค่าได้เฉพาะ A-Z,a-z และตัวเลข'
        this.validate.username = false
      } else {
        this.validate.username = true
      }

      if (this.regis.password === '') {
        this.validatetext.password = 'กรุณาใส่ Password'
        this.validate.password = false
      } else if (this.regis.password.length < 6) {
        this.validatetext.password = 'Password ต้องยาวกว่า 6 ตัวอักษร'
        this.validate.password = false
      } else {
        this.validate.password = true
      }

      if (this.recheckpass === '') {
        this.validatetext.recheckpass = 'กรุณายืนยัน Password  '
        this.validate.recheckpass = false
      } else if (this.recheckpass !== this.regis.password) {
        this.validatetext.recheckpass = 'Password ไม่ตรงกัน'
        this.validate.recheckpass = false
      } else {
        this.validate.recheckpass = true
      }

      if (this.regis.firstname === '') {
        this.validatetext.firstname = 'กรุณาใส่ Firstname '
        this.validate.firstname = false
      } else {
        this.validate.firstname = true
      }

      if (this.regis.lastname === '') {
        this.validatetext.lastname = 'กรุณาใส่ Surname '
        this.validate.lastname = false
      } else {
        this.validate.lastname = true
      }

      if (this.regis.doB === '') {
        this.validatetext.doB = 'กรุณาใส่วันเกิด '
        this.validate.doB = false
      } else if (+new Date(this.regis.doB) > +new Date(this.currentDate())) {
        this.validatetext.doB = 'ค่าต้องน้อยกว่าวันที่ปัจจุบัน'
        this.validate.doB = false
      } else {
        this.validate.doB = true
      }

      if (this.regis.gender === '') {
        this.validatetext.gender = 'กรุณาเลือกเพศ '
        this.validate.gender = false
      } else {
        this.validate.gender = true
      }

      if (this.regis.weight === '') {
        this.validatetext.weight = 'กรุณาใส่น้ำหนัก '
        this.validate.weight = false
      } else if (this.regis.weight < 0) {
        this.validatetext.weight = 'ค่าต้องมากกว่า 0'
        this.validate.weight = false
      } else if (this.regis.weight >= 1000) {
        this.validatetext.weight = 'ค่าต้องน้อยกว่า 1000'
        this.validate.weight = false
      } else {
        this.validate.weight = true
      }

      if (this.regis.height === '') {
        this.validatetext.height = 'กรุณาใส่ส่วนสูง '
        this.validate.height = false
      } else if (this.regis.height < 0) {
        this.validatetext.height = 'ค่าต้องมากกว่า 0'
        this.validate.height = false
      } else if (this.regis.height >= 1000) {
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
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
}
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
