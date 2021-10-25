<template>
    <div class="z-30 bg-white flex items-center overflow-scroll w-full h-full">
        <div class="absolute xl:top-5 top-3 left-5">
            <i
                class="material-icons xl:text-5xl text-4xl text-lightorange xl:hover:animate-bouncexl cursor-pointer"
                @click="hasHistory()
                ? $router.go(-1)
                : $router.replace('/signin')"
            >keyboard_backspace</i>
        </div>
        <div v-if="loading">
            <Modal
                classpop="flex flex-col justify-center text-center xl:py-12 py-6 bg-opacity-95 bg-gray-100  rounded-xl fixed xl:px-16 px-10"
            >
                <img src="../../assets/img/loading.svg" class="xl:h-32 h-20" />
                <div class="xl:text-3xl text-xl xl:mt-5 mt-2">กำลังตรวจสอบข้อมูล</div>
            </Modal>
        </div>
        <div class="flex xl:flex-row flex-col my-auto mx-auto py-6">
            <img src="../../assets/img/mail.svg" class="xl:h-36 h-28 xl:my-auto" />
            <div class="xl:pl-28 mx-auto xl:mx-0">
                <div
                    class="xl:text-5xl text-3xl text-center xl:text-left my-6 xl:my-0 xl:mb-3"
                >Reset password</div>
                <div
                    v-if="!havemail"
                    class="xl:text-lg text-sm px-5 xl:px-0 text-gray-400 xl:w-128"
                >
                    <form @submit.prevent="sendemailforgot()">
                        <span>Enter the email associated with your account and we’ll send an email instructions to reset your password.</span>
                        <div class="mt-8 text-left text-sm xl:text-base">
                            <label class="mb-1" for="email">Email Address</label>
                            <br />
                            <input
                                id="email"
                                v-model="forgotpass.email"
                                type="email"
                                required
                                class="rounded-md border-2 border-gray-100 w-full xl:h-10 h-8 font-thin text-sm xl:pl-5 pl-2 xl:mt-3 mt-1 text-gray-600"
                                placeholder="you@company.com"
                                @keyup="validate.email ? '' : validateFrom()"
                            />
                            <br />
                            <span
                                v-if="!validate.email"
                                class="text-red-600 text-xs font-thin"
                            >*{{ validatetext.email }}</span>
                        </div>
                        <div class="flex xl:justify-end justify-center text-lg">
                            <button
                                type="submit"
                                class="xl:mr-4 mt-6 bg-orange text-white px-6 rounded-lg py-1"
                            >Send Instructions</button>
                        </div>
                    </form>
                </div>
                <div v-if="havemail" class="xl:text-lg text-sm px-5 xl:px-0 text-gray-400 xl:w-128">
                    <form @submit.prevent="sendemailpinpass()">
                        <div class="flex flex-wrap items-center">
                            Enter the confirmation code sent to
                            <span
                                class="text-blue-600 mx-1"
                            >{{ forgotpass.email }}</span>
                            <i
                                class="material-icons xl:text-lg text-base cursor-pointer"
                                @click="havemail = false"
                            >edit</i>
                            and click button confirm to complete the process.
                        </div>
                        <div
                            class="mt-6 -mb-4 text-left text-sm xl:text-lg text-gray-600"
                        >OTP Verification code</div>
                        <OtpInput
                            v-model="forgotpass.pin"
                            classtext="xl:w-10 w-8 xl:text-3xl text-2xl"
                        />
                        <div
                            v-if="!validate.pin && !validate.from"
                            class="text-red-600 text-xs -mt-3 mb-1.5 font-thin text-center xl:text-left"
                        >*{{ validatetext.pin }}</div>
                        <div
                            class="w-11/12"
                        >Your new password should be different from your previous password.</div>
                        <div class="mt-6 text-left text-sm xl:text-lg">
                            <label class="text-gray-600" for="password">Password</label>
                            <br />
                            <div class="relative min-w-min">
                                <span
                                    class="material-icons absolute xl:top-5 top-2 right-2 cursor-pointer text-gray-400"
                                    @click="showpass = !showpass"
                                >{{ showpass ? 'visibility_off' : 'visibility' }}</span>
                                <input
                                    id="password"
                                    v-model="forgotpass.password"
                                    class="rounded-md border-2 border-gray-100 w-full xl:h-10 h-8 font-thin text-sm xl:pl-5 pl-2 xl:mt-3 mt-1"
                                    required
                                    placeholder="your password"
                                    :type="showpass ? 'password' : 'text'"
                                    @keyup="validate.from ? '' : validateFrom(true)"
                                />
                                <br />
                            </div>
                            <span
                                v-if="!validate.password && !validate.from"
                                class="text-red-600 text-xs font-thin"
                            >*{{ validatetext.password }}</span>
                        </div>
                        <div class="mt-4 text-left text-sm xl:text-lg">
                            <label class="text-gray-600" for="password">Comfirm Password</label>
                            <br />
                            <div class="relative min-w-min">
                                <span
                                    class="material-icons absolute xl:top-5 top-2 right-2 cursor-pointer text-gray-400"
                                    @click="showpass = !showpass"
                                >{{ showpass ? 'visibility_off' : 'visibility' }}</span>
                                <input
                                    id="password"
                                    v-model="recheckpass"
                                    class="rounded-md border-2 border-gray-100 w-full xl:h-10 h-8 font-thin text-sm xl:pl-5 pl-2 xl:mt-3 mt-1"
                                    required
                                    placeholder="again password"
                                    :type="showpass ? 'password' : 'text'"
                                    @keyup="validate.from ? '' : validateFrom(true)"
                                />
                                <br />
                            </div>
                            <span
                                v-if="!validate.recheckpass && !validate.from"
                                class="text-red-600 text-xs font-thin"
                            >*{{ validatetext.recheckpass }}</span>
                        </div>
                        <div
                            v-if="!validate.all && !validate.from"
                            class="text-red-600 text-xs font-thin text-left mt-2"
                        >*{{ validatetext.all }}</div>
                        <div
                            class="text-lg xl:mt-10 mt-6 flex xl:justify-end justify-center items-center xl:items-start"
                        >
                            <button
                                type="submit"
                                class="bg-orange text-white px-6 rounded-lg py-1"
                            >Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as AuthApi from '../../utils/authApi'
import OtpInput from "../../components/OtpInput.vue"
import Modal from '../../components/Modal.vue';
export default {
    components: {
        Modal,
        OtpInput
    },
    layout: 'signinbg',
    data() {
        return {
            havemail: false,
            showpass: true,
            loading: false,
            recheckpass: '',
            forgotpass: {
                email: '',
                pin: '',
                password: ''
            },
            validate: {
                email: true,
                pin: false,
                password: false,
                recheckpass: false,
                all: false,
                from: true
            },
            validatetext: {
                email: '',
                pin: '',
                password: '',
                recheckpass: '',
                all: '',
            }
        }
    },
    watch: {
        'forgotpass.pin': function otpCheck() {
            if (!this.validate.from) {
                this.validateFrom(true)
            }
        }
    },
    methods: {
        hasHistory() {
            return window.history.length > 2
        },
        async sendemailforgot() {
            this.validateFrom()
            if (this.validate.email) {
                try {
                    this.loading = true
                    const response = await AuthApi.pinforgotpass({ email: this.forgotpass.email })
                    this.loading = false
                    if (response.data.success) {
                        this.havemail = true
                    }
                } catch (err) {
                    this.loading = false
                    this.validate.email = false
                    const status = err.response?.data?.status
                    if (status === 2004) {
                        this.validatetext.email = 'ไม่พบ Email นี้ในระบบ'
                    }
                    if (status === 2012) {
                        this.validatetext.email = 'Email นี้ยังไม่ได้ยืนยัน'
                    }
                    if ([500, 400].includes(err.response?.status) || err.response === undefined) {
                        this.validatetext.email = 'ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่'
                    }
                }
            }
        },
        async sendemailpinpass() {
            this.validateFrom(true)
            if (this.validate.from) {
                try {
                    this.loading = true
                    const response = await AuthApi.pinverifyforgotpass(this.forgotpass)
                    this.loading = false
                    if (response.data.success) {
                        this.$auth.setUser(response.data.user)
                        await this.$auth.setUserToken(response.data.token)
                        this.$router.replace('/profile')
                    }
                } catch (err) {
                    this.loading = false
                    this.validate.from = false
                    const status = err.response?.data?.status
                    if (status === 2004) {
                        this.validatetext.email = 'ไม่พบ Email นี้ในระบบ'
                        this.validate.email = false
                        this.havemail = false
                    }
                    if (status === 9001) {
                        this.validatetext.pin = 'ไม่พบรหัสยืนยันของ Email นี้ในระบบ'
                        this.validate.pin = false
                    }
                    if (status === 9003) {
                        this.validatetext.pin = 'OTP ของ Email หมดอายุการใช้งานแล้ว'
                        this.validate.pin = false
                    }
                    if (status === 9002) {
                        this.validatetext.pin = 'OTP ไม่ถูกต้อง'
                        this.validate.pin = false
                    }
                    if (status === 2014) {
                        this.validatetext.password = 'ไม่มีค่า password'
                        this.validate.password = false
                    }
                    if ([500, 400].includes(err.response?.status) || err.response === undefined) {
                        this.validatetext.all = 'ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่'
                        this.validate.all = false
                    }
                }
            }
        },
        validateFrom(checkall = false) {
            if (this.forgotpass.email === '') {
                this.validatetext.email = 'กรุณาใส่ Email '
                this.validate.email = false
            } else if (!this.validateEmail(this.forgotpass.email)) {
                this.validatetext.email = 'กรุณาใส่ Email ให้ถูกต้อง'
                this.validate.email = false
            } else {
                this.validate.email = true
            }

            if (this.forgotpass.password === '') {
                this.validatetext.password = 'กรุณาใส่ Password'
                this.validate.password = false
            } else if (this.forgotpass.password.length < 6) {
                this.validatetext.password = 'Password ต้องยาวกว่า 6 ตัวอักษร'
                this.validate.password = false
            } else {
                this.validate.password = true
            }

            if (this.recheckpass === '') {
                this.validatetext.recheckpass = 'กรุณายืนยัน Password'
                this.validate.recheckpass = false
            } else if (this.recheckpass !== this.forgotpass.password) {
                this.validatetext.recheckpass = 'Password ไม่ตรงกัน'
                this.validate.recheckpass = false
            } else {
                this.validate.recheckpass = true
            }

            if (this.forgotpass.pin === '') {
                this.validatetext.pin = 'กรุณาใส่ OTP'
                this.validate.pin = false
            } else if (this.forgotpass.pin.length < 6) {
                this.validatetext.pin = 'กรุณาใส่ค่าให้ครบ'
                this.validate.pin = false
            } else {
                this.validate.pin = true
            }

            this.validate.all = true
            this.validate.from = true
            if (checkall) {
                Object.values(this.validate).forEach(v => {
                    this.validate.from = v && this.validate.from
                });
            }
        },
        validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    },
}
</script>