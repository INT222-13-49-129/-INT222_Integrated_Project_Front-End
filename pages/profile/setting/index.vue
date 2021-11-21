<template>
  <div class="bg-white min-h-full">
    <div class="bgimgepro xl:flex hidden w-full h-24 items-center">
      <div class="xl:w-10/12 mx-auto flex justify-between items-center xl:pt-0 pt-16">
        <div class="text-white font-normal">
          <h1 class="xl:text-3xl text-2xl xl:text-right text-center">ข้อมูลส่วนตัว</h1>
        </div>
      </div>
    </div>
    <div
      class="flex xl:flex-row flex-col items-center justify-center xl:gap-x-20 gap-y-6 xl:pt-10 xl:pb-0 pt-16 pb-6"
    >
      <div class="xl:w-auto w-screen">
        <div
          class="xl:h-80 h-40 xl:w-96 w-full bgproimg flex justify-center items-center"
        >
          <client-only>
            <UserImg
              addclass="hidden"
              class="xl:h-60 xl:w-60 w-28 h-28 border-2 border-salmon rounded-full"
            />
          </client-only>
        </div>
        <div class="text-gray-700 xl:text-3xl text-2xl text-center xl:mt-2 bg-white">
          {{ user.username }}
        </div>
      </div>
      <div
        class="xl:w-144 w-11/12 rounded-3xl filter drop-shadow-all bg-white shadow-md px-6 py-4"
      >
        <div class="text-gray-500 xl:text-base text-sm">General</div>
        <div class="flex flex-col mb-4">
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Email Address</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ user.email }}</div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Username</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ user.username }}</div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Firstname</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ user.firstname }}</div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Lastname</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ user.lastname }}</div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Gender</div>
            <div class="text-gray-600 xl:text-base text-sm">
              {{ user.gender === "M" ? "Male" : "Female" }}
            </div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Date of Birth</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ doB }}</div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Weigth</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ user.weight }} kg.</div>
          </div>
          <div class="flex justify-between border-b-2 xl:py-3 py-2">
            <div class="xl:text-lg text-base">Height</div>
            <div class="text-gray-600 xl:text-base text-sm">{{ user.height }} cm.</div>
          </div>
        </div>
        <div class="flex justify-between xl:mt-6 mt-4 xl:mb-2 mb-1 items-center">
          <div
            class="text-red-600 xl:text-base text-sm cursor-pointer"
            @click="
              $router.push({
                path: '/profile/setting/account',
                query: { mode: 'Delete' },
              })
            "
          >
            ลบบัญชี
          </div>
          <NuxtLink
            to="/profile/setting/account"
            class="py-1.5 px-3 bg-orange rounded text-white xl:text-sm text-xs cursor-pointer"
            >Edit Profile</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserImg from "../../../components/UserImg.vue";

export default {
  components: {
    UserImg,
  },
  layout: "user",
  middleware: ["auth"],
  data() {
    return {
      user: this.$auth.user,
    };
  },
  computed: {
    doB() {
      const date = this.user.doB.split("-");
      return date[2] + "-" + date[1] + "-" + date[0];
    },
  },
};
</script>
<style>
.bgproimg {
  background-image: url("../../../assets/img/bgproimg.svg");
  background-position: center;
  background-size: 450px auto;
}
@media (min-width: 1280px) {
  .bgproimg {
    background-image: url("../../../assets/img/bgproimg.svg");
    background-position: center;
    background-size: 600px auto;
  }
}
</style>
