<template>
    <div>
        <div class="fixed top-0 xl:px-16 min-w-max w-full h-16 bg-white shadow-md xl:hidden block">
            <div class="flex pt-3 pb-2 px-4 text-base items-center text-salmon">
                <i class="material-icons text-3xl mr-2">menu</i>
                <NuxtLink to="/" class="flex mx-auto justify-center items-center -mt-1">
                    <img src="~assets/img/logo.svg" class="h-12" />
                    <div class="text-xl -mb-1">CFAN</div>
                </NuxtLink>
                <i class="material-icons text-3xl ml-1">date_range</i>
            </div>
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
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'user' }"
                    >
                        <NuxtLink
                            to="/user"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'user' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'user' }"
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
                    <NuxtLink to="/" class="flex items-center p-2 cursor-pointer hover:text-salmon">
                        <i class="material-icons -mt-1 mr-3 text-2xl">schedule</i>
                        <div>บันทึกประจำวัน</div>
                    </NuxtLink>
                    <NuxtLink to="/" class="flex items-center p-2 cursor-pointer hover:text-salmon">
                        <i class="material-icons -mt-1 mr-3 text-2xl">settings</i>
                        <div>ตั้งค่า</div>
                    </NuxtLink>
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
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.replace('/')
        }
    },
}
</script>