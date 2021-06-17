<template>
  <div id="teamPage">
    <div class="">
      <div class="text-center">
        <h1>Welcome to {{ name }} Page!</h1>
        <img v-bind:src="logoURL" style="width: 300px" /><br />
      </div>
      <h3>Future Matches:</h3>
      <br />

      <GamesTableC
        :items="futureMatches"
        :fields="futureTableField"
      ></GamesTableC>

      <h3>Previous Matches:</h3>
      <br />
      <GamesTableC :items="prevMatches" :fields="prevTableField"></GamesTableC>
      <div class="d-flex flex-wrap justify-content-center">
        <PlayerPreview
          v-for="player in players"
          :key="player.id"
          :fullName="player.fullname"
          :activeTeam="player.activeTeam"
          :id="player.id"
          :position="player.position"
          :profilePicURL="player.profilePicURL"
        ></PlayerPreview>
      </div>
    </div>
  </div>
</template>

<script>
import GamesTableC from "../components/GameTableC.vue";
import PlayerPreview from "../components/PlayerPreview.vue";
export default {
  name: "TeamPage",
  components: {
    GamesTableC,
    PlayerPreview,
  },
  data() {
    return {
      futureMatches: [],
      futureTableField: [
        "id",
        "leagueName",
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
        "matchEventCalendar",
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
      this.prevTableField = this.$root.store.matchHeaders_With_mec;
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