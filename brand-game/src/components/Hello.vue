<template>
	<div>{{msg}}</div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Hello extends Vue {
	msg = "Hello from Hello-component!";

	created() {
		console.log(this.msg);
	}
}
</script>