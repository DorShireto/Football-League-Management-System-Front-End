<template>
  <div class="game-table">
    <b-table class="table table-bordered" id="futureGames">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Home Team</th>
        <th scope="col">Away Team</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">Stadium</th>
      </thead>
      <tbody>
        <tr v-for="(match, index) in futureMatches" :key="match.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ match.homeTeam }}</td>
          <td>{{ match.awayTeam }}</td>
          <td>{{ match.date }}</td>
          <td>{{ match.time }}</td>
          <td>{{ match.stadium }}</td>
        </tr>
      </tbody>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "GamesTables",
  props: {
    futureMatches: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log("game preview mounted");
  },
};
</script>

<style>
</style>
