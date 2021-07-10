<template>
  <div id="gameTableMain">
    <b-table
      striped
      :items="items"
      :fields="fields"
      sticky-header
      sort-icon-left
      :busy="isBusy"
      show-empty
      :filter="filter"
      responsive="sm"
      :selectable="selectable"
      :select-mode="selectMode"
    >
      <template
        class="col-sm"
        v-if="showFilter"
        slot="top-row"
        slot-scope="{ fields }"
      >
        <td v-for="field in fields" :key="field.key">
          <input v-model="filters[field.key]" :placeholder="field.label" />
        </td>
      </template>

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

      <!-- team logo click -->
      <template #cell(logoPicture)="row2">
        <a @click="moveToTeamPage(row2.item.name)" style="cursor: pointer">
          <img v-bind:src="row2.item.logoPicture" style="width: 50px" />
        </a>
      </template>

      <template #cell(editScore)="row">
        <b-button
          v-b-modal.modal-editScore
          size="sm"
          @click="handle_MEC_click(row)"
          class="mr-2 primary"
        >
          Edit Score
        </b-button>
      </template>

      <!-- team name click -->
      <template #cell(homeTeam)="row">
        <a @click="moveToTeamPage(row.item.homeTeam)" style="cursor: pointer"
          ><u style="text-decoration: none">{{ row.item.homeTeam }}</u></a
        >
      </template>

      <!-- team name click -->
      <template #cell(awayTeam)="row">
        <a @click="moveToTeamPage(row.item.awayTeam)" style="cursor: pointer"
          ><u style="text-decoration: none">{{ row.item.awayTeam }}</u></a
        >
      </template>

      <!-- team name click -->
      <template #cell(activeTeam)="row">
        <a @click="moveToTeamPage(row.item.activeTeam)" style="cursor: pointer"
          ><u style="text-decoration: none">{{ row.item.activeTeam }}</u></a
        >
      </template>

      <!-- team name click -->
      <template #cell(name)="row">
        <a @click="moveToTeamPage(row.item.name)" style="cursor: pointer"
          ><u style="text-decoration: none">{{ row.item.name }}</u></a
        >
      </template>

      <!-- player name click -->
      <template #cell(fullname)="row">
        <a @click="movetoPersonalPage(row.item.id)" style="cursor: pointer"
          ><u style="text-decoration: none">{{ row.item.fullname }}</u></a
        >
      </template>

      <!-- player logo click -->
      <template #cell(profilePicture)="row">
        <a @click="movetoPersonalPage(row.item.id)" style="cursor: pointer">
          <img v-bind:src="row.item.profilePicture" style="width: 50px" />
        </a>
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
      @hide="closeMecModal"
    >
      <MatchEventCalendar
        :matchData="matchData"
        :showAddEventBtn="showAddEventBtn"
      ></MatchEventCalendar>
    </b-modal>
    <b-modal
      id="modal-editScore"
      title="Edit Match Score"
      scrollable
      @hide="closeEditScoreModal"
    >
      <EditScoreForm
        v-on:closeEditScoreModalEvent="updateMatchScore"
      ></EditScoreForm>
      <template #modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-left"
            @click="closeEditScoreModal"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import MatchEventCalendar from "./MatchEventCalendar.vue";
import EditScoreForm from "./EditScoreForm.vue";
export default {
  data() {
    return {
      isBusy: true,
      selectMode: "single",
      matchData: {},
      filters: {
        // filets for columns filter, not working ATM
        id: "",
        position: "",
      },
    };
  },
  components: {
    MatchEventCalendar,
    EditScoreForm,
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
    selectable: {
      type: Boolean,
      required: false,
    },
    showFilter: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    updateMatchScore(score) {
      console.log(this.matchData);
      console.log(
        "updating scores with home:" +
          score.homeScore +
          "     away:" +
          score.awayScore
      );
      this.matchData.homeScore = score.homeScore;
      this.matchData.awayScore = score.awayScore;
      //write update to DB

      this.closeEditScoreModal();
    },

    handle_MEC_click(item) {
      this.matchData = item.item;
      // this.$bvModal.show("modal-mec");
    },
    closeMecModal() {
      this.$bvModal.hide("modal-mec");
    },
    movetoPersonalPage(playerId) {
      console.log(playerId);
      this.$router.push({ name: "playerpage", params: { playerId: playerId } });
    },
    closeEditScoreModal() {
      this.$bvModal.hide("modal-editScore");
    },
    async moveToTeamPage(teamName) {
      console.log(teamName);
      let res = await this.axios.get(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/teams/" +
          teamName +
          "/id"
      );
      // console.log(res);
      //save the current route
      let currentRoute = this.$route.name;
      this.$router.push({
        name: "teampage",
        params: { teamId: res.data.teamId },
      });
      if (currentRoute == "teampage") this.$router.go(); //refresh page
    },
  },

  updated() {
    this.isBusy = false;
  },
  computed: {
    filtered() {
      // filter by columns.. (not working atm)
      const filtered = this.items.filter((item) => {
        return Object.keys(this.filters).every((key) =>
          String(item[key]).includes(this.filters[key])
        );
      });
      return filtered.length > 0
        ? filtered
        : [
            {
              id: "",
              position: "",
            },
          ];
    },
  },

  // mounted() {
  //   $(this.$refs.mymodal).on("hidden.bs.modal", this.dor);
  // },
};
</script>
<style >
</style>

