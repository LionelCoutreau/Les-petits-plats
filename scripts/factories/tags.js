export default function tagFactory(tagName) {
    const capitalizeText = (text) => {
        const capitalizedString = text.toLowerCase();
        const result = capitalizedString.charAt(0).toUpperCase() + capitalizedString.substr(1);
        return result;
    }
    
    const getTagDropdownDOM = () => {
        // li tag
        const tag = document.createElement( 'li' );
        tag.textContent = capitalizeText(tagName);
        tag.dataset.tag = tagName.toLowerCase();

        return tag;
    }

    const getTagActiveDOM = () => {
        // bloc tag
        const tag = document.createElement( 'div' );
        tag.className = 'tag';
        // name
        const name = document.createElement( 'div' );
        name.className = 'tag__name';
        name.textContent = capitalizeText(tagName);
        // icone
        const icone = document.createElement( 'img' );
        icone.className = 'tag__close';
        icone.dataset.tag = tagName.toLowerCase();
        icone.setAttribute('src', './assets/close.svg');

        //construction du tag
        tag.appendChild(name);
        tag.appendChild(icone);

        return tag;
    }

    return { getTagDropdownDOM, getTagActiveDOM }
}