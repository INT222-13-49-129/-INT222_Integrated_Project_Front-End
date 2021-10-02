<template>
    <div class="z-30 bg-white inset-0 fixed flex justify-center items-center">
        <div class="absolute md:top-5 top-3 left-5">
            <i
                class="material-icons md:text-6xl text-5xl text-lightorange cursor-pointer"
                @click="$parent.otpshow(false)"
            >close</i>
        </div>
        <div class="flex md:flex-row flex-col">
            <img src="../assets/img/mail.svg" class="md:h-36 h-28 my-auto" />
            <div class="md:pl-28 mx-auto md:mx-0">
                <div class="md:text-6xl text-3xl text-center md:text-left my-6 md:my-0">OTP Verification</div>
                <div class="md:text-lg text-sm px-5 md:px-0 text-gray-400">
                    Enter the confirmation code sent to
                    <span class="text-blue-600">{{ email }}</span>
                    <br />and click buttom confirm to complete the process.
                </div>
                <OtpInput v-model="otp" classtext="md:w-16 w-8 md:text-5xl text-2xl"/>
                <div
                    v-if="!validateotp"
                    class="text-red-600 text-base font-thin -mb-6 text-center md:text-left"
                >*{{ validatetext }}</div>
                <div
                    class="text-lg md:mt-16 mt-10 flex md:flex-row flex-col justify-between items-center md:items-start"
                >
                    <span>
                        ไม่ได้ อีเมล ?
                        <span
                            class="text-lightorange cursor-pointer"
                            @click="$parent.otpresend()"
                        >ส่งรหัสอีกครั้ง?</span>
                    </span>
                    <button
                        class="md:mr-8 md:-mt-1.5 mt-6 bg-orange text-white px-6 rounded-lg py-1"
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