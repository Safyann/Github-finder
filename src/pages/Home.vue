<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- search -->
        <search :value="search" placeholder="Type username..." @search="search = $event" />
        <button class="btn btnPrimary" @click="getRepos">Search!</button>
      </div>
    </section>
  </div>
</template>

<script>
import search from "../components/Search";
export default {
  components: {
    search
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    getRepos() {
      console.log(`get user ${this.search} repos`);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

button {
  margin-top: 40px;
}
</style>
