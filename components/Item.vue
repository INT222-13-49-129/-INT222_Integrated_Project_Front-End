<template>
    <div class="flex items-center">
        <slot></slot>
        <div class="md:w-56 w-full flex md:flex-col flex-row items-center md:items-start justify-between">
            <div class="md:w-full w-8/12">
                <div class="text-gray-700 truncate md:text-xl text-lg">{{ item.name }}</div>
                <div class="text-gray-500 md:text-sm text-xs my-1 truncate">{{ item.description }}</div>
            </div>
            <div class="text-salmon text-lg">{{ item.totalkcal }}<span class="md:text-base text-sm"> kcal.</span></div>
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
        }
    }
}
</script>