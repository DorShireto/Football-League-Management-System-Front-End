<template>
  <div>
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    <br />
    Your search Query: {{ searchQuery }}

    <div>
      Players Search:
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
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
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="activeTeam">Active Team</b-form-checkbox>
            <b-form-checkbox value="position">Position</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <GamesTablesC
        :items="this.playersData"
        :fields="this.playersTableFields"
      ></GamesTablesC>
    </div>
  </div>
</template>

<script>
import GamesTablesC from "../components/GameTableC.vue";
export default {
  data() {
    return {
      searchQuery: "",
      playersData: [],
      playersTableFields: [],
    };
  },
  components: {
    GamesTablesC,
  },
  mounted() {
    this.playersData = this.$root.store.allPlayers;
    debugger;
    this.playersTableFields = [
      { key: "id", sortable: true },
      { key: "fullname", sortable: true },
      { key: "activeTeam", sortable: true },
      { key: "position", sortable: true },
    ];
  },
};
</script>

<style scoped>
#search-input {
  margin-left: 20px;
  width: 500px;
}
</style>