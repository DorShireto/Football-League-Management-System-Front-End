<template>
  <div>
    <h1 class="title text-center">Search Page</h1>
    <b-button disabled style="opacity: 100%; width: 100%" variant="primary"
      >Search Player:
      <b-icon icon="search" animation="throb"></b-icon>
      <b-form-input v-model="searchPlayerQuery"> </b-form-input>
    </b-button>

    <GamesTableC
      :filter="searchPlayerQuery"
      :items="this.playersData"
      :fields="this.playersTableFields"
      :showFilter="true"
    ></GamesTableC>
    <br /><br />
    <b-button disabled style="opacity: 100%; width: 100%" variant="primary"
      >Search Team:
      <b-icon icon="search" animation="throb"></b-icon>
      <b-form-input v-model="searchTeamQuery"> </b-form-input>
    </b-button>

    <GamesTableC
      :filter="searchTeamQuery"
      :items="this.teamsData"
      :fields="this.teamsTableFields"
      :showFilter="true"
    ></GamesTableC>
  </div>
</template>

<script>
import GamesTableC from "../components/GameTableC.vue";
export default {
  data() {
    return {
      playersData: this.$root.store.allPlayers,
      teamsData: this.$root.store.allTeams,
      searchTeamQuery: "",
      searchPlayerQuery: "",
      playersTableFields: [
        { key: "id" },
        { key: "fullname", sortable: true },
        { key: "activeTeam", sortable: true },
        { key: "profilePicture" },
        { key: "position", sortable: true },
      ],
      teamsTableFields: [
        { key: "name", sortable: true },
        { key: "logoPicture" },
      ],
    };
  },
  components: {
    GamesTableC,
  },
};
</script>

<style>
</style>