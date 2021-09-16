<template>
    <div>
        <div class="flex py-6 px-4 font-normal text-xl text-salmon">
            <i class="material-icons text-4xl mr-2 -mt-0.5 md:hidden">menu</i>
            <NuxtLink to="/" :class="isindex ? 'md:mr-10' : 'md:mr-4'">CFAN</NuxtLink>
            <div class="flex-grow"></div>
            <NuxtLink
                to="/"
                :class="isindex ? 'md:mx-10' : 'xl:mx-10 md:mx-4'"
                class="flex-shrink-0 md:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >HOME</NuxtLink>
            <NuxtLink
                to="/foodmenu"
                :class="isindex ? 'md:mx-10' : 'xl:mx-10 md:mx-4'"
                class="flex-shrink-0 md:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >MENU</NuxtLink>
            <NuxtLink
                to="/"
                :class="isindex ? 'md:mx-10' : 'xl:mx-10 md:mx-4'"
                class="flex-shrink-0 md:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >NEW</NuxtLink>
            <NuxtLink
                to="/"
                :class="isindex ? 'md:mx-10' : 'xl:mx-10 md:mx-4'"
                class="flex-shrink-0 md:block hidden hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100"
            >AฺBOUT US</NuxtLink>
            <NuxtLink to="/signin" class="material-icons text-xl -mt-1 hover:text-tomato">person_outline</NuxtLink>
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
