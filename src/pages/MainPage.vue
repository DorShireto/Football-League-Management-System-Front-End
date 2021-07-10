<template>
  <div id="mainPage">
    <div class="">
      <h1 class="title text-center">Main Page</h1>
      <div class="row d-flex align-items-center" style="margin-top: 20vh">
        <div class="col"><LeagueInfo></LeagueInfo></div>
        <div class="col-6">
          <LoginPage v-if="!$root.store.username"></LoginPage>
          <FavoriteGames v-else num_of_games_to_display="3"></FavoriteGames>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGames";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo,
    LoginPage,
    FavoriteGames,
  },
};
</script>


<style>
#mainPage {
  /* background-image: url(""); */
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

/* <style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 *
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
} */
</style>
