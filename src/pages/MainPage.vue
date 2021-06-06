<template>
  <div id="mainPage">
    <div class="container">
      <h1 class="title">Main Page</h1>
      <LoginPage v-if="!$root.store.username"></LoginPage>
      <FavoriteGames v-else></FavoriteGames>
      <LeagueInfo></LeagueInfo>
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
  background-image: url("C:/Users/liors/Desktop/BGU/year3/semester6/webDev/hw/hw3.3/assignment-3-3-311327084_312204811/public/imgs/mainpageBG.jpg");
  background-repeat: no-repeat;
  /* background-size: auto; */
  background-size: cover;
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
