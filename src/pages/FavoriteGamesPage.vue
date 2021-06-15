<template>
  <div>
    <FavoriteGames num_of_games_to_display="100"></FavoriteGames>
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames";
export default {
  name: "FavoriteGamesPage",
  components: {
    FavoriteGames,
  },
};
</script>

<style>
</style>