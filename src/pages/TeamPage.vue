<template>
  <div id="teamPage">
    <div class="container">
      <h1>Welcome to {{ name }} Page!</h1>
      Future matches: <br />
      <b-row>
        <GamesTables></GamesTables>
      </b-row>
      <!-- <b-row>
        <GamesTables :prevMatches="prevMatches"></GamesTables>
      </b-row> -->
    </div>
  </div>
</template>

<script>
import GamesTables from "../components/GamesTables.vue";
export default {
  name: "TeamPage",
  components: {
    GamesTables,
  },
  data() {
    return {
      futureMatches: [],
      prevMatches: [],
      players: [],
      name: "",
      logoURL: "",
    };
  },
  async mounted() {
    alert(this.$route.params.teamId);
    console.log("team page mounted");
    const response = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/teams/page/id/" +
        this.$route.params.teamId
    );
    console.log(response);
    debugger;
    this.futureMatches = response.data.futureMatches;
    this.prevMatches = response.data.prevMatches;
    this.players = response.data.players;
    this.name = response.data.name;
    this.logoURL = response.data.logoURL;
  },
};
</script>

<style>
</style>