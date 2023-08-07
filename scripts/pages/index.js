// Importation de la data
import recipes from '../../data/recipes.js'
// Importation des factories
import tagFactory from '../factories/tags.js'
import recipeFactory from '../factories/recipes.js'

const displayData = (recipesData) => {
    const recipesSection = document.querySelector(".recipes");
    const recipesCount = recipesData.length;
    recipesSection.innerHTML = "";

    recipesData.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

    document.querySelector('.number_recipes').innerHTML = `${recipesCount} recettes`
};

const init = () => {
    // Récupère les datas des recettes
    // console.log("recipes : " + recipes);
    displayData(recipes);
};

init();