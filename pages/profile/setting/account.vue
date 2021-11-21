<template>
  <div class="w-full min-h-full flex">
    <div
      class="xl:w-272 w-full xl:h-176 xl:min-h-0 min-h-full xl:my-auto xl:mx-auto bg-white xl:rounded-3xl xl:overflow-hidden"
    >
      <div
        class="bgimgepro w-full xl:h-24 flex items-center xl:px-10 px-4 xl:mt-0 mt-16 xl:py-0 py-4"
      >
        <div class="w-full">
          <div class="xl:text-2xl text-xl text-gray-800">
            {{ user.username }}<span class="text-gray-500"> / </span> {{ edit === Edit.Delete?'Delete Account':'Edit Profile' }}
          </div>
          <div class="text-gray-600 text-sm">Set up your CFAN presence.</div>
          <div class="xl:hidden mt-2 flex justify-between">
            <select
              v-model="edit"
              class="bg-white bg-opacity-50 rounded-md py-1 px-1 focus:outline-none text-sm items-center"
              @change="
                $router.push({
                  path: '/profile/setting/account',
                  query: { mode: Object.keys(Edit).find((key) => Edit[key] === edit) },
                })
              "
            >
              <option :value="Edit.Account">Account setting</option>
              <option :value="Edit.Email">Change Email</option>
              <option :value="Edit.Password">Change Password</option>
              <option :value="Edit.Delete">Delete Account</option>
            </select>
            <div
              class="text-red-600 text-base cursor-pointer"
              :class="{ underline: edit === Edit.Delete }"
              @click="
                $router.push({
                  path: '/profile/setting/account',
                  query: { mode: 'Delete' },
                })
              "
            >
              ลบบัญชี
            </div>
          </div>
        </div>
      </div>
      <div class="xl:flex w-full xl:px-10 xl:py-10">
        <div class="flex-shrink-0 w-1/5 text-lg text-gray-700 xl:block hidden">
          <div class="text-2xl cursor-pointer" @click="$router.push('/profile/setting')">
            Profile
          </div>
          <div class="flex flex-col gap-y-2 pt-3 text-gray-500">
            <div
              class="cursor-pointer"
              :class="{ 'text-gray-800 pl-5 text-xl': edit === Edit.Account }"
              @click="
                $router.push({
                  path: '/profile/setting/account',
                  query: { mode: 'Account' },
                })
              "
            >
              Account setting
            </div>
            <div
              class="cursor-pointer"
              :class="{ 'text-gray-800 pl-5 text-xl': edit === Edit.Email }"
              @click="
                $router.push({
                  path: '/profile/setting/account',
                  query: { mode: 'Email' },
                })
              "
            >
              Change Email
            </div>
            <div
              class="cursor-pointer"
              :class="{ 'text-gray-800 pl-5 text-xl': edit === Edit.Password }"
              @click="
                $router.push({
                  path: '/profile/setting/account',
                  query: { mode: 'Password' },
                })
              "
            >
              Change Password
            </div>
          </div>
          <div
            class="text-red-600 xl:text-base text-sm cursor-pointer mt-10"
            :class="{ underline: edit === Edit.Delete }"
            @click="
              $router.push({
                path: '/profile/setting/account',
                query: { mode: 'Delete' },
              })
            "
          >
            ลบบัญชี
          </div>
        </div>
        <div class="xl:flex-grow">
          <component :is="edit" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditAccount from "../../../components/EditAccount.vue";
import EditEmail from "../../../components/EditEmail.vue";
import EditPassword from "../../../components/EditPassword.vue";
import DeleteAccount from "../../../components/DeleteAccount.vue";

const Edit = Object.freeze({
  Account: "EditAccount",
  Email: "EditEmail",
  Password: "EditPassword",
  Delete: "DeleteAccount",
});

export default {
  components: {
    EditAccount,
    EditEmail,
    EditPassword,
    DeleteAccount,
  },
  layout: "user",
  middleware: ["auth"],
  data() {
    return {
      Edit,
      user: this.$auth.user,
      edit: "",
    };
  },
  watch: {
    "$route.query.mode": function modeChange() {
      this.changemode();
    },
  },
  mounted() {
    this.changemode();
  },
  methods: {
    changemode() {
      const mode = Edit[this.$route.query.mode];
      if (mode) {
        this.edit = mode;
      } else {
        this.$router.push({
          path: "/profile/setting/account",
          query: { mode: "Account" },
        });
      }
    },
  },
};
</script>
<style>
.bgimgepro {
  background-image: url("../../../assets/img/bgprofile.svg");
  background-position: center;
  background-size: 700px auto;
}
</style>
