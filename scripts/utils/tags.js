// Obtient un tableau avec tous les ingredients (uniques) d'un tableau de recettes
const getAllIngredients = (data) => {
    let ingredientsArray = [];

    data.forEach(element => {
        let ingredientsRecipe = element.ingredients;
        ingredientsRecipe.forEach((ingredients) => {
            if (ingredientsArray.indexOf(ingredients.ingredient) === -1) {
                ingredientsArray.push(ingredients.ingredient)
            }
        })
    })

    return ingredientsArray;
}

// Obtient un tableau avec tous les appareils (uniques) d'un tableau de recettes
const getAllAppareils = (data) => {
    let appareilArray = [];

    data.forEach(element => {
        let appliance = element.appliance;
        if (appareilArray.indexOf(appliance) === -1) {
            appareilArray.push(appliance)
        }
    })

    return appareilArray;
}

// Obtient un tableau avec tous les ustensiles (uniques) d'un tableau de recettes
const getAllUstensiles = (data) => {
    let ustensilesArray = [];

    data.forEach(element => {
        let ustensiles = element.ustensils;

        ustensiles.forEach((ustensile) => {
            if (ustensilesArray.indexOf(ustensile) === -1) {
                ustensilesArray.push(ustensile)
            }
        })
    })

    return ustensilesArray;
}

export { getAllIngredients, getAllAppareils, getAllUstensiles };