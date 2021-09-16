<template>
  <div class="w-full  h-full fixed bg-gradient-to-br from-white via-lightsalmon to-salmon">
    <div class="w-full  h-full fixed" :style="cssProps">
    <Nuxt />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cssProps: {
          backgroundImage: `url(${require("../assets/img/bg2.svg")})`,
        }
      };
    }
  }
</script>
