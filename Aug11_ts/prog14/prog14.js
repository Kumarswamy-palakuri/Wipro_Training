"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee_1 = require("../prog9/Employee");
var employs = [
    new Employee_1.Employ(1, "Keshav", 88234),
    new Employee_1.Employ(2, "Rajesh", 88234),
    new Employee_1.Employ(3, "Arthy", 82245),
    new Employee_1.Employ(4, "Venkata", 88222)
];
employs.forEach(function (x) {
    console.log(x.empno + " " + x.name + " " + x.basic);
});
