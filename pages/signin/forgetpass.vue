<template>
    <div class="z-30 bg-white inset-0 fixed flex justify-center items-center">
        <div class="absolute md:top-5 top-3 left-5">
            <i
                class="material-icons md:text-5xl text-4xl text-lightorange md:hover:animate-bouncexl cursor-pointer"
                @click="$router.push('/signin')"
            >keyboard_backspace</i>
        </div>
        <div class="flex md:flex-row flex-col">
            <img src="../../assets/img/mail.svg" class="md:h-36 h-28 md:my-auto" />
            <div class="md:pl-28 mx-auto md:mx-0">
                <div
                    class="md:text-5xl text-3xl text-center md:text-left my-6 md:my-0 md:mb-3"
                >Reset password</div>
                <div
                    v-if="!havemail"
                    class="md:text-lg text-sm px-5 md:px-0 text-gray-400 md:w-128"
                >
                    <span>Enter the email associated with your account and we’ll send an email instructions to reset your password.</span>
                    <div class="mt-8 text-left text-sm md:text-base">
                        <label class="mb-1" for="email">Email Address</label>
                        <br />
                        <input
                            id="email"
                            v-model="forgotpass.email"
                            type="email"
                            required
                            class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-sm md:pl-5 pl-2 md:mt-3 mt-1"
                            placeholder="you@company.com"
                            @keyup="validate.from ? '' : validateFrom()"
                        />
                        <br />
                        <span
                            v-if="!validate.email && !validate.from"
                            class="text-red-600 text-xs font-thin"
                        >*{{ validatetext.email }}</span>
                    </div>
                    <div class="flex md:justify-end justify-center text-lg">
                        <button
                            class="md:mr-4 mt-6 bg-orange text-white px-6 rounded-lg py-1"
                            @click="havemail=true"
                        >Send Instructions</button>
                    </div>
                </div>
                <div v-if="havemail" class="md:text-lg text-sm px-5 md:px-0 text-gray-400 md:w-128">
                    <span>
                        Enter the confirmation code sent to
                        <span
                            class="text-blue-600"
                        >{{ forgotpass.email }}</span>
                        <br />and click button confirm to complete the process.
                    </span>
                    <div
                        class="mt-6 -mb-4 text-left text-sm md:text-lg text-gray-600"
                    >OTP Verification code</div>
                    <OtpInput
                        v-model="forgotpass.pin"
                        classtext="md:w-10 w-8 md:text-3xl text-2xl"
                    />
                    <div
                        v-if="!validate.pin && !validate.from"
                        class="text-red-600 text-xs -mt-3 mb-1.5 font-thin text-center md:text-left"
                    >*{{ validatetext.pin }}</div>
                    <div
                        class="w-11/12"
                    >Your new password should be different from your previous password.</div>
                    <div class="mt-6 text-left text-sm md:text-lg">
                        <label class="text-gray-600" for="password">Password</label>
                        <br />
                        <div class="relative min-w-min">
                            <span
                                class="material-icons absolute md:top-5 top-2 right-2 cursor-pointer text-gray-400"
                                @click="showpass = !showpass"
                            >{{ showpass ? 'visibility_off' : 'visibility' }}</span>
                            <input
                                id="password"
                                v-model="forgotpass.password"
                                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-sm md:pl-5 pl-2 md:mt-3 mt-1"
                                required
                                placeholder="your password"
                                :type="showpass ? 'password' : 'text'"
                                @keyup.enter="submitFrom()"
                                @keyup="validate.from ? '' : validateFrom()"
                            />
                            <br />
                        </div>
                        <span
                            v-if="!validate.password && !validate.from"
                            class="text-red-600 text-xs font-thin"
                        >*{{ validatetext.password }}</span>
                    </div>
                    <div class="mt-4 text-left text-sm md:text-lg">
                        <label class="text-gray-600" for="password">Comfirm Password</label>
                        <br />
                        <div class="relative min-w-min">
                            <span
                                class="material-icons absolute md:top-5 top-2 right-2 cursor-pointer text-gray-400"
                                @click="showpass = !showpass"
                            >{{ showpass ? 'visibility_off' : 'visibility' }}</span>
                            <input
                                id="password"
                                v-model="forgotpass.password"
                                class="rounded-md border-2 border-gray-100 w-full md:h-10 h-8 font-thin text-sm md:pl-5 pl-2 md:mt-3 mt-1"
                                required
                                placeholder="again password"
                                :type="showpass ? 'password' : 'text'"
                                @keyup.enter="submitFrom()"
                                @keyup="validate.from ? '' : validateFrom()"
                            />
                            <br />
                        </div>
                        <span
                            v-if="!validate.password && !validate.from"
                            class="text-red-600 text-xs font-thin"
                        >*{{ validatetext.password }}</span>
                    </div>
                    <div
                        class="text-lg md:mt-10 mt-6 flex md:justify-end justify-center items-center md:items-start"
                    >
                        <button
                            class="bg-orange text-white px-6 rounded-lg py-1"
                            @click="havemail=false"
                        >Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import * as AuthApi from '../../utils/authApi'
import OtpInput from "../../components/OtpInput.vue"
export default {
    components: {
        OtpInput
    },
    layout: 'signinbg',
    data() {
        return {
            havemail: false,
            showpass: true,
            forgotpass: {
                email: '',
                pin: '',
                password: ''
            },
            validate: {
                email: false,
                pin: false,
                password: false,
                from: true
            },
            validatetext: {
                email: '',
                pin: '',
                password: ''
            }
        }
    },
    methods: {
        validateFrom(chackall = false) {
            if (this.forgotpass.email === '') {
                this.validatetext.email = 'กรุณาใส่ Email '
                this.validate.email = false
            } else if (!this.validateEmail(this.login.email)) {
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

            this.validate.from = true
            if (chackall) {
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