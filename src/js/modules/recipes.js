// Importation du fichier JSON contenant les recettes
import recipes from "../../data/recipes.json";

/**
 * Composant Alpine.js pour compter le nombre total de recettes.
 * Ce composant est principalement utilisé pour afficher des statistiques globales
 * sur le nombre de recettes disponibles.
 */
export default function NbRecipes() {
  return {
    // Propriété réactive pour stocker le nombre de recettes
    recipesCount: 0,

    /**
     * Méthode appelée lors de l'initialisation du composant.
     * Elle calcule et met à jour le nombre de recettes à partir des données JSON.
     */
    init() {
      // Récupère le tableau des recettes depuis le fichier JSON importé
      const recipeArray = recipes.recipes;

      // Met à jour la propriété recipesCount avec la taille du tableau
      this.recipesCount = recipeArray.length;
    },
  };
}
