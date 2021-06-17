<template>
  <div class="d-flex flex-column align-items-center">
    <h1>MY FAVORITE GAMES:</h1>
    <!-- <div v-show="this.loading">
      <b-spinner label="Loading..."></b-spinner>
    </div> -->
    <div class="row">
      <GameTableC :items="games" :fields="tableHeaders"></GameTableC>
      <!-- <GamePreview
        v-for="g in games"
        :id="g.id"
        :homeTeam="g.homeTeam"
        :awayTeam="g.awayTeam"
        :date="g.date"
        :time="g.time"
        :stadium="g.stadium"
        :key="g.id"
        class="col"
      ></GamePreview> -->
      <h1 v-if="games.length == 0 && !this.loading">
        {{ msg }}
      </h1>
    </div>
  </div>
</template>

<script>
import GameTableC from "../components/GameTableC.vue";
// import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    // GamePreview,
    GameTableC,
  },
  data() {
    return {
      tableHeaders: ["id", "date", "time", "homeTeam", "awayTeam", "stadium"],
      loading: true,
      games: [],
      msg: "",
    };
  },
  props: {
    num_of_games_to_display: {
      type: String,
      required: true,
    },
  },
  methods: {
    async updateGames() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain +
            this.$root.store.server_port +
            "/users/favoriteMatches"
          // { withCredentials: true }
        );
        // console.log(response);
        const games = response.data;
        this.games = [];
        // sort games by date asc
        games.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        games.forEach((game) => {
          if (
            this.games.length < this.num_of_games_to_display &&
            new Date(game.date) >= new Date()
          ) {
            // no more than 3 FUTURE(!) games
            this.games.push(game);
          }
        });
        // console.log(response);
        this.loading = false;
      } catch (error) {
        this.loading = false;

        if (error.response.status == 404) {
          this.msg = "No Favorite Games To Display";
        } else if (error.response.status == 401)
          this.msg = "Error Accured: Unauthorized";
        else {
          console.log("error in update games");
          console.log(error);
        }
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
