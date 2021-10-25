<template>
    <div class="mt-48 bg-gray-50">
        <div>{{ user }}</div>
        <button @click="logout()">logout</button>
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