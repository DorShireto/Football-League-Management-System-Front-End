<template>
  <div id="gameTableMain">
    <b-table
      striped
      :items="items"
      :fields="fields"
      sticky-header
      sort-icon-left
      :busy="isBusy"
      :filter="filter"
      responsive="sm"
    >
      <template #cell(matchEventCalendar)="row">
        <b-button
          v-b-modal.modal-mec
          size="sm"
          @click="handle_MEC_click(row)"
          class="mr-2"
        >
          Event Calendar
        </b-button>
      </template>

      <template #cell(logoURL)="row2">
        <img v-bind:src="row2.item.logoURL" />
      </template>

      <template #cell(homeTeam)="row">
        <a @click="moveToTeamPage(row.item.homeTeam)">{{
          row.item.homeTeam
        }}</a>
      </template>

      <template #cell(awayTeam)="row">
        <a @click="moveToTeamPage(row.item.awayTeam)">{{
          row.item.awayTeam
        }}</a>
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <b-modal
      id="modal-mec"
      title="Match Event Calendar"
      scrollable
      @hide="closeModal"
    >
      <MatchEventCalendar
        :matchData="matchData"
        :showAddEventBtn="showAddEventBtn"
      ></MatchEventCalendar>
    </b-modal>
  </div>
</template>

<script>
import MatchEventCalendar from "./MatchEventCalendar.vue";
export default {
  data() {
    return {
      isBusy: true,
      selectMode: "single",
      matchData: {},
    };
  },
  components: {
    MatchEventCalendar,
  },
  props: {
    filter: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: false,
    },
    showAddEventBtn: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    handle_MEC_click(item) {
      this.matchData = item.item;
      // this.$bvModal.show("modal-mec");
    },
    closeModal() {
      this.$bvModal.hide("modal-mec");
    },
    async moveToTeamPage(teamName) {
      console.log(teamName);
      let teamId = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/teams/" +
          teamName +
          "/id"
      );
      this.$router.push({ name: "teampage", params: { teamId: teamId } });
    },
  },
  updated() {
    this.isBusy = false;
  },

  // mounted() {
  //   $(this.$refs.mymodal).on("hidden.bs.modal", this.dor);
  // },
};
</script>
<style >
</style>

