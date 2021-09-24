<template>
    <div class="z-30 bg-white inset-0 fixed flex justify-center items-center">
        <div class="absolute md:top-5 top-3 left-5">
            <i class="material-icons md:text-6xl text-5xl text-lightorange cursor-pointer">close</i>
        </div>
        <div class="flex md:flex-row flex-col">
            <img src="../assets/img/mail.svg" class="md:h-36 h-28 my-auto" />
            <div class="md:pl-28 mx-auto md:mx-0">
                <div class="md:text-6xl text-3xl text-center my-6 md:my-0">OTP Verification</div>
                <div class="md:text-lg text-sm px-5 md:px-0 text-gray-400">
                    Enter the confirmation code sent to *******532@hotmail.com
                    <br />and click buttom confirm to complete the process.
                </div>
                <OtpInput v-model="otp" />
                <div class="text-lg md:mt-16 mt-10 flex md:flex-row flex-col  justify-between items-center md:items-start">
                    <span>ไม่ได้ อีเมล ? <span class="text-lightorange cursor-pointer">ส่งรหัสอีกครั้ง?</span></span>  <button class="md:mr-8 md:-mt-1.5 mt-6 bg-orange text-white px-6 rounded-lg py-1">ยืนยันรหัส OTP</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OtpInput from "./OtpInput.vue"
export default {
    components: {
    OtpInput
  },
    data() {
        return {
            otp: 0
        }
    },
}
</script>