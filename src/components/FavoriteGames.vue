<template>
  <div>
    <h1>MY FAVORITE GAMES:</h1>
    <div v-show="this.loading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
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
    <h1 v-if="games.length == 0 && !this.loading">
      {{ msg }}
    </h1>
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
      loading: true,
      games: [],
      msg: "",
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
          if (this.games.length < 3 && new Date(game.date) >= new Date()) {
            // no more than 3 FUTURE(!) games
            this.games.push(game);
          }
        });
        console.log(response);
        this.loading = false;
      } catch (error) {
        this.loading = false;

        if (error.response.status == 404) {
          this.msg = "No Favorite Games To Display";
        } else if (error.response.status == 401)
          this.msg = "Error Accured: Unauthorized";

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
