<template>
    <div class="flex items-center w-full">
        <div class="flex justify-center items-center mr-2">
            <i class="material-icons text-5xl text-brightsalmon">dinner_dining</i>
        </div>
        <div class="flex-grow">
            <div class="text-gray-700 truncate xl:text-xl text-lg">ของหวาน</div>
            <div class="text-gray-500 xl:text-sm text-xs mt-1 truncate">ขอเพิ่มประเภทอาหาร</div>
        </div>
        <div
            class="xl:w-24 w-20 xl:text-base text-sm text-center py-1 bg-green-400 rounded-xl text-white"
        >อนุมัติแล้ว</div>
        <div class="flex items-center">
            <i
                class="material-icons text-gray-300 cursor-pointer xl:text-3xl text-2xl"
            >delete</i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: null,
        }
    }
}
</script>