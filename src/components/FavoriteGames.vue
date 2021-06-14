<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.id"
      :homeTeam="g.homeTeam"
      :awayTeam="g.awayTeam"
      :date="g.date"
      :time="g.time"
      :stadium="g.stadium"
      :key="g.id"
    ></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview,
  },
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async updateGames() {
      console.log("response");
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/favoriteMatches"
          // { withCredentials: true }
        );
        console.log(response);
        const games = response.data;
        this.games = [];
        // sort games by date asc
        games.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        games.forEach((game) => {
          if (this.games.length < 3) {
            this.games.push(game);
          }
        });
        // this.games.push(...games);
        console.log(response);
      } catch (error) {
        console.log("error in update games");
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("favorite games mounted");
    this.updateGames();
  },
};
</script>

<style></style>
