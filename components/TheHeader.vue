<template>
    <div>
        <div
            v-if="sidebar"
            class="flex bg-opacity-20 bg-black z-30 w-screen h-screen fixed bottom-0 left-0 xl:hidden"
        >
            <div class="h-full w-52 bg-brightsalmon animate__animated animate__slideInLeft">
                <div class="absolute top-3 left-5">
                    <i
                        class="material-icons text-3xl text-white cursor-pointer"
                        @click="sidebar = false"
                    >close</i>
                </div>
                <div class="mt-12 ml-3 flex items-center" @click="sidebar = false">
                    <img src="~assets/img/cat.png" class="w-12" />
                    <NuxtLink to="/" class="text-white ml-3 text-lg">HOME</NuxtLink>
                </div>
                <div class="ml-3 flex items-center" @click="sidebar = false">
                    <img src="~assets/img/cat.png" class="w-12" />
                    <NuxtLink to="/foodmenu" class="text-white ml-3 text-lg">MENU</NuxtLink>
                </div>
                <div class="ml-3 flex items-center" @click="sidebar = false">
                    <img src="~assets/img/cat.png" class="w-12" />
                    <NuxtLink to="/" class="text-white ml-3 text-lg">NEW</NuxtLink>
                </div>
                <div class="ml-3 flex items-center" @click="sidebar = false">
                    <img src="~assets/img/cat.png" class="w-12" />
                    <NuxtLink to="/" class="text-white ml-3 text-lg">ABOUT US</NuxtLink>
                </div>
                <div class="flex justify-center mt-3">
                    <div
                        v-if="$auth.loggedIn"
                        class="text-white text-2xl"
                        @click="logout(), sidebar = false"
                    >Logout</div>
                    <NuxtLink v-else to="/signin" class="text-white text-2xl">Login</NuxtLink>
                </div>
            </div>
            <div class="flex-grow h-full" @click="sidebar = false"></div>
        </div>
        <div class="flex pt-4 pb-2 px-4 font-normal text-base text-salmon items-center">
            <i class="material-icons text-3xl mr-2 -mt-1 xl:hidden" @click="sidebar = true">menu</i>
            <NuxtLink to="/" class="flex mx-auto justify-center items-center -mt-1">
                <img src="~assets/img/logo.svg" class="h-12" />
                <div :class="isindex ? 'xl:mr-10' : 'xl:mr-4'" class="text-xl -mb-1">CFAN</div>
            </NuxtLink>
            <div class="flex-grow xl:block hidden"></div>
            <NuxtLink
                to="/"
                :class="isindex ? 'xl:mx-10' : 'xl:mx-10 '"
                class="flex-shrink-0 xl:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >HOME</NuxtLink>
            <NuxtLink
                to="/foodmenu"
                :class="isindex ? 'xl:mx-10' : 'xl:mx-10 '"
                class="flex-shrink-0 xl:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >MENU</NuxtLink>
            <NuxtLink
                to="/"
                :class="isindex ? 'xl:mx-10' : 'xl:mx-10 '"
                class="flex-shrink-0 xl:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >NEW</NuxtLink>
            <NuxtLink
                to="/"
                :class="isindex ? 'xl:mx-10' : 'xl:mx-10 '"
                class="flex-shrink-0 xl:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >ABOUT US</NuxtLink>
            <NuxtLink
                to="/user"
                class="material-icons text-3xl -mt-1.5 hover:text-tomato"
            >person_outline</NuxtLink>
        </div>
    </div>
</template>
<script>
import 'animate.css'

export default {
    props: {
        isindex: Boolean
    },
    data() {
        return {
            sidebar: false
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
