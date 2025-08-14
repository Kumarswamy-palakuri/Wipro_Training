var companies = ['wipro', 'tcs', 'cts', 'infosys', 'hcl', 'tech mahindra', 'accenture', 'capgemini', 'cognizant', 'mindtree'];
companies.forEach(function (element, index) {
    var para = document.createElement("h2");
    para.innerHTML = "".concat(index + 1, " is my pref for ").concat(element);
    document.body.appendChild(para);
});
