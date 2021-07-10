import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/currentstage",
    name: "currentstage",
    component: () => import("./pages/CurrentStage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/About")
  },
  {
    path: "/playerpage/:playerId",
    name: "playerpage",
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/teams/page/:teamId",
    name: "teampage",
    component: () => import("./pages/TeamPage")
  },
  {
    path: "/favoriteGames",
    name: "FavoriteGamesPage",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "/tests",
    name: "tests",
    component: () => import("./pages/tests")
  },
  {
    path: "/leagueManagement",
    name: "leaguemanagement",
    component: () => import("./pages/LeagueManagementPage")
  },
  {
    path: "*",
    name: "notFound",
    component: Main
  }
];

export default routes;
