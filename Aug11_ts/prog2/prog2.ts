let companies=['wipro','tcs','cts','infosys','hcl','tech mahindra','accenture','capgemini','cognizant','mindtree'];
companies.forEach((element,index) => {
  var para = document.createElement("h2");
para.innerHTML = `${index+1} is my pref for ${element}`;
document.body.appendChild(para);
});

