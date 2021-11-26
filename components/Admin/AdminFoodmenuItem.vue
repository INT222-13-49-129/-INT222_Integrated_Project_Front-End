<template>
  <div class="flex flex-col w-304 mx-4 border-4 divide-y-4">
    <div class="flex divide-x-4 text-center">
      <div class="w-1/12 py-1 flex-shrink-0">Id</div>
      <div class="flex-grow py-1">Food menu name</div>
      <div class="w-1/6 py-1">Description</div>
      <div class="w-1/7 py-1">Total kcal.</div>
      <div class="w-1/6 py-1">Category</div>
      <div class="w-1/7 py-1">Status</div>
      <div class="w-1/12 py-1">User Id</div>
      <div class="w-1/12 py-1">Action</div>
    </div>
    <div class="flex divide-x-4 text-center">
      <div class="w-1/12 py-1 flex-shrink-0 px-2 text-right">{{ foodmenu.foodmenuid }}</div>
      <div class="flex-grow py-1">{{ foodmenu.foodname }}</div>
      <div class="w-1/6 py-1">{{ foodmenu.description }}</div>
      <div class="w-1/7 py-1">{{ foodmenu.totalkcal }}</div>
      <div class="w-1/6 py-1">{{ foodmenu.foodtype.typename }}</div>
      <div class="w-1/7 py-1">{{ foodmenu.foodmenustatus }}</div>
      <div class="w-1/12 py-1">{{ foodmenu.userid }}</div>
      <div class="w-1/12 py-1 flex justify-center items-center text-gray-400 relative">
        <i
          class="material-icons text-xl absolute cursor-pointer"
          @click="$parent.item = false,$parent.foodmenu = {}"
          >close</i
        >
      </div>
    </div>
    <div class="flex flex-shrink-0 divide-x-4 text-center">
      <div class="flex-grow py-1">Image</div>
      <div class="w-8/12 py-1">Ingredients</div>
    </div>
    <div class="flex flex-shrink-0 divide-x-4 text-center">
      <div class="flex-grow">
        <client-only>
          <AdminFoodmenuImg
            :id="foodmenu.foodmenuid"
            class="h-60 p-1 items-center flex flex-shrink-0 mx-auto"
          ></AdminFoodmenuImg>
        </client-only>
      </div>
      <div class="w-8/12 flex-shrink-0 h-60 flex flex-col overflow-y-auto relative">
        <div class="flex divide-x-4 text-center border-b-4 sticky top-0 bg-white">
          <div class="w-1/12 py-1 flex-shrink-0">Id</div>
          <div class="flex-grow py-1">Ingredients name</div>
          <div class="w-1/7 py-1">Total kcal.</div>
          <div class="w-1/7 py-1">Quantity</div>
          <div class="w-1/7 py-1">Unit</div>
          <div class="w-1/5 py-1">Description unit</div>
        </div>
        <div>
          <div
            v-for="i in foodmenu.foodmenuHasIngredientsList"
            :key="i.key.ingredientsIngredientsid"
            class="flex divide-x-4 text-center border-b-2"
          >
            <div class="w-1/12 py-1 flex-shrink-0 px-2 text-right">
              {{ i.key.ingredientsIngredientsid }}
            </div>
            <div class="flex-grow py-1">{{ i.ingredients.ingredientsname }}</div>
            <div class="w-1/7 py-1">{{ i.totalkcal }}</div>
            <div class="w-1/7 py-1">{{ i.totalunit }}</div>
            <div class="w-1/7 py-1">{{ i.ingredients.unit }}</div>
            <div class="w-1/5 py-1">{{ i.ingredients.descriptionunit }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminFoodmenuImg from "../../components/Admin/AdminFoodmenuImg.vue";

export default {
  component: {
    AdminFoodmenuImg,
  },
  props: {
    foodmenu: {
      type: Object,
      default() {
        return null;
      },
    },
  },
};
</script>
