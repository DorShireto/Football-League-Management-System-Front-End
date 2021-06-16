<template>
  <div id="teamPage">
    <div class="container">
      <h1>Welcome to {{ name }} Page!</h1>
      Future Matches: <br />
      <b-row>
        <GamesTablesC
          :items="futureMatches"
          :fields="futureTableField"
        ></GamesTablesC>
      </b-row>
      Previous Matches: <br />
      <b-row>
        <GamesTablesC
          :items="prevMatches"
          :fields="prevTableField"
        ></GamesTablesC>
      </b-row>
      <b-row>
        <PlayerPreview
          v-for="player in players"
          :key="player.id"
          :fullName="player.fullname"
          :activeTeam="player.activeTeam"
          :id="player.id"
          :position="player.position"
          :profilePicURL="player.profilePicURL"
        ></PlayerPreview>
      </b-row>
    </div>
  </div>
</template>

<script>
import GamesTablesC from "../components/GameTableC.vue";
import PlayerPreview from "../components/PlayerPreview.vue";
export default {
  name: "TeamPage",
  components: {
    GamesTablesC,
    PlayerPreview,
  },
  data() {
    return {
      futureMatches: [],
      futureTableField: [
        "id",
        "leagueName",
        "seasonName",
        "seasonName",
        "seasonName",
        "stageName",
        "homeTeam",
        "awayTeam",
        "refereeName",
        "lineReferee1",
        "lineReferee2",
        "date",
        "time",
        "stadium",
      ],
      prevMatches: [],
      prevTableField: [
        "id",
        "leagueName",
        "seasonName",
        "seasonName",
        "seasonName",
        "stageName",
        "homeTeam",
        "awayTeam",
        "homeScore",
        "awayScore",
        "refereeName",
        "lineReferee1",
        "lineReferee2",
        "date",
        "time",
        "stadium",
      ],
      players: [],
      name: "",
      logoURL: "",
    };
  },
  methods: {
    async getTeamData() {
      const response = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/teams/page/" +
          this.$route.params.teamId
      );
      return response;
    },

    async setAllData(teamData) {
      this.futureMatches = teamData.data.futureMatches;
      this.futureTableField = this.$root.store.future_match_headers;
      this.prevMatches = teamData.data.prevMatches;
      this.prevTableField = this.$root.store.matchHeaders_WO_mec;
      this.players = teamData.data.players;
      this.name = teamData.data.name;
      this.logoURL = teamData.data.logoURL;
    },
  },

  async mounted() {
    const teamData = await this.getTeamData();
    await this.setAllData(teamData);
  },
};
</script>

<style>
</style>