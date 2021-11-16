<template>
    <div>
        <div
            class="fixed top-0 z-10 xl:px-16 min-w-max w-full h-16 bg-white shadow-md xl:hidden block"
        >
            <div class="flex pt-3 pb-2 px-4 text-base items-center text-salmon">
                <i class="material-icons text-3xl mr-2" @click="sidebar = true">menu</i>
                <NuxtLink to="/" class="flex mx-auto justify-center items-center -mt-1">
                    <img src="~assets/img/logo.svg" class="h-12" />
                    <div class="text-xl -mb-1">CFAN</div>
                </NuxtLink>
                <i class="material-icons text-3xl ml-1">date_range</i>
            </div>
        </div>
        <div
            v-if="sidebar"
            class="flex bg-opacity-20 bg-black z-20 w-screen h-screen fixed top-0 left-0 xl:hidden"
        >
            <div
                class="relative h-full w-52 bg-brightsalmon animate__animated animate__slideInLeft"
            >
                <div class="absolute top-3 left-4">
                    <i
                        class="material-icons text-3xl text-white cursor-pointer"
                        @click="sidebar = false"
                    >close</i>
                </div>
                <div
                    class="mt-14 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'profile' }"
                    @click="sidebar = false, $router.push('/profile')"
                >
                    <i class="material-icons -mt-1 text-3xl">person_outline</i>
                    <NuxtLink to="/profile" class="ml-3 text-lg">โปรไฟล์ของฉัน</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    @click="sidebar = false, $router.push('/foodmenu')"
                >
                    <i class="material-icons -mt-1 text-3xl">search</i>
                    <NuxtLink to="/foodmenu" class="ml-3 text-lg">ค้นหาอาหาร</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    @click="sidebar = false, $router.push('/newmenu')"
                >
                    <i class="material-icons -mt-1 text-3xl">speed</i>
                    <NuxtLink to="/newmenu" class="ml-3 text-lg">คำนวนแคล</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'profile-dailymeal' }"
                    @click="sidebar = false, $router.push('/profile/dailymeal')"
                >
                    <i class="material-icons -mt-1 text-3xl">schedule</i>
                    <NuxtLink to="/profile/dailymeal" class="ml-3 text-lg">บันทึกประจำวัน</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name.startsWith('profile-setting') }"
                    @click="sidebar = false, $router.push('/profile/setting')"
                >
                    <i class="material-icons -mt-1 text-3xl">settings</i>
                    <NuxtLink to="/profile/setting" class="ml-3 text-lg">ตั้งค่า</NuxtLink>
                </div>
                <div class="flex justify-center items-center text-base text-white mt-4">
                    <div
                        class="flex items-center p-2 border-2 border-white rounded-xl cursor-pointer"
                        @click="logout()"
                    >
                        <div>ออกจากระบบ</div>
                        <i class="material-icons ml-3 text-xl">logout</i>
                    </div>
                </div>
            </div>
            <div class="flex-grow h-full" @click="sidebar = false"></div>
        </div>
        <div class="w-64 h-full bg-white filter drop-shadow-all fixed xl:block hidden">
            <div class="pl-10 pt-14">
                <div class="text-2xl text-salmon mb-6">
                    <NuxtLink to="/" class="flex items-center">
                        <img src="~assets/img/logo.svg" class="h-14 -mt-2" />
                        CFAN
                    </NuxtLink>
                </div>
                <div class="text-lg text-salmon mb-6">Discover</div>
                <div class="flex flex-col text-base gap-y-4 text-gray-500">
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'profile' }"
                    >
                        <NuxtLink
                            to="/profile"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'profile' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'profile' }"
                            >person_outline</i>
                            <div>โปรไฟล์ของฉัน</div>
                        </NuxtLink>
                    </div>
                    <NuxtLink
                        to="/foodmenu"
                        class="flex items-center p-2 cursor-pointer hover:text-salmon"
                    >
                        <i class="material-icons -mt-1 mr-3 text-2xl">search</i>
                        <div>ค้นหาอาหาร</div>
                    </NuxtLink>
                    <NuxtLink
                        to="/newmenu"
                        class="flex items-center p-2 cursor-pointer hover:text-salmon"
                    >
                        <i class="material-icons -mt-1 mr-3 text-2xl">speed</i>
                        <div>คำนวนแคล</div>
                    </NuxtLink>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'profile-dailymeal' }"
                    >
                        <NuxtLink
                            to="/profile/dailymeal"
                            class="flex items-center p-2 cursor-pointer hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'profile-dailymeal' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'profile-dailymeal' }"
                            >schedule</i>
                            <div>บันทึกประจำวัน</div>
                        </NuxtLink>
                    </div>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name.startsWith('profile-setting') }"
                    >
                        <NuxtLink
                            to="/profile/setting"
                            class="flex items-center p-2 cursor-pointer hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name.startsWith('profile-setting') }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name.startsWith('profile-setting') }"
                            >settings</i>
                            <div>ตั้งค่า</div>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex justify-center items-center text-base text-gray-500 mt-4 -ml-10">
                    <div
                        class="flex items-center p-2 border-2 border-gray-400 rounded-xl cursor-pointer hover:text-salmon hover:bg-brightsalmon hover:bg-opacity-25 hover:border-salmon"
                        @click="logout()"
                    >
                        <div>ออกจากระบบ</div>
                        <i class="material-icons ml-3 text-xl">logout</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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