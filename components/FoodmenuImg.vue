<template>
    <div>
        <img class="object-cover min-w-full min-h-full h-full" :class="{'animate-pulse': img===require('../assets/img/preload.svg') }" :src="img" />
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
            img: require('../assets/img/preload.svg')
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