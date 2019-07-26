function animationFirst(qty) {
    let count = 0;
    return function() {
        count = count + 1;
        return count <= qty;
    }
}

export default animationFirst(5);
