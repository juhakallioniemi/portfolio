<template>
	<div id="brand-game">
		<h1 style="margin: 0">{{ gameTitle }}</h1>
		<div>{{message}}</div>
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
		Hello
	}
})
export default class App extends Vue {
	gameTitle = "Brand game";
	message = "Work in progress...";
	counter = 0;
	increment() {
		this.counter++;
	}
}
</script>