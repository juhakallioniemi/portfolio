<template>
	<div id="brand-game">
		<h1 style="margin: 0">{{ gameTitle }}</h1>
		<div>{{ message }}</div>
		<!-- <div>Counter: {{ counter }}</div>
		<button v-on:click="increment">Increment</button>
		<Hello />-->
	</div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import Hello from "./components/Hello.vue";

@Component({
	components: {
		Hello,
	},
})
export default class App extends Vue {
	gameTitle = "Brand game";
	message = "Work in progress...";
	counter = 0;
	increment() {
		this.counter++;
	}

	created() {
		var arr = [8, 2, 4, 5, 2, 8];
		var sorted = arr.slice().sort(function (a, b) {
			return a - b;
		});
		console.log(sorted);
		var ranks = sorted.map(function (v, index) {
			return sorted.indexOf(v) + 1;
		});
		console.log(ranks);
	}
}
</script>