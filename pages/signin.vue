<template>
  <div class="flex flex-col justify-center item-center w-full h-full text-gray-600  ">
    <div
      class="mx-auto md:w-240 w-11/12 h-auto pb-10 bg-white  from-white to-gray-200 shadow-lg rounded-xl text-center">
      <div>
        <p class=" md:text-4xl text-2xl font-bold text-lightorange md:pt-20 pt-10 pb-3 ">Sign in</p>
        <p class="md:text-lg text-sm"> Sign in to access your account <br />Email Address</p>
        <div class="mt-8 mx-10 md:mx-40 text-left text-sm md:text-base">
          <label class="shadow-xl mb-2 " for="name">Email Address</label>
          <br />
          <input
            class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-xs md:pl-5 pl-2 md:mt-4 mt-1"
            placeholder="you@company.com" />
            <br />
          <span v-if="false" class="text-red-600 text-xs font-thin" >*เคยมีผู้ใช้ email นี้แล้ว</span>
        </div>
        <div class="mt-3 mx-10 md:mx-40 text-left text-sm md:text-base">
          <label class="shadow-xl mb-2 " for="name">Password</label>
          <br />
          <input
            class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-xs md:pl-5 pl-2 md:mt-4 mt-1"
            placeholder="Your Password" type="password" />
            <br />
          <span class="text-red-600 text-xs font-thin">*เคยมีผู้ใช้ email นี้แล้ว</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    layout: 'signinbg'
  }

</script>
