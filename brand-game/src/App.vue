<template>
  <div id="app">
    <a :href="urlBackToPortfolio">Back</a>
    <!-- <a href="/">Back</a> -->
    {{ message }}
  </div>
</template>

<script>
export default {
  created() {
    console.log(location.pathname.length);
  },
  data() {
    return {
      message: "Hello World",
      urlBackToPortfolio: location.pathname.split("/")[1]
    };
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
</style>