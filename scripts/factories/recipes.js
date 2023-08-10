export default function recipeFactory(data) {
    const { image, name, ingredients, time, description } = data;

    const picture = `assets/recipes/${image}`;

    const getRecipeCardDOM = () => {
        // bloc carte
        const article = document.createElement( 'article' );
        article.className = 'recipe';

        // bloc header
        const header = document.createElement( 'div' );
        header.className = 'recipe__header';

        // image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        // time
        const temps = document.createElement( 'div' );
        temps.className = 'recipe__time';
        temps.textContent = `${time} min`;

        // bloc main
        const main = document.createElement( 'div' );
        main.className = 'recipe__main';

        // titre
        const titre = document.createElement('h2');
        titre.textContent = name;

        // label recette
        const labelRecette = document.createElement('h3');
        labelRecette.textContent = 'Recette';

        // recette
        const recette = document.createElement('div');
        recette.className = 'recipe__description';
        recette.textContent = description;

        // label ingredients
        const labelIngredients = document.createElement('h3');
        labelIngredients.textContent = 'Ingrédients';

        // bloc ingrédients
        const ingredientsBloc = document.createElement('div');
        ingredientsBloc.className = 'recipe__ingredients';

        // liste des ingrédients
        ingredients.forEach(ingredient => {
            //console.log(ingredient);
            // bloc ingredient
            const ingredientBloc = document.createElement('div');
            ingredientBloc.className = 'recipe__ingredient';

            // nom ingredient
            const ingredientName = document.createElement('div');
            ingredientName.className = 'recipe__ingredient__name';
            ingredientName.textContent = ingredient.ingredient;

            // quantité ingredient
            const ingredientQuantity = document.createElement('div');
            ingredientQuantity.className = 'recipe__ingredient__quantity';
            if(ingredient.quantity) {
                if(ingredient.unit) {
                    ingredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
                }
                else {
                    ingredientQuantity.textContent = ingredient.quantity;
                }
            }
            else {
                ingredientQuantity.textContent = '-';
            }

            ingredientBloc.appendChild(ingredientName);
            ingredientBloc.appendChild(ingredientQuantity);
            ingredientsBloc.appendChild(ingredientBloc);
        });
    
        //construction de la carte de la recette
        header.appendChild(img);
        header.appendChild(temps);
        main.appendChild(titre);
        main.appendChild(labelRecette);
        main.appendChild(recette);
        main.appendChild(labelIngredients);
        main.appendChild(ingredientsBloc);
        article.appendChild(header);
        article.appendChild(main);
        return article;
    }
    return { getRecipeCardDOM }
}