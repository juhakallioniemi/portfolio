<template>
  <div id="brand-game">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: "Brand game"
    };
  }
};
</script>

<style>
#brand-game {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
</style>