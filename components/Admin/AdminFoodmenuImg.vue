<template>
  <div>
    <img
      class="object-cover min-w-0 mx-auto min-h-full h-full"
      :class="{ 'animate-pulse': img === require('../../assets/img/preload.svg') }"
      :src="img"
    />
  </div>
</template>
<script>
import * as AdminApi from "../../utils/adminApi";

export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      img: require("../../assets/img/preload.svg"),
    };
  },
  watch: {
    id: async function idCheck() {
      const response = await AdminApi.foodmenuImg(this.id);
      this.img = response;
    },
  },
  async created() {
    const response = await AdminApi.foodmenuImg(this.id);
    this.img = response;
  },
};
</script>
