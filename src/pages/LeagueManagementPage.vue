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
      league_matches_headers: this.$root.store.matchHeaders_With_mec,
      showModal: false,
      matchData: null,
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