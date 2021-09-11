<template>
  <div class="">
    <div class="flex py-6 md:px-16 px-4 font-semibold text-3xl text-salmon">
        <i class="material-icons text-4xl mr-2 -mt-0.5 md:hidden">
            menu
            </i>
        <NuxtLink to="/" >
            CFAN
        </NuxtLink>
        <div class="flex-grow "></div>
        <NuxtLink to="/" class="md:block hidden mx-10 hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100" >
            Home
        </NuxtLink>
        <NuxtLink to="/" class="md:block hidden mx-10 hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100" >
            Food menu
        </NuxtLink>
        <NuxtLink to="/" class="md:block hidden mx-10 hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100">
            New food
        </NuxtLink>
        <NuxtLink to="/" class="md:block hidden mx-10 hover:text-tomato hover:border-tomato border-b-2 border-opacity-0 hover:border-opacity-100">
            About us
        </NuxtLink>
        <NuxtLink to="/" class="material-icons text-4xl -mt-1 hover:text-tomato ">
            person_outline
        </NuxtLink>
    </div>
  </div>
</template>