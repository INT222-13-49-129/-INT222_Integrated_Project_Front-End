<template>
    <div>
        <div class="xl:mt-12 mt-20 mx-auto xl:w-272 w-11/12">
            <div class="flex items-center justify-between xl:flex-row flex-col">
                <div class="xl:w-5/12 w-full flex justify-between flex-shrink-0 items-center">
                    <div class="text-salmon xl:text-2xl text-xl flex-shrink-0">
                        Welcome , {{ user.username }} !
                        <span
                            class="block text-gray-500 xl:text-xl text-base xl:mt-4"
                        >Always save on eating food.</span>
                    </div>
                    <div class="h-full">
                        <client-only>
                            <UserImg class="xl:h-20 xl:w-20 w-14 h-14" />
                        </client-only>
                    </div>
                </div>
                <div
                    class="flex xl:gap-x-5 gap-x-3 overflow-x-scroll xl:overflow-visible xl:w-auto w-full items-center justify-between mt-4 xl:mt-0"
                >
                    <div v-for="i in 7" :key="i">
                        <div
                            class="xl:w-16 w-14 xl:h-24 h-20 border-2 rounded-md bg-white"
                            :class="{ 'xl:w-20 w-16 xl:h-28 h-24 shadow-md': i === 7 }"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="flex xl:mt-8 mt-6 justify-between xl:flex-row flex-col">
                <div
                    class="xl:w-128 w-full xl:h-128 h-80 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
                ></div>
                <div class="flex flex-col justify-between xl:mt-0 mt-6">
                    <div
                        class="xl:w-128 w-full xl:h-80 h-40 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
                    ></div>
                    <div class="flex justify-between xl:mt-0 mt-6 gap-x-3">
                        <div
                            class="xl:w-40 xl:flex-grow-0 flex-grow xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
                        ></div>
                        <div
                            class="xl:w-40 xl:flex-grow-0 flex-grow xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
                        ></div>
                        <div
                            class="xl:w-40 xl:flex-grow-0 flex-grow xl:h-40 h-20 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
                        ></div>
                    </div>
                </div>
            </div>
            <div
                class="xl:mt-8 mt-6 xl:mb-12 mb-8 w-full xl:h-128 h-40 bg-white rounded-2xl filter xl:drop-shadow-md drop-shadow"
            ></div>
        </div>
        <div class="w-full xl:h-12 h-10 bg-salmon"></div>
    </div>
</template>
<script>
import UserImg from '../../components/UserImg.vue';

export default {
    components: {
        UserImg,
    },
    layout: 'user',
    middleware: ['auth'],
    data() {
        return {
            user: this.$auth.user
        }
    },
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.replace('/')
        }
    },
}
</script>