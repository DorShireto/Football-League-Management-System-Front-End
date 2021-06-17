<template>
  <div id="gameTableMain">
    <b-table
      striped
      :items="items"
      :fields="fields"
      sticky-header
      sort-icon-left
      :busy="isBusy"
      responsive="sm"
    >
      <template #cell(matchEventCalendar)="row">
        <b-button size="sm" @click="handle_MEC_click(row)" class="mr-2">
          Event Calendar
        </b-button>
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <b-modal id="modal-mec" title="Match Event Calendar" scrollable>
      <MatchEventCalendar :matchData="matchData"></MatchEventCalendar>
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
    items: {
      type: Array,
      required: false,
    },
    fields: {
      type: Array,
      required: false,
    },
  },

  methods: {
    handle_MEC_click(item) {
      this.matchData = item.item;
      this.$bvModal.show("modal-mec");
    },
  },
  updated() {
    this.isBusy = false;
  },
};
</script>
<style >
#gameTableMain {
  min-height: 70%;
}
</style>

