<template>
  <div class="w-full  min-h-screen" :style="cssProps" >
    <div class="w-full min-h-screen bg-gray-300 bg-opacity-50 ">
        <Nuxt />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data() {
      return {
        cssProps: {
          backgroundImage: `url(${require("../assets/img/bg.png")})`,
          backgroundSize: "400px 400px",
        }
      };
    },
  }
</script>