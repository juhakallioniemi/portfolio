<template>
  <div id="brand-game">
    <h1>{{ gameTitle }}</h1>
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameTitle: "Brand game",
      message: "Work in progress..."
    };
  }
};
</script>