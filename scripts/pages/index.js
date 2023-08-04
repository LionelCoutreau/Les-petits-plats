// Importation des factories
import tagFactory from '../factories/tags.js'
import recipeFactory from '../factories/recipes.js'

const getRecipes = async () => {
    const response = await fetch('../../data/recipes.json');
    const json = await response.json();
    // console.log("Success:", json);
    return json;
}

const displayData = async (recipes) => {
    const recipesSection = document.querySelector(".recipes");
    const recipesCount = recipes.length;
    recipesSection.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

    document.querySelector('.number_recipes').innerHTML = `${recipesCount} recettes`
};

const init = async () => {
    // Récupère les datas des recettes
    const recipes = await getRecipes();
    // console.log("recipes : " + recipes);
    displayData(recipes);
};

init();