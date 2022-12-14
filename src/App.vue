<script setup lang="ts">
import {ref} from "vue";

import PhoneNumberInput from './components/inputs/PhoneNumberInput.vue'
import {ParsingMethods} from "./utils/phoneNumber";

const parsingMethod = ref<ParsingMethods>('STATIC')

const loadedCountry = ref('')

function setLoadedCountry(countryCode: string) {
	loadedCountry.value = countryCode
}
</script>

<template>
	<div class="description">Mode de parsing actuel : {{ parsingMethod === 'LIB' ? 'Librairie' : 'Statique'}}</div>

	<Component :is="PhoneNumberInput" :parsing-method="parsingMethod" @loaded="setLoadedCountry"/>

	<p v-if="loadedCountry" class="country">Pays trouvé : {{ loadedCountry }}</p>

	<div class="buttons">
		<button @click="parsingMethod = 'LIB'">Utiliser une librairie pour parser le numéro</button>
		<button @click="parsingMethod = 'STATIC'">Utiliser les données statiques pour parser le numéro</button>
	</div>

	<p class="info">La librairie est plus précise que ma fonction statique notamment pour les pays ayant le même indicatif comme les USA et le Canada (+1).</p>
</template>

<style scoped>
.description {
	margin-bottom: 3rem;
	font-weight: bold;
}
.buttons {
	display: flex;
	margin-inline: auto;
	margin-top: 3rem;
	justify-content: space-around;
	gap: 1rem;
}
.info {
	margin-inline: auto;
	width: 50ch;
	margin-top: 3rem;
}
</style>
