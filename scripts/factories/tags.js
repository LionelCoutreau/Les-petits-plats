export default function tagFactory(tagName) {
    const getTagDropdownDOM = () => {
        // li tag
        const tag = document.createElement( 'li' );
        tag.textContent = tagName;
        tag.dataset.tag = tagName;

        return tag;
    }

    const getTagActiveDOM = () => {
        // bloc tag
        const tag = document.createElement( 'div' );
        tag.className = 'tag';
        // name
        const name = document.createElement( 'div' );
        name.className = 'tag__name';
        residence.textContent = tagName;
        // icone
        const icone = document.createElement( 'img' );
        img.className = 'tag__close';
        img.dataset.tag = tagName;
        img.setAttribute('src', './assets/close.svg');

        //construction du tag
        tag.appendChild(name);
        tag.appendChild(icone);

        return tag;
    }

    return { getTagDropdownDOM, getTagActiveDOM }
}