<template>
    <div class="bg-white xl:w-128 w-10/12 shadow-lg relative">
        <slot></slot>
        <div class="flex flex-col justify-center items-center pt-6">
            <div class="text-gray-600 xl:text-lg text-base">วัตถุดิบ</div>
            <div class="xl:text-2xl text-xl mt-2">{{ ingredients.ingredientsname }}</div>
        </div>
        <div
            class="py-6 border-t-2 border-b-2 mx-6 my-4 flex flex-col xl:gap-y-6 gap-y-2 xl:px-8 px-6"
        >
            <div class="flex items-center flex-wrap">
                <div class="xl:w-28 text-gray-700">ชื่อวัตถุดิบ</div>
                <span class="text-gray-500">&nbsp;:&nbsp;</span>
                <div>
                    <span class="text-lg">{{ ingredients.ingredientsname }}</span>
                </div>
            </div>
            <div class="flex items-center flex-wrap">
                <div class="xl:w-28 text-gray-700">หน่วย</div>
                <span class="text-gray-500">&nbsp;:&nbsp;</span>
                <div>
                    <span class="text-lg">{{ ingredients.unit }}</span>
                </div>
            </div>
            <div class="flex items-center flex-wrap">
                <div class="xl:w-28 text-gray-700">ประเภทวัตถุดิบ</div>
                <span class="text-gray-500">&nbsp;:&nbsp;</span>
                <div>
                    <span class="text-lg">{{ ingredients.ingredientstype }}</span>
                </div>
            </div>
            <div class="flex flex-wrap items-center">
                <div class="w-32 text-gray-700">
                    คำอธิบายหน่วย
                    <span class="text-gray-500">&nbsp;:&nbsp;</span>
                </div>
                <div class="text-lg">{{ ingredients.descriptionunit }}</div>
            </div>
            <div class="flex flex-wrap items-center">
                <div class="w-48 text-gray-700">
                    จำนวนแคลอรี่ต่อ 1 หน่วย
                    <span class="text-gray-500">&nbsp;:&nbsp;</span>
                </div>
                <div class="text-lg">{{ ingredients.kcalpunit }} kcal.</div>
            </div>
        </div>
        <div class="bg-gray-200 h-10 w-full mt-6"></div>
    </div>
</template>
<script>
export default {
    props: {
        ingredients: {
            type: Object,
            default: null,
        }
    }
}
</script>