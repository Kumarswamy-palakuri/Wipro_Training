interface IEmploy {
    empno : number;
    name : string;
    salary : number;
}

const employ1 : IEmploy = {
    empno:1,
    name:"Prasanna",
    salary:88234
}
const employ2 : IEmploy = {
    empno:2,
    name:"mike",
    salary:30215
}

console.log(`Employ No ${employ1.empno}, Employ Name ${employ1.name}, Salary ${employ1.salary}  `)
console.log(`Employ No ${employ2.empno}, Employ Name ${employ2.name}, Salary ${employ2.salary}  `)