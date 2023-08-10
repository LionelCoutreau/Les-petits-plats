// Obtient un tableau avec tous les ingredients (uniques) d'un tableau de recettes
const getAllIngredients = (data) => {
    let ingredientsArray = [];

    data.forEach(element => {
        const ingredientsRecipe = element.ingredients;
        ingredientsRecipe.forEach((ingredients) => {
            if (ingredientsArray.indexOf(ingredients.ingredient.toLowerCase()) === -1) {
                ingredientsArray.push(ingredients.ingredient.toLowerCase())
            }
        })
    })

    return ingredientsArray;
}

// Obtient un tableau avec tous les appareils (uniques) d'un tableau de recettes
const getAllAppareils = (data) => {
    let appareilArray = [];

    data.forEach(element => {
        const appareil = element.appliance;
        if (appareilArray.indexOf(appareil.toLowerCase()) === -1) {
            appareilArray.push(appareil.toLowerCase())
        }
    })

    return appareilArray;
}

// Obtient un tableau avec tous les ustensiles (uniques) d'un tableau de recettes
const getAllUstensiles = (data) => {
    let ustensilesArray = [];

    data.forEach(element => {
        const ustensiles = element.ustensils;

        ustensiles.forEach((ustensile) => {
            if (ustensilesArray.indexOf(ustensile.toLowerCase()) === -1) {
                ustensilesArray.push(ustensile.toLowerCase())
            }
        })
    })

    return ustensilesArray;
}

export { getAllIngredients, getAllAppareils, getAllUstensiles };