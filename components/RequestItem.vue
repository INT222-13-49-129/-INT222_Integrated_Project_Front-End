<template>
    <div class="flex items-center w-full">
        <div class="flex justify-center items-center mr-2">
            <IngredientstypeSVG v-if="request.foodtypereq === null"
                :ingredient="request.ingredientsreq.ingredientstype"
                classingredient="w-11 h-11"
                fill="#FCC090"
                class="flex justify-center items-center"
            />
            <i v-else class="material-icons text-5xl text-brightsalmon">dinner_dining</i>
        </div>
        <div class="flex-grow" :class="{' cursor-pointer ': request.foodtypereq === null }" @click="request.foodtypereq === null ?$parent.ingredientsItemShow=true:'',$parent.ingredientsItem=request.ingredientsreq">
            <div
                class="text-gray-700 truncate xl:text-xl text-lg"
            >{{ request.foodtypereq === null ? request.ingredientsreq.ingredientsname : request.foodtypereq.typename }}</div>
            <div
                class="text-gray-500 xl:text-sm text-xs mt-1 truncate"
            >{{ request.foodtypereq === null ? 'ขอเพิ่มวัตถุดิบ' : 'ขอเพิ่มประเภทอาหาร' }}</div>
        </div>
        <div
            class="xl:w-24 w-20 xl:text-base text-sm text-center py-1  rounded-xl" :class="request.status === 'WAIT'?'bg-gray-200 text-black': request.status === 'APPROVE'?'bg-green-400 text-white':'bg-red-500 text-white'"
        >{{request.status === 'WAIT'?'รออนุมัติ': request.status === 'APPROVE'?'อนุมัติแล้ว':'ไม่อนุมัติ'}}</div>
        <div class="flex items-center">
            <i class="material-icons text-gray-300 cursor-pointer xl:text-3xl text-2xl"
                @click="$parent.deleterequest(request)">delete</i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        request: {
            type: Object,
            default: null,
        }
    }
}
</script>