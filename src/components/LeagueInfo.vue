<template>
  <div class="league-preview">
    <b-card img-alt="Image" tag="article" style="max-width: 25rem" class="">
      <b-card-title>{{ leagueName }}</b-card-title>
      <b-card-text>
        <b>Season:</b> {{ season }}
        <br />
        <b>Stage:</b> {{ stage }}
        <br />
        <div v-if="stage != 'currently there is no stage available'">
          <b>Next Match Details:</b> <br />
          <u>Date:</u> {{ nextMatch.date }}<br />
          <u>Time:</u> {{ nextMatch.time }}<br />
          <u> Home Team:</u> {{ nextMatch.homeTeam }}<br />
          <u>Away Team:</u> {{ nextMatch.awayTeam }}<br />
          <u>Stadium:</u> {{ nextMatch.stadium }}<br />
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leagueName: "Superliga",
      season: "season",
      stage: "stage",
      nextMatch: {},
    };
  },
  async mounted() {
    const response = await this.axios.get(
      this.$root.store.server_domain +
        this.$root.store.server_port +
        "/league/getDetails"
    );
    this.leagueName = response.data.leagueName;
    this.season = response.data.seasonName;
    this.stage = response.data.stageName;
    this.nextMatch = response.data.nextMatch;
  },
};
</script>

<style>
.league-preview {
  display: inline-block;
  /* width: 250px; */
  /* height: 200px; */
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: rgb(0, 0, 0);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}
</style>