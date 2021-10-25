<template>
    <div class="mt-12 mx-auto w-272">
        <div class="flex items-center justify-between">
            <div class="w-5/12 flex justify-between flex-shrink-0">
                <div class="text-salmon text-2xl">
                    Welcome , {{ user.username }} !
                    <span
                        class="block text-gray-500 text-xl mt-4"
                    >Always save on eating food.</span>
                </div>
                <div>
                    <img src="~assets/img/userimg.svg">
                </div>
            </div>
            <div class="flex gap-x-5 items-center">
                <div v-for="i in 7" :key="i">
                    <div class="w-16 h-24 border-2" :class="{'w-20 h-28': i===7 }"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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