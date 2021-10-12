<template>
    <div class="text-lg flex items-center">
        <i class="material-icons" :class="page.first ? 'text-gray-300':'cursor-pointer'" @click="page.first?'':$parent.changPage(-1)">navigate_before</i>
        <span :class="classnum">{{ pageitem }}</span>
        <i class="material-icons" :class="page.last ? 'text-gray-300':'cursor-pointer'" @click="page.last?'':$parent.changPage(1)">navigate_next</i>
    </div>
</template>
<script>
export default {
    props: {
        page: {
            type: Object,
            default() {
                return null
            },
        },
        classnum:{
            type: String,
            default: 'text-sm xl:text-gray-500 text-white'
        }
    },
    computed: {
        pageitem() {
            if(this.page.totalElements===0){
                return 0
            }
            const first = (this.page.pageable.pageNumber*this.page.size)+1
            const last = this.page.last?this.page.totalElements:(this.page.pageable.pageNumber+1)*this.page.size
            return ` ${first}-${last} from ${this.page.totalElements} `;
        }
    }
}
</script>