<script setup lang="ts">
import {ref, watch} from "vue";
import {getCountryFromPhoneNumber, ParsingMethods} from "../../utils/phoneNumber";

const props = defineProps<{
	parsingMethod: ParsingMethods
}>()
const emit = defineEmits(['loaded'])

const phoneNumber = ref('')
const country = ref<string | undefined>('')

watch(phoneNumber, async () => {
	if (phoneNumber) {
		const countryInfos = await getCountryFromPhoneNumber(phoneNumber.value, props.parsingMethod)
		country.value = countryInfos?.countryCode
		emit('loaded', countryInfos?.countryCode)
	} else {
		country.value = ''
	}
})
</script>

<template>
	<div class="phone_input">
		<span>Téléphone : &nbsp;</span>
		<img v-if="country" :src="`https://countryflagsapi.com/png/${country}`" alt="Country flag" class="phone_input-flag">
		<input v-model="phoneNumber" type="tel" placeholder="+33614278409" class="phone_input-input">
	</div>
</template>

<style scoped lang="scss">
.phone_input {
	display: inline-flex;
	gap: 0.5rem;
	align-items: center;
	background: #747bff;
	border-radius: 12px;
	padding-inline: 1.5rem;
	padding-block: 1rem;
	color: white;
}
.phone_input-flag {
	height: 1.2rem;
}
.phone_input-input {
	font-size: 1rem;
	border-radius: 1rem;
	border: none;
	outline: none;
	color: white;
	width: 15ch;
	padding: 1rem;
	background-color: darken(#747bff, 2%);

	&::placeholder {
		color: white;
		opacity: 0.8;
	}
}
</style>
