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
    path: "/playerpage/:playerId",
    name: "playerpage",
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/favoriteGames",
    name: "FavoriteGamesPage",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "*",
    name: "notFound",
    component: Main
  }
];

export default routes;
