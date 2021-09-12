<template>
    <div
        class="md:w-336 w-11/12 mt-20 mx-auto pt-6 md:pt-0 h-screen bg-white shadow-lg justify-center"
    >
        <div
            class="bgimge object-cover md:w-full  md:h-28 mx-6 md:mx-0 rounded-3xl md:rounded-none"
        >
            <div class="flex md:flex-row flex-col md:gap-x-96">
                <div class="text-white font-normal pt-6 md:ml-32 flex-shrink-0">
                    <div class="md:text-4xl text-3xl md:text-right text-center">ปริมาณแคลอรี่ในอาหาร</div>
                    <div class="text-xl md:text-right text-center">หุ่นสวย ด้วยตัวเรา</div>
                </div>
                <div class="md:w-1/4 px-3 pb-3">
                    <div class="relative text-gray-600  flex justify-end md:pt-9 pt-2 z-0">
                        <div class="flex justify-start">
                            <button type="submit" class="focus:outline-none absolute mt-3 ml-3 mr-1 ">
                                <i class="material-icons text-gray-400">search</i>
                            </button>
                        </div>
                        <input
                            class="rounded-2xl bg-white w-full md:w-auto h-12 px-5 pl-10 text-medium focus:outline-none"
                            placeholder="ค้นหาอาหาร"
                        />
                        <div class="flex justify-end">
                            <button type="submit" class="focus:outline-none absolute mt-3 mr-3">
                                <i class="material-icons text-gray-200">filter_alt</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.bgimge {
    background-image: url("../assets/img/bgfoodmenu.svg");
    background-position: center;
    background-size: 700px auto;
}
</style>