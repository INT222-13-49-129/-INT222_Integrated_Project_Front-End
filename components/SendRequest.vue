<template>
    <div class="bg-white w-10/12 xl:w-144 rounded-xl shadow-lg">
        <div class="text-center pt-4 xl:text-xl text-lg">ส่งคำขอ</div>
        <div
            class="flex bg-gray-200 border-2 border-gray-300 my-3 mx-3 rounded-lg xl:text-base text-sm"
        >
            <div
                class="w-1/2 text-center py-1 cursor-pointer"
                :class="{ 'border-r-2 border-gray-300 bg-white rounded-lg': foodtype }"
                @click="$parent.$parent.RequestShow(true, true)"
            >เพิ่มประเภทอาหาร</div>
            <div
                class="w-1/2 text-center py-1 cursor-pointer"
                :class="{ 'border-l-2 border-gray-300 bg-white rounded-lg': !foodtype }"
                @click="$parent.$parent.RequestShow(true, false)"
            >เพิ่มวัตถุดิบ</div>
        </div>
        <div class="xl:py-3 py-0.5">
            <div v-if="foodtype" class="flex xl:px-8 px-4 xl:flex-row flex-col">
                <div class="mr-2">ชื่อประเภทอาหาร :</div>
                <div class="flex-grow">
                    <input
                        id="typename"
                        v-model="foodtypereq.typename"
                        type="text"
                        class="rounded-lg border-2 border-gray-200 w-full px-3"
                        @keyup="validate.from ? '' : validateFrom()"
                    />
                    <div
                        v-if="!validate.typename && !validate.from"
                        class="text-red-600 text-xs text-left mt-1"
                    >*{{ validatetext.typename }}</div>
                </div>
            </div>

            <div v-else class="flex flex-col xl:gap-y-3 gap-y-1 xl:px-8 px-4">
                <div class="flex xl:flex-row flex-col">
                    <div class="w-48 xl:text-right text-left mr-2">ชื่อวัตถุดิบ :</div>
                    <div class="flex-grow">
                        <input
                            id="ingredientsname"
                            v-model="ingredientsreq.ingredientsname"
                            type="text"
                            class="rounded-lg border-2 border-gray-200 w-full px-3"
                            @keyup="validate.from ? '' : validateFrom()"
                        />
                        <div
                            v-if="!validate.ingredientsname && !validate.from"
                            class="text-red-600 text-xs text-left mt-1"
                        >*{{ validatetext.ingredientsname }}</div>
                    </div>
                </div>
                <div class="flex xl:flex-row flex-col">
                    <div class="w-48 xl:text-right text-left mr-2">หน่วย :</div>
                    <div class="flex-grow">
                        <input
                            id="unit"
                            v-model="ingredientsreq.unit"
                            type="text"
                            class="rounded-lg border-2 border-gray-200 w-full px-3"
                            @keyup="validate.from ? '' : validateFrom()"
                        />
                        <div
                            v-if="!validate.unit && !validate.from"
                            class="text-red-600 text-xs text-left mt-1"
                        >*{{ validatetext.unit }}</div>
                    </div>
                </div>
                <div class="flex xl:flex-row flex-col">
                    <div class="w-48 xl:text-right text-left mr-2">ประเภทวัตถุดิบ :</div>
                    <div class="flex-grow">
                        <select
                            id="ingredientstype"
                            v-model="ingredientsreq.ingredientstype"
                            class="rounded-lg border-2 border-gray-200 w-full px-3 py-1"
                            @change="validate.from ? '' : validateFrom()"
                        >
                            <option :value="null" disabled selected></option>
                            <option v-for="i in ingredientstype" :key="i" :value="i">{{ i }}</option>
                        </select>
                        <div
                            v-if="!validate.ingredientstype && !validate.from"
                            class="text-red-600 text-xs text-left mt-1"
                        >*{{ validatetext.ingredientstype }}</div>
                    </div>
                </div>
                <div class="flex xl:flex-row flex-col">
                    <div class="w-48 xl:text-right text-left mr-2">คำอธิบายหน่วย :</div>
                    <div class="flex-grow">
                        <textarea
                            id="descriptionunit"
                            v-model="ingredientsreq.descriptionunit"
                            type="text"
                            class="rounded-lg border-2 border-gray-200 w-full px-3 py-1"
                            placeholder="(หน่วยเปรียบเทียบ)
เช่น 1 ช้อนโต๊ะ หรือ 12.5 กรัม"
                            @keyup="validate.from ? '' : validateFrom()"
                        ></textarea>
                        <div
                            v-if="!validate.descriptionunit && !validate.from"
                            class="text-red-600 text-xs text-left mt-1"
                        >*{{ validatetext.descriptionunit }}</div>
                    </div>
                </div>
                <div class="flex xl:flex-row flex-col">
                    <div class="w-48 xl:text-right text-left mr-2">จำนวนแคลอรี่ต่อ 1 หน่วย :</div>
                    <div class="flex-grow">
                        <div class="flex items-center">
                            <input
                                id="kcalpunit"
                                v-model="ingredientsreq.kcalpunit"
                                type="number"
                                step="1"
                                class="flex-grow rounded-lg border-2 border-gray-200 px-3 mr-2"
                                @keyup="validate.from ? '' : validateFrom()"
                            />
                            <div class="text-gray-500">kcal.</div>
                        </div>
                        <div
                            v-if="!validate.kcalpunit && !validate.from"
                            class="text-red-600 text-xs text-left mt-1"
                        >*{{ validatetext.kcalpunit }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="!validate.all && !validate.from"
            class="text-red-600 text-xs text-center mt-1"
        >*{{ validatetext.all }}</div>
        <div
            class="mt-2 py-4 px-2 border-t-2 flex items-center xl:justify-end justify-around gap-x-3"
        >
            <div
                class="xl:w-2/12 w-4/12 py-0.5 border-2 rounded-lg text-center cursor-pointer"
                @click="$parent.$parent.RequestShow(false)"
            >ยกเลิก</div>
            <div
                class="xl:w-2/12 w-4/12 py-0.5 rounded-lg bg-orange border-2 border-orange text-white text-center cursor-pointer"
                @click="submitFrom()"
            >ส่งคำขอ</div>
        </div>
    </div>
</template>
<script>
import * as UserApi from '../utils/userApi'

export default {
    props: {
        ingredientstype: {
            type: Array,
            default() {
                return []
            }
        },
        foodtype: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ingredientsreq: {
                ingredientsname: '',
                kcalpunit: '',
                unit: '',
                descriptionunit: '',
                ingredientstype: null
            },
            foodtypereq: {
                typename: ''
            },
            validate: {
                ingredientsname: false,
                kcalpunit: false,
                unit: false,
                descriptionunit: false,
                ingredientstype: false,
                typename: false,
                all: false,
                from: true,
            },
            validatetext: {
                ingredientsname: '',
                kcalpunit: '',
                unit: '',
                descriptionunit: '',
                ingredientstype: '',
                typename: '',
                all: '',
            }
        }
    },
    methods: {
        async submitFrom() {
            this.validateFrom()
            if (this.validate.from) {
                let newrequest
                if (this.foodtype) {
                    newrequest = { foodtypereq: this.foodtypereq }
                } else {
                    newrequest = { ingredientsreq: this.ingredientsreq }
                }
                try {
                    const response = await UserApi.createRequest(newrequest)
                    if (response.data) {
                        this.$parent.$parent.requestadded()
                    }
                } catch (err) {
                    this.validate.from = false
                    const status = err.response?.data?.status

                    if (status === 5002) {
                        this.validatetext.all = 'ไม่พบคำข้อที่ส่งมา'
                        this.validate.all = false
                    }

                    if ([500, 400].includes(err.response?.status) || err.response === undefined) {
                        this.validatetext.all = 'ส่งข้อมูลไม่สำเร็จกรุณาลองใหม่'
                        this.validate.all = false
                    }
                }
            }
        },
        validateFrom() {
            if (this.foodtype) {
                if (this.foodtypereq.typename === '') {
                    this.validatetext.typename = 'กรุณาใส่ชื่อประเภทอาหาร'
                    this.validate.typename = false
                } else if (this.foodtypereq.typename.length > 50) {
                    this.validatetext.typename = 'ชื่อประเภทอาหารห้ามยาวกว่า 50 ตัวอักษร'
                    this.validate.typename = false
                } else {
                    this.validate.typename = true
                }
                this.validate.all = true
                this.validate.from = this.validate.typename
            } else {
                if (this.ingredientsreq.ingredientsname === '') {
                    this.validatetext.ingredientsname = 'กรุณาใส่ชื่อวัตถุดิบ'
                    this.validate.ingredientsname = false
                } else if (this.ingredientsreq.ingredientsname.length > 50) {
                    this.validatetext.ingredientsname = 'ชื่อวัตถุดิบห้ามยาวกว่า 50 ตัวอักษร'
                    this.validate.ingredientsname = false
                } else {
                    this.validate.ingredientsname = true
                }

                if (this.ingredientsreq.kcalpunit === '') {
                    this.validatetext.kcalpunit = 'กรุณาใส่แคลอรี่ต่อหน่วย'
                    this.validate.kcalpunit = false
                } else if (this.ingredientsreq.kcalpunit <= 0) {
                    this.validatetext.kcalpunit = 'แคลอรี่ต้องมากกว่า 0'
                    this.validate.kcalpunit = false
                } else {
                    this.ingredientsreq.kcalpunit = parseInt(this.ingredientsreq.kcalpunit)
                    this.validate.kcalpunit = true
                }

                if (this.ingredientsreq.unit === '') {
                    this.validatetext.unit = 'กรุณาใส่หน่วย'
                    this.validate.unit = false
                } else if (this.ingredientsreq.unit.length > 50) {
                    this.validatetext.unit = 'ชื่อหน่วยห้ามยาวกว่า 50 ตัวอักษร'
                    this.validate.unit = false
                } else {
                    this.validate.unit = true
                }

                if (this.ingredientsreq.descriptionunit === '') {
                    this.validatetext.descriptionunit = 'กรุณาใส่คำอธิบายหน่วย'
                    this.validate.descriptionunit = false
                } else if (this.ingredientsreq.descriptionunit.length > 255) {
                    this.validatetext.descriptionunit = 'คำอธิบายหน่วยห้ามยาวกว่า 255 ตัวอักษร'
                    this.validate.descriptionunit = false
                } else {
                    this.validate.descriptionunit = true
                }

                if (this.ingredientsreq.ingredientstype === null) {
                    this.validatetext.ingredientstype = 'กรุณาเลือกประเภทวัตถุดิบ'
                    this.validate.ingredientstype = false
                } else {
                    this.validate.ingredientstype = true
                }

                this.validate.typename = true
                this.validate.all = true
                this.validate.from = true
                Object.values(this.validate).forEach(v => {
                    this.validate.from = v && this.validate.from
                });
            }

        },
    },
}
</script>