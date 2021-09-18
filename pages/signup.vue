<template>

  <div class="flex flex-col justify-center item-center w-full h-full text-gray-600 md:my-28 ">
    <div class="absolute md:top-5 top-3 left-5 ">
      <i class="material-icons md:text-5xl text-4xl text-gray-400 opacity-50 md:hover:animate-bouncexl cursor-pointer"
        @click="hasHistory()
        ? $router.go(-1)
        : $router.push('/')">keyboard_backspace</i>
    </div>
    <div class="mx-auto md:w-224 w-11/12 h-auto pb-10 bg-white from-white to-gray-200 shadow-lg rounded-xl text-center">
      <div>
        <p class="md:text-4xl text-2xl font-bold text-lightorange md:pt-20 pt-10 pb-3">Create An Account</p>
        <p class="md:text-lg text-sm">
          Create an account to enjoy all the services
          <br />without any ads for free!
        </p>
        <form>
          <div class="md:mt-8 mt-4 mx-10 md:mx-44 text-left text-xs md:text-base ">
            <input id="email" type="email"
              class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1 "
              placeholder="Email Address" />
            <br />
            <span v-if="true" class="text-red-600 text-xs font-thin">* เคยมีการลงทะเบียนกับอีเมลนี้แล้ว</span>
          </div>
          <div class="md:mt-3 mt-1 mx-10 md:mx-44 text-left text-xs md:text-base">
            <input id="username"
              class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
              placeholder="Username" />
            <br />
            <span v-if="true" class="text-red-600 text-xs font-thin">* มีผู้ใช้ชื่อนี้แล้ว</span>
          </div>
          <div class="flex flex-row">
            <div class="flex-grow w-1/2 md:mt-3 mt-1 ml-10 md:ml-44 text-left text-xs md:text-base">
              <input id="firstname"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="Firstname" />
              <br />
              <span v-if="true" class="text-red-600 text-xs font-thin">* มีผู้ใช้ชื่อนี้แล้ว</span>
            </div>
            <div class="flex-shrink md:w-10 w-3 ">
              <!-- This item will shrink -->
            </div>
            <div class="flex-grow w-1/2 md:mt-3 mt-1 mr-10 md:mr-44 text-left text-xs md:text-base">
              <input id="surname"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="Surname" /><br />
              <span v-if="true" class="text-red-600 text-xs font-thin">* มีผู้ใช้ชื่อนี้แล้ว</span>
            </div>
          </div>
          <div class="md:mt-3 mt-1 mx-10 md:mx-44 text-left text-xs md:text-base">
            <div class="relative min-w-min">
              <span class="material-icons absolute md:top-5 top-2 right-2 cursor-pointer text-gray-400"
                @click="showpass = !showpass">{{ showpass ? 'visibility' : 'visibility_off' }}</span>
              <input id="password"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="Password" :type="showpass ? 'password' : 'text'" /> <br />
              <span v-if="true" class="text-red-600 text-xs font-thin">* รหัสผ่านยังไม่มีอักขระพิเศษ</span>
            </div>
          </div>
          <div class="md:mt-3 mt-1 mx-10 md:mx-44 text-left text-xs md:text-base">
            <div class="relative min-w-min">
              <span class="material-icons absolute md:top-5 top-2 right-2 cursor-pointer text-gray-400"
                @click="showpass = !showpass">{{ showpass ? 'visibility' : 'visibility_off' }}</span>
              <input id="password"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="Again Password" :type="showpass ? 'password' : 'text'" />
            </div>
            <span v-if="true" class="text-red-600 text-xs font-thin">* รหัสผ่านไม่เหมือนเดิม</span>
          </div>
          <div class="flex flex-row">
            <div class="flex-grow w-1/2 md:mt-3 mt-1 ml-10 md:ml-44 text-left text-xs md:text-base">
              <input id="gender" type="sex"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="เพศ" />
              <span v-if="true" class="text-red-600 text-xs font-thin text-left">* กรุณาเลือกเพศ</span>
            </div>
            <div class="flex-shrink md:w-10 w-3 ">
              <!-- This item will shrink -->
            </div>
            <div class="flex-grow w-1/2 md:mt-3 mt-1 mr-10 md:mr-44 text-left text-xs md:text-base">
              <input id="ิbirthday" type="date"
                class="rounded-md border-2 border-gray-100 text-gray-400 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="dd-mm-yyyy" />
              <span v-if="true" class="text-red-600 text-xs font-thin">* วันนี้ยังมาไม่ถึง</span>
            </div>
          </div>

          <div class="flex flex-row">
            <div class="flex-grow w-1/2 md:mt-3 mt-1 ml-10 md:ml-44 text-left text-xs md:text-base">
              <input id="gender" type="number"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="น้ำหนัก (กก.)" />
              <span v-if="true" class="text-red-600 text-xs font-thin text-left">* กรุณาเลือกเพศ</span>
              <p class="md:mb-6 text-xs mt-1 text-right text-gray-400">ใส่ทศนิยมได้</p>
            </div>
            <div class="flex-shrink md:w-10 w-3 ">
              <!-- This item will shrink -->
            </div>
            <div class="flex-grow w-1/2 md:mt-3 mt-1 mr-10 md:mr-44 text-left text-xs md:text-base">
              <input id="ิbirthday" type="number"
                class="rounded-md border-2 border-gray-100 text-gray-400 w-full md:h-10 h-8 font-thin md:pl-5 pl-2 md:mt-1"
                placeholder="ส่วนสูง (ซม.)" />
              <span v-if="true" class="text-red-600 text-xs font-thin">* วันนี้ยังมาไม่ถึง</span>
              <p class="md:mb-6 text-xs mt-1 text-right text-gray-400">ใส่ทศนิยมได้</p>
            </div>
          </div>


          <button type="submit"
            class="mx-auto mt-8 md:mb-6 md:px-14  w-3/6 md:w-auto py-1.5 md:text-xl text-base rounded-lg text-white bg-brightsalmon">
            Create Account</button>
        </form>
      </div>
    </div>
    </div>

</template>
<script>
  export default {
    layout: 'signinbg',
    data() {
      return {
        showpass: true
      };
    },
    methods: {
      hasHistory() {
        return window.history.length > 2
      }
    },
  }

</script>
