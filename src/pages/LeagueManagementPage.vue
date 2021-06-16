<template>
  <div>
    <h1>League Management Page</h1>
    <b-button
      class="m-2"
      variant="primary"
      @click="$bvToast.show('addMatch-toast')"
    >
      Add New Match
    </b-button>
    <b-toast id="addMatch-toast" title="Add New Match" static no-auto-hide>
      <AddMatch></AddMatch>
    </b-toast>
    <b-button
      class="m-2"
      variant="primary"
      @click="$bvToast.show('mec-toast')"
      v-show="mec"
    >
      Match Event Calendar
    </b-button>
    <b-toast id="mec-toast" title="Match Event Calendar" static no-auto-hide>
      <MatchEventCalendar :matchEventCalendar="this.mec"></MatchEventCalendar>
    </b-toast>

    <GameTableC
      :items="league_matches"
      :fields="league_matches_headers"
      v-on:rowClicked="getRowData"
    ></GameTableC>
  </div>
</template>

<script>
import AddMatch from "../components/AddMatch.vue";
import GameTableC from "../components/GameTableC.vue";
import MatchEventCalendar from "../components/MatchEventCalendar.vue";
export default {
  data() {
    return {
      league_matches: [],
      league_matches_headers: this.$root.store.matchHeaders_WO_mec,
      mec: null,
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
    getRowData(data) {
      this.mec = data.matchEventCalendar;
    },
  },
  components: {
    AddMatch,
    GameTableC,
    MatchEventCalendar,
  },
  async mounted() {
    this.loadMatches();
  },
};
</script>

<style>
</style>