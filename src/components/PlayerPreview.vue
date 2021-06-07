<template>
  <div class="player-preview">
    <b-card img-alt="Image" tag="article" style="max-width: 25rem" class="">
      <b-card-title>{{ fullName }}</b-card-title>
      <b-card-text>
        <b>Team:</b> {{ activeTeam }}
        <br />
        <b>Position:</b> {{ position }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
    fullName: {
      type: String,
      required: true,
    },
    activeTeam: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.player-preview {
  display: inline-block;
  width: 250px;
  height: fit-content;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color: cadetblue;
}

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color: rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}
</style>