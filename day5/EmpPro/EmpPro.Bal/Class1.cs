using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EmpPro.Models;
using EmpProDao;
using EmpProExceptions;
using System.Collections.Generic;

namespace EmpPro.Bal
{
    public class EmployBal
    {
        EmployDao dao = new EmployDao();

        private void ValidateEmploy(Employ emp)
        {
            if (emp.Empno <= 0)
                throw new EmployException("Empno cannot be zero or negative.");
            if (string.IsNullOrWhiteSpace(emp.Name) || emp.Name.Length < 5)
                throw new EmployException("Name must be at least 5 characters.");
            if (emp.Gender.ToUpper() != "MALE" && emp.Gender.ToUpper() != "FEMALE")
                throw new EmployException("Gender must be MALE or FEMALE.");
            if (emp.Basic < 10000 || emp.Basic > 80000)
                throw new EmployException("Basic must be between 10000 and 80000.");
        }

        public void AddEmploy(Employ emp)
        {
            ValidateEmploy(emp);
            dao.AddEmploy(emp);
        }

        public List<Employ> GetAllEmploy() => dao.GetAllEmploy();
        public Employ SearchEmploy(int empno) => dao.SearchEmploy(empno);
        public void DeleteEmploy(int empno)
        {
            if (!dao.DeleteEmploy(empno))
                throw new EmployException("Employ not found to delete.");
        }
        public void UpdateEmploy(Employ emp)
        {
            ValidateEmploy(emp);
            if (!dao.UpdateEmploy(emp))
                throw new EmployException("Employ not found to update.");
        }
    }
}

