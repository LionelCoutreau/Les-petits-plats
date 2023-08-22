// Importation de la data
import recipes from '../../data/recipes.js';
// Importation des factories
import tagFactory from '../factories/tags.js';
import recipeFactory from '../factories/recipes.js';
// Importation des utilitaires
import { searchRecipes, tagFilter } from '../utils/search.js';
import { getAllIngredients, getAllAppareils, getAllUstensiles } from '../utils/tags.js';
import { FilterTagArrayBySearch } from '../utils/dropdown.js';

// Stockage du tableau de recettes
let dataRecipes = [];

// Stockage des variables pour les filtres
let searchText = '';
let ingredients = [];
let appareils = [];
let ustensiles = [];

// DOM des dropdowns
const dropdowns = document.querySelectorAll('.dropdown');
const dropdownsInputs = document.querySelectorAll('.dropdown__input');
// DOM de la liste des tags
const tagsSection = document.querySelector('.tags');
// DOM de la liste des recettes
const recipesSection = document.querySelector('.recipes');
// DOM des listes des dropdown
const ingredientsItems = document.getElementById('ingredients-items');
const appareilsItems = document.getElementById('apparels-items');
const ustensilesItems = document.getElementById('ustensils-items');
// DOM du message d'erreur lors de la recherche
const errorSearch = document.getElementById('error-search');
// DOM du nombre de recettes
const numberRecipes = document.querySelector('.number_recipes');
// DOM des imputs de recherche des dropdowns
const ingredientsInput = document.getElementById('dropdown-ingredients');
const appareilsInput = document.getElementById('dropdown-apparels');
const ustensilesInput = document.getElementById('dropdown-ustensils');
// DOM de l'input de la recherche principale
const searchInput = document.querySelector('.searchbar__input')
const searchButton = document.querySelector('.searchbar__button')

// Fonction d'affichage des recettes
const displayRecipes = (recipesData) => {
    const recipesCount = recipesData.length;
    // Réinitialisation de la section recettes
    recipesSection.innerHTML = '';
    // Réinitialisation du message d'erreur
    errorSearch.innerText = '';
    // Réinitialisation du nombre de recettes
    numberRecipes.innerText = '';

    // Vérification du nombre de recettes
    if (recipesCount > 0) {
        // Construction de la liste des recettes
        recipesData.forEach((recipe) => {
            const recipeModel = recipeFactory(recipe);
            const recipeCardDOM = recipeModel.getRecipeCardDOM();
            recipesSection.appendChild(recipeCardDOM);
        });

        // Affichage des tags disponibles dans les différents dropdowns
        displayTagsDropdowns();

        // Affichage des tags sélectionnés dans le filtre
        displayTagsActive();

        // Affichage du nombre de recettes
        const plural = recipesCount > 1 ? 's' : '';
        numberRecipes.innerText = `${recipesCount} recette${plural}`;
    }
    else {
        errorSearch.innerText = `Aucune recette ne contient ${searchText}. Vous pouvez chercher "tarte aux pommes", "poisson", etc...`;
    }
};

// Affichage des tags dans les dropdowns
const displayTagsDropdowns = () => {
    // Récupération de tous les ingrédients, appareils et ustensiles du tableau des recettes
    let ingredientsArray = getAllIngredients(dataRecipes);
    let appareilsArray = getAllAppareils(dataRecipes);
    let ustensilesArray = getAllUstensiles(dataRecipes);

    // Suppression des ingrédients, appareils et ustensiles déjà selectionnés dans les listes
    ingredientsArray = ingredientsArray.filter(e => ingredients.indexOf(e) === -1);
    appareilsArray = appareilsArray.filter(e => appareils.indexOf(e) === -1);
    ustensilesArray = ustensilesArray.filter(e => ustensiles.indexOf(e) === -1);

    // Filtre des tags par catégorie
    const ingredientsFilterTagsArray = FilterTagArrayBySearch(ingredientsInput.value.replace(/<[^>]+>/gim, ''), ingredientsArray);
    const appareilsFilterTagsArray = FilterTagArrayBySearch(appareilsInput.value.replace(/<[^>]+>/gim, ''), appareilsArray);
    const ustensilesFilterTagsArray = FilterTagArrayBySearch(ustensilesInput.value.replace(/<[^>]+>/gim, ''), ustensilesArray);

    // Réinitialisation des listes des tags des dropdowns
    ingredientsItems.innerHTML = '';
    appareilsItems.innerHTML = '';
    ustensilesItems.innerHTML = '';

    // Création des tags à afficher dans les dropdowns
    ingredientsFilterTagsArray.forEach((ingredientTag) => {
        const ingredientTagModel = tagFactory(ingredientTag);
        const ingredientTagDropdownDOM = ingredientTagModel.getTagDropdownDOM();
        // Ajout de l'élément dans la liste dropdown
        ingredientsItems.appendChild(ingredientTagDropdownDOM);
        // Ajout de l'event listener au click
        ingredientTagDropdownDOM.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('Ingredient', e.target) })
    });
    appareilsFilterTagsArray.forEach((appareilTag) => {
        const appareilTagModel = tagFactory(appareilTag);
        const appareilTagDropdownDOM = appareilTagModel.getTagDropdownDOM();
        // Ajout de l'élément dans la liste dropdown
        appareilsItems.appendChild(appareilTagDropdownDOM);
        appareilTagDropdownDOM.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('Appareil', e.target) })
    });
    ustensilesFilterTagsArray.forEach((ustensileTag) => {
        const ustensileTagModel = tagFactory(ustensileTag);
        const ustensileTagDropdownDOM = ustensileTagModel.getTagDropdownDOM();
        // Ajout de l'élément dans la liste dropdown
        ustensilesItems.appendChild(ustensileTagDropdownDOM);
        // Ajout de l'event listener au click
        ustensileTagDropdownDOM.addEventListener('click', (e) => { e.stopPropagation(); addTagsSearch('Ustensile', e.target) })
    });
}

// Affichage des tags déjà sélectionnés dans le DOM
const displayTagsActive = () => {
    // Suppression de tous les anciens tags sélectionnés dans le DOM.
    tagsSection.innerHTML = "";

    // Création des tags actifs à afficher
    ingredients.forEach((ingredientTag) => {
        const ingredientTagModel = tagFactory(ingredientTag);
        const ingredientTagActiveDOM = ingredientTagModel.getTagActiveDOM();
        // Ajout de l'élément dans la liste des tags actifs
        tagsSection.appendChild(ingredientTagActiveDOM);
        // Ajout de l'event listener au click
        ingredientTagActiveDOM.querySelector('.tag__close').addEventListener('click', (e) => { deleteTagsSearch('Ingredient', e.target.parentNode) })
    });
    appareils.forEach((appareilTag) => {
        const appareilTagModel = tagFactory(appareilTag);
        const appareilTagActiveDOM = appareilTagModel.getTagActiveDOM();
        // Ajout de l'élément dans la liste des tags actifs
        tagsSection.appendChild(appareilTagActiveDOM);
        appareilTagActiveDOM.querySelector('.tag__close').addEventListener('click', (e) => { deleteTagsSearch('Appareil', e.target.parentNode) })
    });
    ustensiles.forEach((ustensileTag) => {
        const ustensileTagModel = tagFactory(ustensileTag);
        const ustensileTagActiveDOM = ustensileTagModel.getTagActiveDOM();
        // Ajout de l'élément dans la liste des tags actifs
        tagsSection.appendChild(ustensileTagActiveDOM);
        // Ajout de l'event listener au click
        ustensileTagActiveDOM.querySelector('.tag__close').addEventListener('click', (e) => { deleteTagsSearch('Ustensile', e.target.parentNode) })
    });
}

// Ajout d'un tag aux filtres de recherche, et affichage des recettes filtrées
const addTagsSearch = (type, element) => {
    const tag = element.dataset.tag;
    let dropdown = '';
    switch (type) {
        case 'Ingredient':
            ingredients.push(tag);
            dropdown = '.dropdown__tags--ingredients';
            break;
        case 'Appareil':
            appareils.push(tag);
            dropdown = '.dropdown__tags--apparels';
            break;
        case 'Ustensile':
            ustensiles.push(tag);
            dropdown = '.dropdown__tags--ustensils';
            break;
    }
    // Execution des scripts de recherche et affichage des résultats
    const result = searchRecipes(searchText, tagFilter(ingredients, appareils, ustensiles, recipes));
    dataRecipes = result;
    displayRecipes(dataRecipes);

    // Fermeture de la liste
    document.querySelector(dropdown).style.display = 'none';

}

// Suppression d'un tag aux filtres de recherche, et affichage des recettes filtrées
const deleteTagsSearch = (type, element) => {
    const tag = element.dataset.tag;

    switch (type) {
        case 'Ingredient':
            ingredients.splice(ingredients.indexOf(tag), 1);
            break;
        case 'Appareil':
            appareils.splice(appareils.indexOf(tag), 1);
            break;
        case 'Ustensile':
            ustensiles.splice(ustensiles.indexOf(tag), 1);
            break;
    }

    // Execution des scripts de recherche et affichage des résultats
    const result = searchRecipes(searchText, tagFilter(ingredients, appareils, ustensiles, recipes));
    dataRecipes = result;
    displayRecipes(dataRecipes);
}

const init = () => {
    // Initialisation du tableau des recettes
    dataRecipes = recipes;

    // Affichage de toutes les recettes
    displayRecipes(dataRecipes);

    // Ajout de l'event listener de la barre de recherche
    searchInput.addEventListener('input', (e) => {
        // mise à jour de la variable de filtre de recherche principale
        searchText = e.target.value.replace(/<[^>]+>/gim, '');

        // Execution des scripts de recherche et affichage des résultats
        const result = searchRecipes(searchText, tagFilter(ingredients, appareils, ustensiles, recipes));
        dataRecipes = result;
        displayRecipes(dataRecipes);
    })

    // Ajout de l'event listener de la barre de recherche
    searchButton.addEventListener('click', () => {
        // mise à jour de la variable de filtre de recherche principale
        searchText = searchInput.value.replace(/<[^>]+>/gim, '');

        // Execution des scripts de recherche et affichage des résultats
        const result = searchRecipes(searchText, tagFilter(ingredients, appareils, ustensiles, recipes));
        dataRecipes = result;
        displayRecipes(dataRecipes);
    })

    // Ajout des event listeners d'ouverture des dropdowns
    dropdowns.forEach((dropdown) => {
        dropdown.querySelector('.dropdown__wrapper').addEventListener('click', () => {
            if (dropdown.querySelector('.dropdown__tags').style.display === 'block') {
                // Changement de l'icone du dropdown
                dropdown.querySelector('.dropdown__icon').src = './assets/down.svg';

                // Affichage de la liste
                dropdown.querySelector('.dropdown__tags').style.display = 'none';

                // Obtenir le focus sur l'input à l'interrieur des dropdowns
                dropdown.querySelector('.dropdown__input').blur();
            }
            else {
                // Changement de l'icone du dropdown
                dropdown.querySelector('.dropdown__icon').src = './assets/up.svg';

                // Affichage de la liste
                dropdown.querySelector('.dropdown__tags').style.display = 'block';

                // Obtenir le focus sur l'input à l'interrieur des dropdowns
                dropdown.querySelector('.dropdown__input').focus();
            }
        });
    })    

    // Ajout des event listeners dans les inputs des dropdowns
    dropdownsInputs.forEach((element) => {
        element.addEventListener('input', (e) => {
            // Affichage des tags dans les dropdowns
            displayTagsDropdowns();
        });
    })
};

// Fonction d'initialisation exécuté au chargement du dom.
//window.addEventListener("DOMContentLoaded", (event) => {
//    init()
//});

init();