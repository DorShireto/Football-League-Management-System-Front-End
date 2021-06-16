<template>
  <div>
    <h1>League Management Page</h1>
    <b-button
      class="mb-2"
      variant="primary"
      @click="$bvToast.show('addMatch-toast')"
    >
      Add New Match
    </b-button>
    <b-toast id="addMatch-toast" title="Add New Match" static no-auto-hide>
      <!-- <AddMatch v-show="displayAddMatch"></AddMatch> -->
      <AddMatch></AddMatch>
    </b-toast>
    <GameTableC
      :items="league_matches"
      :fields="league_matches_headers"
    ></GameTableC>
  </div>
</template>

<script>
import AddMatch from "../components/AddMatch.vue";
import GameTableC from "../components/GameTableC.vue";
export default {
  data() {
    return {
      league_matches: [],
      league_matches_headers: this.$root.store.matchHeaders_WO_mec,
      //   league_matches_headers: this.$root.store.matchHeaders_With_mec,
    };
  },
  methods: {
    async loadMatches() {
      console.log("league management page mounted");
      const matches = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/league/matches"
      );
      console.log(matches);
      this.league_matches = matches.data;
    },
  },
  components: {
    AddMatch,
    GameTableC,
  },
  async mounted() {
    this.loadMatches();
  },
};
</script>

<style>
</style>