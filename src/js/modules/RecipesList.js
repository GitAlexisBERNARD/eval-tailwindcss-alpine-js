// Importation des recettes à partir d'un fichier JSON
import recipes from "../../data/recipes.json";

/**
 * Composant Alpine.js pour gérer une liste de recettes avec filtres et favoris.
 * Ce composant inclut des fonctionnalités avancées, comme :
 * - Filtres multiples (difficulté, temps de préparation, catégorie)
 * - Gestion des favoris avec persistance
 * - Affichage dynamique d'une recette dans une modale
 */
export default function RecipesList() {
  return {
    // Données réactives
    recipesList: [], // Liste complète des recettes
    filteredRecipes: [], // Liste filtrée des recettes
    selectedDifficulty: "toutes", // Filtre de difficulté
    selectedPreparationTime: "tous", // Filtre par temps de préparation
    selectedCategory: "toutes", // Filtre par catégorie
    difficulties: [], // Options de difficulté extraites des données
    preparationTimes: ["tous", "rapide (< 30 min)", "moyen (30-60 min)", "long (> 60 min)"], // Options de temps de préparation
    categories: ["toutes", "entrée", "plat", "dessert"], // Catégories par défaut
    showModal: false, // État de la modale (ouverte/fermée)
    selectedRecipe: null, // Recette sélectionnée pour affichage dans la modale
    currentStep: 0, // Étape actuelle des instructions dans la modale
    favorites: Alpine.$persist([]), // Liste des favoris avec persistance locale
    showFavoritesOnly: false, // Indicateur pour afficher uniquement les favoris

    /**
     * Méthode appelée à l'initialisation du composant.
     * Elle configure la liste des recettes et initialise les options de filtres.
     */
    init() {
      this.recipesList = recipes.recipes; // Chargement des recettes depuis le fichier JSON
      this.filteredRecipes = this.recipesList; // Initialisation des recettes filtrées
      this.difficulties = ["toutes", ...new Set(this.recipesList.map((r) => r.difficulty))]; // Extraction unique des difficultés
      this.categories = ["toutes", ...new Set(this.recipesList.map((r) => r.category.toLowerCase()))]; // Extraction unique des catégories
    },

    /**
     * Applique les filtres sélectionnés pour mettre à jour `filteredRecipes`.
     */
    applyFilters() {
      let recipes = this.recipesList;

      // Filtrer par difficulté
      if (this.selectedDifficulty !== "toutes") {
        recipes = recipes.filter((recipe) => recipe.difficulty === this.selectedDifficulty);
      }

      // Filtrer par favoris
      if (this.showFavoritesOnly) {
        recipes = recipes.filter((recipe) => this.favorites.includes(recipe.id));
      }

      // Filtrer par temps de préparation
      if (this.selectedPreparationTime !== "tous") {
        recipes = recipes.filter((recipe) => {
          if (this.selectedPreparationTime === "rapide (< 30 min)") return recipe.preparationTime < 30;
          if (this.selectedPreparationTime === "moyen (30-60 min)") return recipe.preparationTime >= 30 && recipe.preparationTime <= 60;
          if (this.selectedPreparationTime === "long (> 60 min)") return recipe.preparationTime > 60;
        });
      }

      // Filtrer par catégorie
      if (this.selectedCategory !== "toutes") {
        recipes = recipes.filter((recipe) => recipe.category.toLowerCase() === this.selectedCategory);
      }

      this.filteredRecipes = recipes; // Mise à jour de la liste filtrée
    },

    /**
     * Ouvre une modale pour afficher une recette.
     * @param {Object} recipe - La recette à afficher
     */
    openModal(recipe) {
      this.selectedRecipe = recipe;
      this.showModal = true;
      this.currentStep = 0; // Réinitialise l'étape des instructions
    },

    /**
     * Ferme la modale.
     */
    closeModal() {
      this.selectedRecipe = null;
      this.showModal = false;
      this.currentStep = 0; // Réinitialise l'étape des instructions
    },

    /**
     * Passe à l'étape suivante des instructions.
     */
    nextStep() {
      if (this.selectedRecipe && this.currentStep < this.selectedRecipe.instructions.length - 1) {
        this.currentStep++;
      }
    },

    /**
     * Revient à l'étape précédente des instructions.
     */
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },

    /**
     * Ajoute ou retire une recette des favoris.
     * @param {number} recipeId - ID de la recette
     */
    toggleFavorite(recipeId) {
      if (this.favorites.includes(recipeId)) {
        this.favorites = this.favorites.filter((id) => id !== recipeId); // Retire des favoris
      } else {
        this.favorites.push(recipeId); // Ajoute aux favoris
      }
    },
  };
}
