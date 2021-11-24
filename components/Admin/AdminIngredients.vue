<template>
  <div class="flex flex-shrink-0 divide-x-4 text-center">
    <div class="w-1/12 py-1 flex-shrink-0 text-right px-2">
      {{ ingredients.ingredientsid }}
    </div>
    <div class="flex-grow">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.ingredientsname }}
      </div>
      <div v-else>
        <input class="w-full focus:outline-none text-center bg-gray-100 py-1" />
      </div>
    </div>
    <div class="w-1/7">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.unit }}
      </div>
      <div v-else>
        <input class="w-full focus:outline-none text-center bg-gray-100 py-1" />
      </div>
    </div>
    <div class="w-1/7">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.kcalpunit }}
      </div>
      <div v-else>
        <input class="w-full focus:outline-none text-center bg-gray-100 py-1" />
      </div>
    </div>
    <div class="w-1/5">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.descriptionunit }}
      </div>
      <div v-else>
        <input class="w-full focus:outline-none text-center bg-gray-100 py-1" />
      </div>
    </div>
    <div class="w-1/6">
      <div v-if="!edit" class="w-full px-3 text-center py-1">
        {{ ingredients.ingredientstype }}
      </div>
      <div v-else>
        <input class="w-full focus:outline-none text-center bg-gray-100 py-1" />
      </div>
    </div>
    <div class="w-1/12 py-1 flex-shrink-0 text-gray-400 relative">
      <i
        class="material-icons text-xl absolute left-5 cursor-pointer"
        @click="edit = !edit"
      >
        {{ edit ? "close" : "edit" }}
      </i>
      <i class="material-icons text-xl absolute right-5 cursor-pointer">
        {{ edit ? "save" : "delete" }}
      </i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ingredients: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      edit: false,
    };
  },
};
</script>
