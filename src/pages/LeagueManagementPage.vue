<template>
  <div>
    <h1>League Management Page</h1>
    <b-button
      class="mb-2"
      variant="primary"
      @click="$bvToast.show('addMatch-toast')"
    >
      Add New Match
    </b-button>
    <b-toast id="addMatch-toast" title="Add New Match" static no-auto-hide>
      <!-- <AddMatch v-show="displayAddMatch"></AddMatch> -->
      <AddMatch></AddMatch>
    </b-toast>
  </div>
</template>

<script>
import AddMatch from "../components/AddMatch.vue";
export default {
  data() {
    return {
      displayAddMatch: false,
    };
  },
  methods: {
    // addMatchHandler() {
    //   this.displayAddMatch = !this.displayAddMatch;
    // },
  },
  components: {
    AddMatch,
  },
};
</script>

<style>
#addMatch-toast {
  width: 3200px;
}
</style>