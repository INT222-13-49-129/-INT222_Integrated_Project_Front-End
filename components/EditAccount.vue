<template>
  <div
    class="xl:w-full w-10/12 mx-auto xl:mx-0 xl:my-0 my-6 flex flex-col items-center xl:px-20"
  >
    <client-only>
      <UserImg class="xl:h-28 xl:w-28 w-24 h-24" />
    </client-only>
    <div class="w-full xl:mt-6 mt-4">
      <form class="text-gray-500">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="userupdate.username"
          required
          class="border-2 rounded-md h-10 w-full block mt-2 px-3"
        />
        <div class="flex xl:flex-row flex-col gap-x-6 gap-y-2 xl:mt-4 mt-2">
          <div class="flex-1">
            <label for="firstname">Firstname</label>
            <input
              id="firstname"
              v-model="userupdate.firstname"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
            />
          </div>
          <div class="flex-1">
            <label for="lastname">Lastname</label>
            <input
              id="lastname"
              v-model="userupdate.lastname"
              required
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
            />
          </div>
        </div>
        <div class="flex xl:flex-row flex-col gap-x-6 gap-y-2 xl:mt-4 mt-2">
          <div class="flex-1">
            <label for="gender">Gender</label>
            <select id="gender" v-model="userupdate.gender" class="border-2 rounded-md h-10 w-full block mt-2 px-3">
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div class="flex-1">
            <label for="doB">Date of Birth</label>
            <input
              id="doB"
              v-model="userupdate.doB" 
              type="date"
              required
              :max="currentDate()"
              class="border-2 rounded-md h-10 w-full block mt-2 px-3"
            />
          </div>
        </div>
        <div class="flex xl:flex-row flex-col gap-x-6 gap-y-2 xl:mt-4 mt-2">
          <div class="flex-1">
            <label for="weight">Weight</label>
            <div class="flex items-center">
              <input
                id="weight"
                v-model="userupdate.weight" 
                type="number"
                min="0.01"
                max="999.99"
                step="any"
                required
                class="border-2 rounded-md h-10 mt-2 px-3 flex-grow"
              />
              <span class="ml-2">kg.</span>
            </div>
          </div>
          <div class="flex-1">
            <label for="height">Height</label>
            <div class="flex items-center">
              <input
                id="height"
                v-model="userupdate.height" 
                type="number"
                min="0.01"
                max="999.99"
                step="any"
                required
                class="border-2 rounded-md h-10 mt-2 px-3 flex-grow"
              />
              <span class="ml-2">cm.</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end xl:mt-6 mt-4">
          <button
            type="submit"
            class="py-1.5 px-3 bg-orange rounded text-white text-sm cursor-pointer xl:mb-0 mb-6"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import UserImg from "../components/UserImg.vue";
export default {
  components: {
    UserImg,
  },
  data() {
    return {
      user:this.$auth.user,
      userupdate: {
          userid:this.$auth.user.userid,
          username:this.$auth.user.username,
          firstname:this.$auth.user.firstname,
          lastname:this.$auth.user.lastname,
          doB:this.$auth.user.doB,
          gender:this.$auth.user.gender,
          weight:this.$auth.user.weight,
          height:this.$auth.user.height
      },
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      let dd = current.getDate();
      let mm = current.getMonth() + 1;
      const yyyy = current.getFullYear();

      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      const date = yyyy + "-" + mm + "-" + dd;
      return date;
    },
  },
};
</script>
