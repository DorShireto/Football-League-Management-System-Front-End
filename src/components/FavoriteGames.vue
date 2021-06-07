<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.id"
      :homeTeam="g.hostTeam"
      :awayTeam="g.guestTeam"
      :date="g.date"
      :time="g.hour"
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
      games: [
        // {
        //   id: 25,
        //   hostTeam: "Maccabi Tel-Aviv",
        //   guestTeam: "Hapoel Beer-Sheva",
        //   date: "27/5/21",
        //   hour: "20:00",
        // },
        // {
        //   id: 39,
        //   hostTeam: "Hapoel Tel-Aviv",
        //   guestTeam: "Maccabi Haifa",
        //   date: "29/5/21",
        //   hour: "20:00",
        // },
      ],
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
        );
        console.log(response);
        const games = response.data;
        this.games = [];
        this.games.push(...games);
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
