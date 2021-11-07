<template>
    <div class="w-full">
        <LineChart class="w-full xl:h-auto h-72" :chart-data="chartData" />
    </div>
</template>

<script>
import * as UserApi from '../utils/userApi'
import LineChart from '~/components/LineChart'

export default {
    components: {
        LineChart
    },
    data() {
        return {
            chartData: null,
            gradient: null,
            mealData: []
        };
    },
    async mounted() {
        for (let i = 0; i < 7; i++) {
            const selectedDate = new Date();
            selectedDate.setDate(selectedDate.getDate() - i)

            const mealdate = await this.getMeal(selectedDate)

            let data = mealdate.map(m => m.totalkcal).reduce((a, b) => a + b, 0)
            data = Math.floor(Math.random() * 3000) + 1;
            const labels = this.getDate(selectedDate,true)

            this.mealData[i] = {labels,data}
        }
        this.fillData();
    },
    methods: {
        fillData() {
            this.chartData = {
                labels: this.mealData.map(m => m.labels).reverse(),
                datasets: [
                    {
                        label: "กิโลแคลอรี่",
                        lineTension: 0,
                        borderColor: "#d9795f",
                        pointBackgroundColor: "#fcc090",
                        borderWidth: 2,
                        pointBorderColor: "#fcc090",
                        backgroundColor: "rgba(252, 192, 144,0.2)",
                        data: this.mealData.map(m => m.data).reverse(),
                    }
                ]
            };
        },
        async getMeal(selectedDate) {
            const date = this.getDate(selectedDate)
            const response = await UserApi.mealDate(date)
            return response.data
        },
        getDate(selectedDate, dmy = false) {
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
            const date = String(selectedDate.getDate()).padStart(2, '0');

            if (dmy) {
                return date + "/" + month + "/" + year
            }

            return year + "-" + month + "-" + date
        },
        updateChart() {
            this.$nextTick(() => {
                this.fillData();
            });
        }
    }
};
</script>