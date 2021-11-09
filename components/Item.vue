<template>
    <div class="flex items-center">
        <slot></slot>
        <div class="flex-grow flex xl:flex-col flex-row items-center xl:items-start justify-between" :class="classitem">
            <div class="xl:w-full w-8/12">
                <div class="text-gray-700 truncate text-lg">{{ item.name }}</div>
                <div class="text-gray-500 xl:text-sm text-xs my-1 truncate">{{ item.description }}</div>
            </div>
            <div class="text-salmon text-base">{{ item.totalkcal }}<span class="xl:text-base text-sm"> kcal.</span></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    name: '',
                    description: '',
                    totalkcal: ''
                }
            },
        },
        classitem:{
            type: String,
            default: 'xl:w-56 w-10/12'
        }
    }
}
</script>