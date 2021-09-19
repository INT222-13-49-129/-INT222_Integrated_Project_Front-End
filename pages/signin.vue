<template>
  <div class="flex flex-col item-center w-full h-full text-gray-600 overflow-scroll">
    <div class="absolute md:top-5 top-3 left-5">
      <i
        class="material-icons md:text-5xl text-4xl text-gray-400 opacity-50 md:hover:animate-bouncexl cursor-pointer"
        @click="hasHistory()
        ? $router.go(-1)
        : $router.push('/')"
      >keyboard_backspace</i>
    </div>
    <div
      class="mx-auto my-auto md:w-224 w-11/12 h-auto pb-10 bg-white from-white to-gray-200 shadow-lg rounded-xl text-center"
    >
      <div>
        <p class="md:text-4xl text-2xl font-bold text-lightorange md:pt-20 pt-10 pb-3">Sign in</p>
        <p class="md:text-lg text-sm">
          Sign in to access your account
          <br />Email Address
        </p>
        <form @submit.prevent="">
          <div class="mt-8 mx-10 md:mx-44 text-left text-sm md:text-base">
            <label class="mb-1" for="email">Email Address</label>
            <br />
            <input
              id="email"
              type="email"
              class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-sm md:pl-5 pl-2 md:mt-3 mt-1"
              placeholder="you@company.com"
            />
            <br />
            <span v-if="false" class="text-red-600 text-xs font-thin">*เคยมีผู้ใช้ email นี้แล้ว</span>
          </div>
          <div class="mt-4 mx-10 md:mx-44 text-left text-sm md:text-base">
            <label class="mb-1" for="password">Password</label>
            <br />
            <div class="relative min-w-min">
              <span
                class="material-icons absolute md:top-5 top-2 right-2 cursor-pointer text-gray-400"
                @click="showpass = !showpass"
              >{{ showpass ? 'visibility' : 'visibility_off' }}</span>
              <input
                id="password"
                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-sm md:pl-5 pl-2 md:mt-3 mt-1"
                placeholder="your password"
                :type="showpass ? 'password' : 'text'"
              />
              <br />
            </div>
            <div class="flex flex-row-reverse justify-between mt-1">
              <span
                class="text-gray-400 text-sm font-thin underline cursor-pointer"
              >Forget password?</span>
              <span v-if="false" class="text-red-600 text-xs font-thin">*password ไม่ถูกต้อง</span>
            </div>
          </div>
          <button
            type="submit"
            class="mx-auto md:mt-8 mt-4 md:px-14 w-3/6 md:w-auto py-1.5 md:text-xl text-base rounded-lg text-white bg-brightsalmon"
          >Sign in</button>
        </form>
        <div class="md:mt-8 md:mb-6 mt-6 md:text-base text-sm">
          Don't have an account yet?
          <NuxtLink to="/signup" class="underline text-lightorange">Sign up.</NuxtLink>
        </div>
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
    hasHistory(){
      return window.history.length > 2 
    }
  },
}

</script>
