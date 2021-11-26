<template>
  <div class="flex flex-shrink-0 divide-x-4 text-center">
    <div class="w-1/12 py-1 flex-shrink-0">{{ foodmenus.foodmenuid }}</div>
    <div class="flex-grow py-1">{{ foodmenus.foodname }}</div>
    <div class="w-1/5 py-1">{{ foodmenus.description }}</div>
    <div class="w-1/7 py-1">{{ foodmenus.totalkcal }}</div>
    <div class="w-1/6 py-1">{{ foodmenus.foodtype.typename }}</div>
    <div class="w-1/7 py-1">{{ foodmenus.foodmenustatus }}</div>
    <div class="w-1/12 py-1">{{ foodmenus.userid }}</div>
  </div>
</template>
<script>
export default {
  props: {
    foodmenus: {
      type: Object,
      default() {
        return null;
      },
    },
  },
};
</script>
