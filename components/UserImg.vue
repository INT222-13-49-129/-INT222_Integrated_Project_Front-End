<template>
    <div class="relative">
        <img
            class="object-cover min-w-full min-h-full h-full rounded-full overflow-hidden"
            :class="{ 'animate-pulse': img === require('../assets/img/preload.svg') }"
            :src="img"
        />
        <div
            :class="addclass"
            @click="add = true, user.image !== null ? addimg = img : addimg = require('../assets/img/userimg2.svg'), addname = 'ยังไม่ได้เลือกรูป'"
        >photo_camera</div>
        <div v-if="add">
            <Modal classpop="flex justify-center items-center w-full h-full">
                <div class="xl:w-128 w-10/12 bg-white rounded-xl">
                    <div class="py-5 text-lg text-center">อัพเดตรูปโปรไฟล์</div>
                    <div class="flex flex-col items-center py-8 border-b-2 border-t-2">
                        <div class="w-40 h-40 mb-3">
                            <img class="object-cover min-w-full min-h-full h-full" :src="addimg" />
                        </div>
                        <div class="flex items-center justify-center gap-x-2 w-full px-3">
                            <label
                                for="image"
                                class="xl:px-4 px-2 py-0.5 bg-white border-2 rounded-full xl:text-sm text-xs border-opacity-0 filter drop-shadow cursor-pointer flex-shrink-0"
                            >อัพโหลดรูป</label>
                            <input
                                id="image"
                                type="file"
                                class="hidden"
                                accept="image/*"
                                @change="uploadImg"
                            />
                            <div class="text-xs text-gray-500 truncate">{{ addname }}</div>
                        </div>
                        <div
                            v-if="validate"
                            class="mt-3 text-xs text-red-600"
                        >*ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่</div>
                    </div>
                    <div class="py-4 px-2 flex items-center xl:justify-end justify-around gap-x-3">
                        <div
                            class="xl:w-2/12 w-4/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
                            @click="add = false"
                        >ยกเลิก</div>
                        <div
                            class="xl:w-2/12 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                            @click="saveImg()"
                        >บันทึก</div>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import * as UserApi from '../utils/userApi'
import Modal from '../components/Modal.vue';

export default {
    components: {
        Modal,
    },
    props: {
        addclass: {
            type: String,
            default: "material-icons xl:h-7 w-6 xl:w-7 h-6 flex items-center justify-center absolute -bottom-1 -right-1 bg-gray-400 text-white xl:text-lg text-base rounded-full cursor-pointer",
        },
        general: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            user: this.$auth.user,
            img: require('../assets/img/preload.svg'),
            addimg: require('../assets/img/userimg2.svg'),
            addname: 'ยังไม่ได้เลือกรูป',
            validate: false,
            add: false,
            file: null
        }
    },
    async created() {
        if (this.user.image !== null) {
            const response = await UserApi.getImgProfile()
            this.img = response;
        } else {
            this.img = require('../assets/img/userimg.svg')
        }
    },
    methods: {
        async saveImg() {
            if (this.file !== null) {
                try {
                    const response = await UserApi.addImgProfile(this.file)
                    if (response.data.success) {
                        const response = await UserApi.getImgProfile()
                        this.img = response
                        await this.$auth.fetchUser()
                        this.user = this.$auth.user
                        this.validate = false
                        this.add = false
                    }
                } catch (err) {
                    this.validate = true
                }
            } else {
                this.add = false
            }
        },
        uploadImg(event) {
            const file = event.target.files[0]
            if (this.isImage(file.name)) {
                const reader = new FileReader()
                reader.onload = (event) => {
                    this.addimg = event.target.result;
                };
                reader.readAsDataURL(file);
                this.file = file
                this.addname = file.name
            }
        },
        getExtension(filename) {
            const parts = filename.split('.');
            return parts[parts.length - 1];
        },
        isImage(filename) {
            const ext = this.getExtension(filename);
            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                case 'gif':
                case 'bmp':
                case 'png':
                case 'webp':
                    return true;
            }
            return false;
        },
    }
}
</script>