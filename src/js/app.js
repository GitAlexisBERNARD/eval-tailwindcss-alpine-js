import Alpine from "alpinejs";
import NbRecipes from "./modules/recipes";
import RecipesList from "./modules/RecipesList";
import persist from '@alpinejs/persist'
 

window.Alpine = Alpine;

Alpine.data("NbRecipes", NbRecipes);
Alpine.data("RecipesList", RecipesList);
Alpine.plugin(persist)
Alpine.start();
