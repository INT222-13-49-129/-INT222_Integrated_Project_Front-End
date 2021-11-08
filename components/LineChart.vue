<template>
    <div class="w-full relative flex items-center justify-center">
        <LineChart class="w-full xl:h-auto h-72" :class="{'opacity-40': chartData.labels.length === 0}" :chart-data="chartData" />
        <img v-if="chartData.labels.length === 0" src="../assets/img/loading.svg" class="xl:h-32 h-20 absolute" />
    </div>
</template>

<script>
import * as UserApi from '../utils/userApi'
import LineChart from '~/components/LineChart'

export default {
    components: {
        LineChart
    },
    props: {
        rounds: {
            type: Number,
            default: 7,
        },
    },
    data() {
        return {
            chartData: {labels:[],datasets:[]},
            gradient: null,
            mealData: []
        };
    },
    watch: {
        rounds:async function editRounds() {
            await this.getData()
            this.fillData();
        }
    },
    async mounted() {
        await this.getData()
        this.fillData();
    },
    methods: {
        async getData() {
            this.chartData= {labels:[],datasets:[]}
            this.mealData = []
            for (let i = 0; i < this.rounds; i++) {
                const selectedDate = new Date();
                selectedDate.setDate(selectedDate.getDate() - i)

                const mealdate = await this.getMeal(selectedDate)

                // const data = mealdate.map(m => m.totalkcal).reduce((a, b) => a + b, 0)
                let data = mealdate.map(m => m.totalkcal).reduce((a, b) => a + b, 0)
                data = Math.floor(Math.random() * 3000) + 1;

                const labels = this.getDate(selectedDate, true)

                this.mealData[i] = { labels, data }
            }
        },
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