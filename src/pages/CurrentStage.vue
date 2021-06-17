<template>
  <div>
    <H1>Current Stage Page</H1>
    <H2>Super League Season 2020/2021</H2>
    <br />
    <H3>Future Matches</H3>
    <GamesTablesC
      :items="futureMatches"
      :fields="futureTableField"
    ></GamesTablesC>
    <br />
    <H3>Previous Matches</H3>
    <GamesTablesC :items="prevMatches" :fields="prevTableField"></GamesTablesC>
  </div>
</template>

<script>
import GamesTablesC from "../components/GameTableC.vue";
export default {
  name: "CurrentStage",
  components: {
    GamesTablesC,
  },
  data() {
    return {
      futureMatches: [],
      futureTableField: [
        "id",
        "homeTeam",
        "awayTeam",
        "date",
        "time",
        "stadium",
      ],
      prevMatches: [],
      prevTableField: [
        "id",
        "homeTeam",
        "awayTeam",
        "homeScore",
        "awayScore",
        "date",
        "time",
        "stadium",
        "matchEventCalendar",
      ],
    };
  },
  methods: {
    async getAllMatches() {
      const allMatches = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/league/matches"
      );
      return allMatches;
    },
    async setAllData(allMatches) {
      let allMatchesArray = allMatches.data;
      //split games to previuos and future games
      let date_ob = new Date();
      const current_date = date_ob;
      let tmpPrevGames = [];
      let tmpFutureGames = [];
      for (let index = 0; index < allMatchesArray.length; index++) {
        const match = allMatchesArray[index];
        if (Date.parse(match.date) < Date.parse(current_date)) {
          // past game
          tmpPrevGames.push(match);
        } else {
          // future matches
          tmpFutureGames.push(match);
        }
      }
      this.futureMatches = tmpFutureGames;
      this.prevMatches = tmpPrevGames;
      // debugger;
    },
  },

  async mounted() {
    const allMatches = await this.getAllMatches();
    await this.setAllData(allMatches);
  },
};
</script>

<style>
</style>