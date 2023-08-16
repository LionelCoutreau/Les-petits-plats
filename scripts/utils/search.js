// Recherche des recettes
const searchRecipes = (searchTxtInput, data) => {
    // Valeur du champ de recherche principale
    const terms = searchTxtInput.toLowerCase();
    
    // Si le texte du champ est supérieur à 2 caractères, on exécute la recherche
    if (terms.length > 2) {
        data = data.filter(recipe => {
            const name = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();
            const ingredients = recipe.ingredients;
            
            return name.includes(terms) || description.includes(terms) || ingredients.filter(item => item.ingredient.toLowerCase().includes(terms)).length >= 1;
        })
    }

    return data;
}

// Filtre les recettes par tags
const tagFilter = (ingredients, appareils, ustensiles, recipes) => {
    // Variable de stockage des résultats
    let finalArray = [];

    // On passe en revue les recettes
    recipes.forEach(element => {
        let isMatchIngredients = false;
        let isMatchAppareils = false;
        let isMatchUstensiles = false;

        // => Filtrage par tags ingrédients
        const IngredientsInRecipe = element.ingredients.map((e) => e.ingredient.toLowerCase());
        if (ingredients.length >= 1) {
            // Si tous les tags ingrédients sont compris dans la recette
            if (ingredients.every((e) => IngredientsInRecipe.includes(e.toLowerCase()))) {
                isMatchIngredients = true;
            }
        }
        else {
            isMatchIngredients = true;
        }

        // Filtrage par tags appareils
        if (appareils.length >= 1) {
            // Si tous les tags appareils sont compris dans la recette
            if (appareils.includes(element.appliance.toLowerCase()))
                isMatchAppareils = true;
        }
        else {
            isMatchAppareils = true;
        }

        // Filtrage par tags ustensiles
        const ustensilesRecipe = element.ustensils.map((e) => e.toLowerCase());
        if (ustensiles.length >= 1) {
            // Si tous les tags ustensiles sont compris dans la recette
            if (ustensiles.every((e) => ustensilesRecipe.includes(e.toLowerCase()))) {
                isMatchUstensiles = true;
            }
        }
        else {
            isMatchUstensiles = true;
        }
        // console.log(isMatchIngredients, isMatchAppareils, isMatchUstensiles)

        // Si tout concorde, alors on ajoute la recette
        if (isMatchIngredients === true && isMatchAppareils === true && isMatchUstensiles === true) {
            finalArray.push(element)
        }
    });

    return finalArray;
}

export { searchRecipes, tagFilter };