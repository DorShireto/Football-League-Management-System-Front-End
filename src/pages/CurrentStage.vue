<template>
  <div>
    <H1>Current Stage Page</H1>
    <H2>Super League Season 2020/2021</H2>
    <br />
    <H3>Future Matches</H3>
    <GamesTableC
      id="zain2"
      :items="futureMatches"
      :fields="futureTableField"
    ></GamesTableC>
    <br />
    <H3>Previous Matches</H3>
    <GamesTableC
      id="zain"
      :items="prevMatches"
      :fields="prevTableField"
    ></GamesTableC>
  </div>
</template>


<script>
import GamesTableC from "../components/GameTableC.vue";
export default {
  name: "CurrentStage",
  components: {
    GamesTableC,
  },
  data() {
    return {
      futureMatches: [],
      prevMatches: [],
      futureTableField: this.$root.store.future_match_headers,
      prevTableField: this.$root.store.matchHeaders_With_mec,
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