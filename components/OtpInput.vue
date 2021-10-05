<template>
    <div class="my-6 flex xl:mx-0 mx-auto w-min">
        <input
            v-for="(input, index) in length"
            :id="index"
            :ref="index"
            :key="index"
            v-model="inputValues[index]"
            type="text"
            maxlength="1"
            class="focus:outline-none border-b-4 focus:border-lightorange mx-1 text-center"
            :class="[{ 'border-lightorange': inputValues[index]}, classtext ]"
            @input="returnFullString()"
            @keypress="handleKeypress"
            @keyup="handleInputFocus(index)"
            @paste.prevent="handlePastedValues"
        />
    </div>
</template>
<script>
export default {
    props: {
        classtext: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            inputValues: [],
            length: 6
        }
    },
    methods: {
        returnFullString() {
            this.$emit('input', this.inputValues.join(''));
        },
        handleKeypress(event) {
            if (isNaN(event.key) || event.key === ' ') {
                event.preventDefault()
            }
        },
        handleInputFocus(index) {
            if (this.inputValues[index] && this.inputValues[index] !== '' && index < this.length - 1) {
                const [nextInput] = this.$refs[`${index + 1}`];
                nextInput.focus();
            } else if (index > 0 && (!this.inputValues[index] || this.inputValues[index] === '')) {
                const [previusInput] = this.$refs[`${index - 1}`];
                previusInput.focus();
            }
        },
        handlePastedValues(event) {
            const pastedValue = event.clipboardData?.getData('text/plain');
            const splitValues = pastedValue.split('');
            let last = 0
            for (let i = 0; i < splitValues.length; i++) {
                const values = splitValues[i]
                if(last === this.length){
                    break
                }
                if(isNaN(values) || values === ' '){
                    continue
                }
                this.updateInputValue(last++, splitValues[i]);
            }
            const [lastInput] = this.$refs[`${last === this.length? last - 1 : last }`];
            lastInput.focus();
            this.returnFullString();
        },
        updateInputValue(index, value) {
            this.$set(this.inputValues, index, value);
        }
    }
}
</script>