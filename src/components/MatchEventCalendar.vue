<template>
  <div>
    <h5 v-if="!matchEventCalendar.length">
      Currently there are no events to display
    </h5>
    <b-button v-b-modal.modal-1>Add Event</b-button>

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

    <b-modal
      id="modal-1"
      title="Add New Match Event"
      @ok="addEvent"
      v-model="showModal"
    >
      <EventForm
        v-on:closeModalEvent="handleCloseModal"
        :matchData="matchData"
      ></EventForm>
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
      matchEventCalendar: [],
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
  },
  mounted() {
    this.matchEventCalendar = this.matchData.matchEventCalendar;
  },
  methods: {
    async addEvent() {
      // only at this point we use the data
      console.log("adding data to match event calendar");
      //build object to add to matchEventCalendar
      let eventToadd = {
        matchId: this.matchData.id,
        minInMatch: this.newEvent.minInMatch,
        description: this.newEvent.description,
        teamName: this.newEvent.teamName,
        type: this.newEvent.type,
        playerName: this.newEvent.playerName,
      };
      this.matchEventCalendar.push(eventToadd);
      console.log(eventToadd);
      //   write the event to DB:
      const response = await this.axios.post(
        this.$root.store.server_domain +
          this.$root.store.server_port +
          "/league/addMatchEvent",
        eventToadd
      );
    },
    handleCloseModal(eventFormData) {
      this.showModal = false;
      this.newEvent.minInMatch = eventFormData.minInMatch;
      this.newEvent.description = eventFormData.description;
      this.newEvent.teamName = eventFormData.teamName;
      this.newEvent.type = eventFormData.type;
      this.newEvent.playerName = eventFormData.playerName;
      this.addEvent();
    },
  },
};
</script>

<style>
</style>