var calc = function (a, b, c) {
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
console.log(calc(12, 5, 22));
console.log(calc(12, 5));
