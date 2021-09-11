<template>
  <div class="w-full  h-full fixed" :style="cssProps" >
    <div class="w-full h-full bg-gray-300 bg-opacity-50 fixed overflow-scroll">
        <TheHeader class="mx-auto md:w-336 w-11/12 h-16 md:mt-14 mt-10 bg-white shadow-lg"/>
        <Nuxt />
    </div>
  </div>
</template>
<script>
  export default {
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
html {
  font-family: 'Kanit', sans-serif;
}
</style>