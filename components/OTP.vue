<template>
    <div class="z-30 bg-white inset-0 fixed flex justify-center items-center">
        <div class="absolute xl:top-5 top-3 left-5">
            <i
                class="material-icons xl:text-6xl text-5xl text-lightorange cursor-pointer"
                @click="$parent.otpshow(false)"
            >close</i>
        </div>
        <div class="flex xl:flex-row flex-col">
            <img src="../assets/img/mail.svg" class="xl:h-36 h-28 my-auto" />
            <div class="xl:pl-28 mx-auto xl:mx-0">
                <div class="xl:text-6xl text-3xl text-center xl:text-left my-6 xl:my-0">OTP Verification</div>
                <div class="xl:text-lg text-sm px-5 xl:px-0 text-gray-400">
                    Enter the confirmation code sent to
                    <span class="text-blue-600">{{ email }}</span>
                    <br />and click buttom confirm to complete the process.
                </div>
                <OtpInput v-model="otp" classtext="xl:w-16 w-8 xl:text-5xl text-2xl"/>
                <div
                    v-if="!validateotp"
                    class="text-red-600 text-base font-thin -mb-6 text-center xl:text-left"
                >*{{ validatetext }}</div>
                <div
                    class="text-lg xl:mt-16 mt-10 flex xl:flex-row flex-col justify-between items-center xl:items-start"
                >
                    <span>
                        ไม่ได้ อีเมล ?
                        <span
                            class="text-lightorange cursor-pointer"
                            @click="$parent.otpresend()"
                        >ส่งรหัสอีกครั้ง?</span>
                    </span>
                    <button
                        class="xl:mr-8 xl:-mt-1.5 mt-6 bg-orange text-white px-6 rounded-lg py-1"
                        @click="otpverify()"
                    >ยืนยันรหัส OTP</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as AuthApi from '../utils/authApi'
import OtpInput from "./OtpInput.vue"
export default {
    components: {
        OtpInput
    },
    props: {
        email: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            otp: '',
            validateotp: true,
            validatetext: ''
        }
    },
    watch: {
        otp: function otpCheck() {
            if (!this.validateotp) {
                this.validateotp = this.otp.length === 6
                this.validatetext = 'กรุณาใส่ค่าให้ครบ'
            }
        }
    },
    methods: {
        async otpverify() {
            if (this.otp.length < 6) {
                this.validateotp = false
                this.validatetext = 'กรุณาใส่ค่าให้ครบ'
            } else {
                try {
                    const response = await AuthApi.pinverify({ email: this.email, pin: this.otp })
                    if (response.data.success) {
                        this.$auth.setUser(response.data.user)
                        await this.$auth.setUserToken(response.data.token)
                        this.$router.replace('/user')
                    }
                } catch (err) {
                    this.validateotp = false
                    const status = err.response?.data?.status
                    if (status === 2004) {
                        this.validatetext = 'ไม่พบ Email นี้ในระบบ'
                    }
                    if (status === 9001) {
                        this.validatetext = 'ไม่พบรหัสยืนยันของ Email นี้ในระบบ'
                    }
                    if (status === 9003) {
                        this.validatetext = 'OTP ของ Email หมดอายุการใช้งานแล้ว'
                    }
                    if (status === 9002) {
                        this.validatetext = 'OTP ไม่ถูกต้อง'
                    }
                    if ([500, 400].includes(err.response?.status) || err.response === undefined) {
                        this.validatetext = 'ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่'
                    }
                }
            }

        }
    },
}
</script>