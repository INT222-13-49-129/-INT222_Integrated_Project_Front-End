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
                <i class="material-icons text-3xl ml-1" @click="sidebar = false, $router.push('/profile')">person_outline</i>
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
                    :class="{ 'border-salmon border-r-2': $route.name === 'admin' }"
                    @click="sidebar = false, $router.push('/admin')"
                >
                    <i class="material-icons -mt-1 text-3xl">tune</i>
                    <NuxtLink to="/admin" class="ml-3 text-lg">All</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'admin-accounts' }"
                    @click="sidebar = false, $router.push('/admin/accounts')"
                >
                    <i class="material-icons -mt-1 text-3xl">manage_accounts</i>
                    <NuxtLink to="/admin/accounts" class="ml-3 text-lg">Accounts</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'admin-menu' }"
                    @click="sidebar = false, $router.push('/admin/menu')"
                >
                    <i class="material-icons -mt-1 text-3xl">restaurant_menu</i>
                    <NuxtLink to="/admin/menu" class="ml-3 text-lg">Menu</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'admin-ingradients' }"
                    @click="sidebar = false, $router.push('/admin/ingradients')"
                >
                    <i class="material-icons -mt-1 text-3xl">tapas</i>
                    <NuxtLink to="/admin/ingradients" class="ml-3 text-lg">Ingradients</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'admin-category' }"
                    @click="sidebar = false, $router.push('/admin/category')"
                >
                    <i class="material-icons -mt-1 text-3xl">ramen_dining</i>
                    <NuxtLink to="/admin/category" class="ml-3 text-lg">Category</NuxtLink>
                </div>
                <div
                    class="mt-3 ml-6 flex items-center text-white"
                    :class="{ 'border-salmon border-r-2': $route.name === 'admin-request' }"
                    @click="sidebar = false, $router.push('/admin/request')"
                >
                    <i class="material-icons -mt-1 text-3xl">post_add</i>
                    <NuxtLink to="/admin/request" class="ml-3 text-lg">Request</NuxtLink>
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
                <div class="text-lg text-salmon mb-6">Admin</div>
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
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'admin' }"
                    >
                        <NuxtLink
                            to="/admin"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'admin' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'admin' }"
                            >tune</i>
                            <div>All</div>
                        </NuxtLink>
                    </div>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'admin-accounts' }"
                    >
                        <NuxtLink
                            to="/admin/accounts"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'admin-accounts' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'admin-accounts' }"
                            >manage_accounts</i>
                            <div>Accounts</div>
                        </NuxtLink>
                    </div>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'admin-menu' }"
                    >
                        <NuxtLink
                            to="/admin/menu"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'admin-menu' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'admin-menu' }"
                            >restaurant_menu</i>
                            <div>Menu</div>
                        </NuxtLink>
                    </div>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'admin-ingradients' }"
                    >
                        <NuxtLink
                            to="/admin/ingradients"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'admin-ingradients' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'admin-ingradients' }"
                            >tapas</i>
                            <div>Ingradients</div>
                        </NuxtLink>
                    </div>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'admin-category' }"
                    >
                        <NuxtLink
                            to="/admin/category"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'admin-category' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'admin-category' }"
                            >ramen_dining</i>
                            <div>Category</div>
                        </NuxtLink>
                    </div>
                    <div
                        class="pr-8"
                        :class="{ 'border-lightsalmon border-r-4': $route.name === 'admin-request' }"
                    >
                        <NuxtLink
                            to="/admin/request"
                            class="flex items-center p-2 hover:text-salmon"
                            :class="{ 'bg-brightsalmon bg-opacity-90 text-black rounded-lg shadow-lg': $route.name === 'admin-request' }"
                        >
                            <i
                                class="material-icons -mt-1 mr-3 text-2xl"
                                :class="{ 'text-salmon': $route.name === 'admin-request' }"
                            >post_add</i>
                            <div>Request</div>
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