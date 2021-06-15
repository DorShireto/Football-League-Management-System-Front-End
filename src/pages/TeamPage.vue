<template>
  <div id="teamPage">
    <div class="container">
      <h1>Welcome to {{ name }} Page!</h1>
      Future matches: <br />
      <b-row>
        <GamesTablesC
          :items="futureMatches"
          :fields="futureTableField"
        ></GamesTablesC>
      </b-row>
      Away matches: <br />
      <b-row>
        <GamesTablesC
          :items="prevMatches"
          :fields="prevMatchesField"
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
      futureTableField: [],
      prevMatches: [],
      prevMatchesField: [],
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
          "/teams/page/id/" +
          this.$route.params.teamId
      );
      return response;
    },

    setAllData(teamData) {
      this.addFutureMatches(teamData.data.futureMatches);
      this.addPrevMatches(teamData.data.prevMatches);
      this.players = teamData.data.players;
      this.name = teamData.data.name;
      this.logoURL = teamData.data.logoURL;
      debugger;
    },
    addFutureMatches(data) {
      this.futureTableField = [
        { key: "id" },
        { key: "home_team" },
        { key: "away_team" },
        { key: "date" },
        { key: "time" },
        { key: "stadium" },
      ];
      for (let index = 0; index < data.length; index++) {
        let match = data[index];
        let { id, homeTeam, awayTeam, date, time, stadium } = match;
        this.futureMatches.push({
          id: id,
          home_team: homeTeam,
          away_team: awayTeam,
          date: date,
          time: time,
          stadium: stadium,
        });
      }
    },
    addPrevMatches(data) {
      this.prevMatchesField = [
        { key: "id" },
        { key: "league_name" },
        { key: "season_name" },
        { key: "stage_name" },
        { key: "home_team" },
        { key: "away_team" },
        { key: "home_score" },
        { key: "away_score" },
        { key: "main_referee" },
        { key: "first_line_referee" },
        { key: "secone_line_referee" },
        { key: "date" },
        { key: "time" },
        { key: "stadium" },
      ];
      for (let index = 0; index < data.length; index++) {
        let match = data[index];
        let {
          id,
          leagueName,
          seasonName,
          stageName,
          homeTeam,
          awayTeam,
          date,
          time,
          refereeName,
          lineReferee1,
          lineReferee2,
          stadium,
        } = match;
        let { homeScore, awayScore } = match.result;
        this.prevMatches.push({
          id: id,
          league_name: leagueName,
          season_name: seasonName,
          stage_name: stageName,
          home_team: homeTeam,
          away_team: awayTeam,
          home_score: homeScore,
          away_score: awayScore,
          main_referee: refereeName,
          first_line_referee: lineReferee1,
          secone_line_referee: lineReferee2,
          date: date,
          time: time,
          stadium: stadium,
        });
      }
    },
  },

  async mounted() {
    alert(this.$route.params.teamId);
    const teamData = await this.getTeamData();
    this.setAllData(teamData);
    // console.log("team page mounted");
    // const response = await this.axios.get(
    //   this.$root.store.server_domain +
    //     this.$root.store.server_port +
    //     "/teams/page/id/" +
    //     this.$route.params.teamId
    // );
    // console.log(response);
    // debugger;
    // this.futureMatches = response.data.futureMatches;
    // this.prevMatches = response.data.prevMatches;
    // this.players = response.data.players;
    // this.name = response.data.name;
    // this.logoURL = response.data.logoURL;
  },
};
</script>

<style>
</style>