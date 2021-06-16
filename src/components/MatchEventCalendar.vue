<template>
  <div>
    <h1>MATCH EVENT CALENDAR</h1>
    <div
      v-for="event in matchEventCalendar"
      :key="event.id"
      style="border: solid; margin-top: 5px; padding: 5px"
    >
      <b>Minute In Match: </b>{{ event.minInMatch }}<br />
      <b>Description: </b>{{ event.description }}<br />
      <b>Team Name: </b>{{ event.teamName }}<br />
      <b>Type: </b>{{ event.type }}<br />
      <b>Player Name: </b>{{ event.playerName }}<br />
      <br />
    </div>
    <b-button v-b-modal.modal-1>Add Event</b-button>

    <b-modal id="modal-1" title="Add Event To Match Event Calendar">
      <NewEventForm></NewEventForm>
      <!-- <p class="my-4">Hello from modal!</p> -->
    </b-modal>

    <!-- <p>Minute In Match:{{ matchEventCalendar.minInMatch }}</p> -->
    <!-- <p>Minute In Match:{{ matchEventCalendar.minInMatch }}</p> -->
  </div>
</template>

<script>
import NewEventForm from "../components/EventForm.vue";
export default {
  name: "MatchEventCalendar",
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    NewEventForm,
  },
  props: {
    matchEventCalendar: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openEventModal() {},
    addEvent() {
      alert("dsa");
    },
  },
};
</script>

<style>
</style>