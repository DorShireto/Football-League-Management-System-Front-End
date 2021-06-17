<template>
  <div>
    <h3>MATCH EVENT CALENDAR</h3>
    <div
      v-for="event in matchEventCalendar"
      :key="event.id"
      style="border: solid; margin: 5px; padding: 5px"
    >
      <b>Minute In Match: </b>{{ event.minInMatch }}<br />
      <b>Description: </b>{{ event.description }}<br />
      <b>Team Name: </b>{{ event.teamName }}<br />
      <b>Type: </b>{{ event.type }}<br />
      <b>Player Name: </b>{{ event.playerName }}<br />
      <br />
    </div>
    <b-button v-b-modal.modal-1>Add Event</b-button>

    <b-modal
      id="modal-1"
      title="Add Event To Match Event Calendar"
      @ok="addEvent"
    >
      <EventForm
        v-on:dataUpdated="handleEventFormChange"
        :matchData="matchData"
      ></EventForm>
      <!-- <p class="my-4">Hello from modal!</p> -->
    </b-modal>

    <!-- <p>Minute In Match:{{ matchEventCalendar.minInMatch }}</p> -->
    <!-- <p>Minute In Match:{{ matchEventCalendar.minInMatch }}</p> -->
  </div>
</template>

<script>
import EventForm from "../components/EventForm.vue";
export default {
  name: "MatchEventCalendar",
  data() {
    return {
      showModal: false,
      newEvent: {
        minInMatch: "",
        description: "",
        teamName: "",
        type: "",
        playerName: "",
      },
    };
  },
  components: {
    EventForm,
  },
  props: {
    matchData: {
      type: Object,
      required: true,
    },
    matchId: {
      type: Number,
      required: true,
    },
    matchEventCalendar: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openEventModal() {},
    async addEvent() {
      // only at this point we use the data
      console.log(
        "MEC: ok btn clicked in new event form. adding data to match event calendar"
      );
      this.matchEventCalendar.push({
        minInMatch: this.newEvent.minInMatch,
        description: this.newEvent.description,
        teamName: this.newEvent.teamName,
        type: this.newEvent.type,
        playerName: this.newEvent.playerName,
      });
      //   write the event to DB:
      const response = await this.axios.post(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/league/addMatchEvent",
        {
          matchId: this.matchId,
          teamName: this.newEvent.teamName,
          description: this.newEvent.description,
          type: this.newEvent.type,
          playerName: this.newEvent.playerName,
          minInMatch: this.newEvent.minInMatch,
        }
      );
    },
    handleEventFormChange(eventFormData) {
      //copy data from event to local variables on every change
      this.newEvent.minInMatch = eventFormData.minInMatch;
      this.newEvent.description = eventFormData.description;
      this.newEvent.teamName = eventFormData.teamName;
      this.newEvent.type = eventFormData.type;
      this.newEvent.playerName = eventFormData.playerName;
    },
  },
};
</script>

<style>
</style>