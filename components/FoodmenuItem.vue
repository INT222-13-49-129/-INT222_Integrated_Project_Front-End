<template>
    <div class="bg-white filter drop-shadow">
        <div class="flex flex-col justify-center text-center py-6 px-4">
            <div class="text-gray-600">สรุปรายการ</div>
            <div class="text-xl">กระเพราะหมูสับไข่ดาว</div>
            <slot name="header"></slot>
            <div class="mt-6 text-gray-500 px-3">
                <div class="flex border-b-2 pb-2">
                    <div class="w-6/12 text-left pl-8">รายการ</div>
                    <div class="w-2/12">kcal.</div>
                    <div class="w-2/12">จำนวน</div>
                    <div class="w-2/12"></div>
                </div>
                <div class="mt-2 border-b-2 pb-2">
                    <div v-for="i in 10" :key="i" class="flex py-1 items-center">
                        <div class="w-6/12 text-left pl-8">น้ำมันพืช</div>
                        <div class="w-2/12">370</div>
                        <div class="w-2/12 relative">
                            <i
                                class="material-icons text-gray-200 absolute left-5 cursor-pointer"
                            >remove_circle_outline</i>
                            <span>1</span>
                            <i
                                class="material-icons text-gray-200 absolute right-5 cursor-pointer"
                            >add_circle_outline</i>
                        </div>
                        <div class="w-2/12 text-left flex">
                            <div class="truncate w-10/12">tablespoon</div>
                            <i class="material-icons text-gray-200 cursor-pointer">delete</i>
                        </div>
                    </div>
                </div>
            </div>
            <slot name="footer"></slot>
        </div>
        <div class="w-full h-10 bg-gray-100 flex justify-center items-center"></div>
    </div>
</template>