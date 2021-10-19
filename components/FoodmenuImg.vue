<template>
    <div v-lazy-container="{ selector: 'img' }">
        <img class="object-cover h-full" :data-src="img" :data-loading="require('../assets/img/preload.jpg')" />
    </div>
</template>
<script>
import * as GeneralApi from '../utils/generalApi'
import * as UserApi from '../utils/userApi'

export default {
    props: {
        id: {
            type: Number,
            default: null,
        },
        general: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            img: ''
        }
    },
    async created() {
        let response
        if (this.general) {
            response = await GeneralApi.foodmenuImg(this.id)
        } else {
            response = await UserApi.foodmenuImg(this.id)
        }
        this.img = response;
    },
}
</script>