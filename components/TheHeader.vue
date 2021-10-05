<template>
    <div>
        <div class="flex pt-4 pb-2 px-4 font-normal text-base text-salmon items-center">
            <i class="material-icons text-3xl mr-2 -mt-1 xl:hidden">menu</i>
            <NuxtLink to="/" class="flex mx-auto justify-center items-center -mt-1"> 
            <img src="~assets/img/logo.svg" class="h-12" />
            <div :class="isindex ? 'xl:mr-10' : 'xl:mr-4'" class="text-xl -mb-1">CFAN
            </div> </NuxtLink>
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
            <NuxtLink to="/user" class="material-icons text-3xl -mt-1.5 hover:text-tomato">person_outline</NuxtLink>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isindex: Boolean
    },
}
</script>
