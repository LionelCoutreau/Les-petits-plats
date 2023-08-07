// Filtre les tags s'ils correspondent ou non à la recherche en paramètre dans les dropdown
const FilterTagArrayBySearch = (filterText, tags) => {
    let filterArray = [];
    if (tags) {
        // Boucle du tableau de tags
        tags.forEach(element => {
            // si cela correspond, on ajoute le tag
            if (element.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
                filterArray.push(element)
            }
        });
    }
    return filterArray
}

export { FilterTagArrayBySearch }