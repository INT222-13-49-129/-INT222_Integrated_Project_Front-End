<template>
  <div
    class="h-16 flex justify-center items-center xl:text-base text-sm"
    :class="{ 'bg-brightsalmon rounded-xl shadow-md': checkcurrent() }"
  >
    <div
      class="flex flex-col justify-center items-center cursor-pointer"
      @click="$parent.$parent.$parent.setcalendar(false),$router.push({ path: '/profile/dailymeal', query: { date: getDate() } })"
    >
      <div
        :class="
          checkcurrent()
            ? 'text-white'
            : date.getMonth() + 1 === parseInt(month)
            ? 'text-gray-700'
            : 'text-gray-300'
        "
      >
        {{ date.getDate() }}
      </div>
      <div
        class="xl:text-sm text-xs mt-1"
        :class="
          checkcurrent()
            ? 'text-white'
            : date.getMonth() + 1 === parseInt(month)
            ? BMR - sumkcaldate >= 0
              ? 'text-green-700'
              : 'text-red-600'
            : 'text-gray-300'
        "
      >
        {{ sumkcaldate }}
      </div>
    </div>
  </div>
</template>
<script>
import * as UserApi from "../utils/userApi";

export default {
  props: {
    date: {
      type: Date,
      default: new Date(),
    },
    month: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      user: this.$auth.user,
      BMR: "",
      mealdate: [],
    };
  },
  computed: {
    sumkcaldate() {
      return this.mealdate.map((m) => m.totalkcal).reduce((a, b) => a + b, 0);
    },
  },
  mounted() {
    this.getMeal();
    this.calculateBMR();
  },
  methods: {
    checkcurrent() {
      const current = new Date();
      return (
        current.getDate() === this.date.getDate() &&
        current.getMonth() === this.date.getMonth() &&
        current.getFullYear() === this.date.getFullYear()
      );
    },
    calculateBMR() {
      const today = new Date();
      const birthDate = new Date(this.user.doB);
      const age = today.getFullYear() - birthDate.getFullYear();

      let dailycal;
      if (this.user.gender === "M") {
        dailycal = 66 + 13.7 * this.user.weight + 5 * this.user.height - 6.8 * age;
      } else if (this.user.gender === "F") {
        dailycal = 665 + 9.6 * this.user.weight + 1.8 * this.user.height - 4.7 * age;
      }
      this.BMR = parseInt(dailycal);
    },
    async getMeal() {
      const date = this.getDate();
      const response = await UserApi.mealDate(date);
      this.mealdate = response.data;
    },
    getDate() {
      const year = this.date.getFullYear();
      const month = String(this.date.getMonth() + 1).padStart(2, "0");
      const date = String(this.date.getDate()).padStart(2, "0");

      return year + "-" + month + "-" + date;
    },
  },
};
</script>
