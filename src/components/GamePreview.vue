<template>
  <div class="game-preview">
    <b-card img-alt="Image" tag="article" style="max-width: 25rem" class="">
      <b-card-title>Match ID: {{ id }}</b-card-title>
      <b-card-text>
        <b>Date:</b> {{ date }}
        <br />
        <b>Time:</b> {{ time }}
        <br />
        <b> Home Team:</b> {{ homeTeam }}<br />
        <b>Away Team:</b> {{ awayTeam }}<br />
        <b>Stadium:</b> {{ stadium }}<br />
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
    id: {
      type: Number,
      required: true,
    },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log("game preview mounted");
  },
};
</script>

<style>
.game-preview {
  display: inline-block;
  /* width: 250px;
  height: 200px; */
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
