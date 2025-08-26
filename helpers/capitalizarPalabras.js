function capitalizarPalabras (str) {
    return str
        .split(' ')
        .filter(Boolean)
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export default capitalizarPalabras;