<template>
   <div class="fixed font-light bg-opacity-20 bg-black flex justify-center items-center  z-40 inset-0 overflow-y-auto overflow-x-auto">
     <div :class="classpop">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
      classpop: {
            type: String,
            default: '',
        }
}
}
</script>