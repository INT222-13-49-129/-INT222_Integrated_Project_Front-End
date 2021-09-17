<template>
    <div class="flex flex-col justify-center item-center w-full h-full" >
    <div class="bg-white rounded-3xl mx-auto font-sans text-gray-700 shadow-2xl md:w-208 w-10/12 flex flex-col items-center justify-center py-10 ">
        <div class="flex justify-center items-center  ">
            <div class="md:text-9xl text-8xl font-bold text-lightorange">{{error.statusCode}}</div>
        </div>
        <div class="pb-4 mx-3 mt-6 text-center md:w-10/12 w-11/12">
            <p class=" md:text-3xl text-xl font-bold mb-5">Oops! Page not found</p>
                
              <p class="text-center md:text-base text-xs">Oops! The page you are looking for does not exist.<br /> It might have been moved or deleted.</p>  
        </div>
        <NuxtLink to="/" class="mx-auto px-4 mt-2 w-auto py-2 md:text-xl text-base rounded-xl text-white transform bg-gradient-to-r from-lightsalmon hover:from-purple-600 to-purple-600 hover:to-lightsalmon ">Back to Home</NuxtLink>
    </div>
    </div>
</template>

<script>
export default {
    layout: 'signinbg',
    props: {
        error: {
            type: Object,
            default: null,
        }
    }

}
</script>