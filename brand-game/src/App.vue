<template>
  <div id="brand-game">
    <h1>{{ gameTitle }}</h1>
    <div>{{message}}</div>
    <div>Counter: {{ counter }}</div>
    <button v-on:click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameTitle: "Brand game",
      message: "Work in progress...",
      counter: 0
    };
  },
  methods: {
    increment() {
      this.counter++;
    }
  }
};
</script>