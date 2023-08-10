// Recherche des recettes
const searchRecipes = (searchTxtInput, data) => {
    console.log('data', data);
    // Variable de stockage des résultats
    let recipesFiltered = [];

    // Si le texte du champ est supérieur à 2 caractères, on exécute la recherche
    if (searchTxtInput.length > 2) {

        // Boucle des recettes
        for (let i = 0; i < data.length; i++) {
            let isMatchText = false;
            const recipe = data[i];
            const name = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();
            const ingredients = recipe.ingredients;
            const terms = searchTxtInput.toLowerCase();

            // Si la recherche est incluse dans le nom ou la description => valide la condition
            if (name.includes(terms) || description.includes(terms))
                isMatchText = true;

            // Si la recherche correspond à un ingredient => valide la condition
            for (var ig = 0; ig < ingredients.length; ig++) {
                if (ingredients[ig].ingredient.toLowerCase().includes(terms))
                    isMatchText = true;
            }

            // Si la recette correspond à la recherche => Ajout à la variable retournée
            if (isMatchText === true) {
                recipesFiltered.push(recipe)
            }

        }

    }
    else {
        // Si la recherche fait moins de 3 caractères, on retourne toutes les recettes en paramètre
        recipesFiltered = data;
    }

    return recipesFiltered;
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