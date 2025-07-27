using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Collections.Generic;
using EmpProDao.Models;

namespace EmpProDao
{
    public class EmployDao
    {
        private static List<Employ> employList = new List<Employ>();

        public void AddEmploy(Employ emp) => employList.Add(emp);
        public List<Employ> GetAllEmploy() => employList;
        public Employ SearchEmploy(int empno) => employList.Find(e => e.Empno == empno);
        public bool DeleteEmploy(int empno)
        {
            var emp = SearchEmploy(empno);
            if (emp != null)
            {
                employList.Remove(emp);
                return true;
            }
            return false;
        }
        public bool UpdateEmploy(Employ updatedEmp)
        {
            var emp = SearchEmploy(updatedEmp.Empno);
            if (emp != null)
            {
                emp.Name = updatedEmp.Name;
                emp.Gender = updatedEmp.Gender;
                emp.Dept = updatedEmp.Dept;
                emp.Desig = updatedEmp.Desig;
                emp.Basic = updatedEmp.Basic;
                return true;
            }
            return false;
        }
    }
}

