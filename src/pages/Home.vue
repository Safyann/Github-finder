<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- errors -->
        <div class="error" v-if="error" style="margin-bottom: 20px">
          <p>{{ error }}</p>
        </div>

        <!-- search -->
        <search :value="search" placeholder="Type username..." @search="search = $event" />

        <!-- buttons -->
        <button class="btn btnPrimary" @click="getUser">Search!</button>

        <div class="user__wrapper" v-if="user">
          <div class="user-avatar">
            <img :src="user.avatar_url" :alt="user.name" />
          </div>
          <div class="user-info">
            <p>{{ user.name }}</p>
            <p>public repos: {{ user.public_repos }}</p>
          </div>
        </div>

        <!-- wrapper -->
        <div class="repos__wrapper" v-if="repos">
          <div class="repo-item">
            <div class="repos-info">
              <span @click="sort('name')">Name &#8595;</span>
              <span @click="sort('stargazers_count')">Stars &#8595;</span>
            </div>
          </div>

          <!-- item -->
          <div class="repo-item" v-for="repo in reposSort" :key="repo.id">
            <div class="repos-info">
              <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
              <span>{{ repo.stargazers_count }}⭐</span>
            </div>
          </div>

          <div class="button-list">
            <!-- <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
            <p>
              page {{ this.page.current }} from
              {{ Math.ceil(this.repos.length / this.page.length) }}
            </p>
            <div class="btn btnPrimary" @click="nextPage">&#8594;</div>-->

            <button
              class="btn btnPrimary"
              @click="loadMore"
              :disabled="page.length >= repos.length"
              :class="{ btnDisabled: page.length >= repos.length }"
            >Load more</button>
          </div>
        </div>
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
      search: "",
      page: {
        current: 1,
        length: 3
      }
    };
  },
  computed: {
    reposSort() {
      return this.repos
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
        });
    },
    repos() {
      return this.$store.getters.getRepos;
    },
    user() {
      return this.$store.getters.getUser;
    },
    error() {
      return this.$store.getters.getError;
    },
    currentSort() {
      return this.$store.getters.getCurrentSort;
    },
    currentSortDir() {
      return this.$store.getters.getCurrentSortDir;
    }
  },
  methods: {
    getUser() {
      this.page.length = 3;
      this.$store.dispatch("setUser", this.search);
    },

    sort(e) {
      this.$store.dispatch("changeCurrentSort", e);
    },

    prevPage() {
      if (this.page.current > 1) this.page.current -= 1;
    },

    nextPage() {
      if (this.page.current * this.page.length < this.repos.length)
        this.page.current += 1;
    },

    loadMore() {
      this.page.length += 3;
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

.repos__wrapper {
  width: 400px;
  margin: 30px 0;
}

.repos-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}

.user__wrapper {
  display: flex;
  margin: 30px 0;
}

img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 16px;
}

.button-list {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;

  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
}

button {
  margin-top: 20px;
  &.btnDisabled {
    cursor: default;
    opacity: 0.6;
  }
}
</style>
