<template>
    <div class="text-lg flex items-center">
        <i class="material-icons" :class="page.first ? 'text-gray-300':'cursor-pointer'" >navigate_before</i>
        <span class="text-sm md:text-gray-500 text-white">{{ pageitem }}</span>
        <i class="material-icons" :class="page.last ? 'text-gray-300':'cursor-pointer'">navigate_next</i>
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
        }
    },
    computed: {
        pageitem() {
            const first = (this.page.pageable.pageNumber*this.page.size)+1
            const last = this.page.last?this.page.totalElements:(this.page.pageable.pageNumber+1)*this.page.size
            return ` ${first}-${last} from ${this.page.totalElements} `;
        }
    }
}
</script>