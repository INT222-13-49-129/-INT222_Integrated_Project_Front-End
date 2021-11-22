<template>
  <div>
    <Modal classpop="flex justify-center items-center w-full h-full">
      <div class="bg-white relative rounded-3xl xl:w-160 w-11/12 shadow-lg overflow-hidden">
        <div
          class="absolute flex items-center top-1.5 right-2.5 cursor-pointer"
        >
          <i class="material-icons xl:text-3xl text-2xl text-gray-400" @click="$parent.setcalendar(false)">close</i>
        </div>
        <div class="flex xl:mt-10 mt-8 xl:mx-9 mx-5">
          <input
            id="yearmonth"
            v-model="yearmonth"
            type="month"
            class="focus:outline-none w-full xl:text-2xl text-xl"
          />
        </div>
        <div class="flex flex-wrap xl:gap-y-3 gap-y-1 xl:mt-6 mt-3 xl:text-lg text-base xl:mx-8 mx-4 xl:mb-4 mb-2">
          <div v-for="dw in daysOfWeek" :key="dw" class="w-1/7 text-center xl:mb-2 mb-1">
            {{ dw }}
          </div>
          <div v-for="d in date" :key="d.getTime()" class="w-1/7">
            <DateCalendar :date="d" :month="ym[1]"></DateCalendar>
          </div>
        </div>
        <div class="xl:h-16 h-12 bg-gray-100"></div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "../components/Modal.vue";
import DateCalendar from "../components/DateCalendar.vue";

export default {
  components: {
    Modal,
    DateCalendar,
  },
  data() {
    return {
      yearmonth: "",
      date: [],
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  watch: {
    yearmonth: function yearmonthCheck() {
      this.ym = this.yearmonth.split("-");
      this.datesMonth(this.ym[0], this.ym[1]);
    },
  },
  mounted() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    this.yearmonth = year + "-" + month;
  },
  methods: {
    datesMonth(year, month) {
      const date = [];
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        date.push(new Date(year + "-" + month + "-" + i));
      }
      const dayF = date[0].getDay();
      const dayL = date[date.length - 1].getDay();
      if (dayF !== 0) {
        for (let i = 0; i < dayF; i++) {
          const d = new Date(date[0]);
          d.setDate(d.getDate() - 1);
          date.unshift(d);
        }
      }
      if (dayL !== 6) {
        for (let i = 0; i < 6 - dayL; i++) {
          const d = new Date(date[date.length - 1]);
          d.setDate(d.getDate() + 1);
          date.push(d);
        }
      }
      this.date = date;
    },
  },
};
</script>
