<template>
  <div>
    <h1>League Management Page</h1>
    <b-button v-b-modal.modal-addMatch class="m-2" variant="primary"
      >Add New Match</b-button
    >
    <b-modal
      id="modal-addMatch"
      title="Add New Match"
      scrollable
      v-model="showModal"
    >
      <AddMatch></AddMatch>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click="showModal = false"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
    <h3>Future Matches</h3>
    <GameTableC
      id="zain2"
      :items="futureMatches"
      :fields="futureTableField"
    ></GameTableC>
    <br />
    <h3>Previous Matches</h3>
    <GameTableC
      id="zain"
      :items="prevMatches"
      :fields="prevTableField"
      :selectable="true"
    ></GameTableC>

    <!-- <GameTableC
      id="matchesTable"
      :items="league_matches"
      :fields="league_matches_headers"
      :showAddEventBtn="true"
    ></GameTableC> -->
  </div>
</template>

<script>
import AddMatch from "../components/AddMatch.vue";
import GameTableC from "../components/GameTableC.vue";

export default {
  data() {
    return {
      league_matches: [],
      futureMatches: [],
      prevMatches: [],
      futureTableField: this.$root.store.future_match_headers,
      prevTableField: this.$root.store.matchHeaders_With_mec,
      league_matches_headers: this.$root.store.matchHeaders_With_mec,
      showModal: false,
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

    spliteMatches() {
      let allMatchesArray = this.league_matches;
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
  components: {
    AddMatch,
    GameTableC,
  },
  async mounted() {
    console.log("refresed");
    await this.loadMatches();
    this.spliteMatches();
  },
};
</script>

<style>
#mainpage {
  height: 100%;
}
</style>