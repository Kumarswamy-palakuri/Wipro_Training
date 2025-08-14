using EmployeeAdmin.Data;
using EmployeeAdmin.Models;
using EmployeeAdmin.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdmin.Controllers
{
    //localhost:xxxx/api/employees
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public EmployeesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var allEmployees=dbContext.Employees.ToList();
            return Ok(allEmployees);
        }
        [HttpPost]
        public IActionResult AddEmployee(AddEmployeedto addEmployeedto)
        {
            var employeeEntity = new Employee()
            {
                Name = addEmployeedto.Name,
                Email = addEmployeedto.Email,
                Phone = addEmployeedto.Phone,
                salary = addEmployeedto.salary

            };

            dbContext.Employees.Add(employeeEntity);
            dbContext.SaveChanges();
            return Ok(employeeEntity);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetEmployeeById(Guid id)
        {
            var employee=dbContext.Employees.Find(id);
            if(employee is null)
            {
                return NotFound("NOooooooo");
            }
            else
            {
                return Ok(employee);
            }
        }
 
    }
}
