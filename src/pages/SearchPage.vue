<template>
  <div>
    <h1 id="searchPage" class="title text-center">Search Page</h1>
    <!-- <b-button disabled style="opacity: 100%; width: 100%" variant="primary"
      >Search Player:
      <b-icon icon="search" animation="throb"></b-icon>
      <b-form-input v-model="searchPlayerQuery"> </b-form-input>
    </b-button> -->

    <b-row>
      <b-col lg="6">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group class="d-flex align-items-center" size="sm">
            <b-icon class="mr-2" icon="search" animation="throb"></b-icon>

            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
              @change="handlePlayerQuearyChange"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="clearPlayerSearch"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6">
        <b-form-group
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="Fullname">Name</b-form-checkbox>
            <b-form-checkbox value="activeTeam">Team</b-form-checkbox>
            <b-form-checkbox value="position">Position</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <GamesTableC
      :filterOn="filterOn"
      :filter="filter"
      :items="this.playersData"
      :fields="this.playersTableFields"
      :showLoading="false"
    ></GamesTableC>
    <br /><br />
    <!-- <b-button disabled style="opacity: 100%; width: 100%" variant="primary"
      >Search Team:
      <b-icon icon="search" animation="throb"></b-icon>
      <b-form-input v-model="searchTeamQuery"> </b-form-input>
    </b-button> -->

    <b-row>
      <b-col lg="10">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group class="d-flex align-items-center" size="sm">
            <b-icon class="mr-2" icon="search" animation="throb"></b-icon>

            <b-form-input
              id="teamFilterInput"
              v-model="searchTeamQuery"
              type="search"
              placeholder="Type to Search"
              @change="handleTeamQuearyChange"
            ></b-form-input>

            <b-input-group-append>
              <b-button
                id="clearBTeam"
                :disabled="!searchTeamQuery"
                @click="clearTeamSearch"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <GamesTableC
      :filter="searchTeamQuery"
      :items="this.teamsData"
      :fields="this.teamsTableFields"
      :showLoading="false"
    ></GamesTableC>
  </div>
</template>

<script>
import GamesTableC from "../components/GameTableC.vue";
export default {
  data() {
    return {
      filter: null,
      filterOn: [],
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
  methods: {
    handlePlayerQuearyChange() {
      console.log("changed");
      // this.$root.store.
      localStorage.setItem("playerSearchQuery", this.filter);
    },
    handleTeamQuearyChange() {
      localStorage.setItem("teamSearchQuery", this.searchTeamQuery);
    },
    clearTeamSearch() {
      document.getElementById("teamFilterInput").value = "";
      localStorage.removeItem("teamSearchQuery");
    },
    clearPlayerSearch() {
      document.getElementById("filter-input").value = "";
      localStorage.removeItem("playerSearchQuery");
    },
  },

  // computed: {
  //   handlePlayerQuearyChange1() {
  //     console.log("changed");
  //     // this.$root.store.
  //     localStorage.setItem("playerSearchQuery", this.filter);

  //   },
  // },

  mounted() {
    let playerSearchQueryFromStorage =
      localStorage.getItem("playerSearchQuery");
    console.log(playerSearchQueryFromStorage);

    if (playerSearchQueryFromStorage) {
      document.getElementById("filter-input").value =
        playerSearchQueryFromStorage;
      document.getElementById("filter-input").focus();
    }

    let teamSearchQueryFromStorage = localStorage.getItem("teamSearchQuery");
    if (teamSearchQueryFromStorage) {
      document.getElementById("teamFilterInput").value =
        teamSearchQueryFromStorage;
      document.getElementById("teamFilterInput").focus();
    }
    document.getElementById("filter-input").focus();
  },
};
</script>

<style>
</style>