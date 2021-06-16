<template>
  <div>
    <h1>League Management Page</h1>
    <b-button v-b-modal.modal-addMatch class="m-2" variant="primary"
      >Add New Match</b-button
    >
    <b-modal id="modal-addMatch" title="Add New Match">
      <AddMatch></AddMatch>
    </b-modal>
    <!-- <b-button
      class="m-2"
      variant="primary"
      @click="$bvToast.show('addMatch-toast')"
    >
      Add New Match
    </b-button>
    <b-toast id="addMatch-toast" title="Add New Match" static no-auto-hide>
    </b-toast> -->

    <b-button v-b-modal.modal-mec class="m-2" variant="primary"
      >Match Event Calendar</b-button
    >
    <b-modal id="modal-mec" title="Add Event To Match Event Calendar">
      <MatchEventCalendar :matchEventCalendar="this.mec"></MatchEventCalendar>
    </b-modal>

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