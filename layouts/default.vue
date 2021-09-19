<template>
  <div class="w-full  h-full fixed" :style="cssProps" >
    <div class="w-full h-full bg-gray-300 bg-opacity-50 fixed overflow-scroll" :class="{ 'md:py-0 py-8 flex flex-col ': isindex }">
        <div :class="isindex ? 'my-auto':'w-screen h-screen fixed'">
        <TheHeader :isindex="isindex"  :class="isindex ? 'md:px-16 mx-auto md:w-336 w-11/12 h-20 bg-white shadow-lg' : 'absolute top-0 xl:px-16 md:px-4 min-w-max w-full h-20 bg-white shadow-lg z-10'"/>
        <Nuxt />
        </div>
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
    computed: {
    isindex() {
      return this.$route.name === 'index';
    }
  }
  }
</script>
