using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EmployProject.Models;
using EmployProject.Dao;
using EmployProject.Exceptions;
using System.Threading.Tasks;

namespace EmployProject.Bal
{
    public class EmployBal
    {
        public StringBuilder sb = new StringBuilder();
        public static EmployDaoImpl daoImpl;

        static EmployBal()
        {
            daoImpl = new EmployDaoImpl();
        }

        public List<Employ> ShowEmployBal()
        {
            return daoImpl.ShowEmployDao();
        }



        public string WriteFileBal()
        {
            return daoImpl.WriteToFileDao();
        }

        public string ReadFileBal()
        {
            return daoImpl.ReadFromFileDao();
        }

        public string DeleteEmployBal(int empno)
        {
            return daoImpl.DeleteEmployDao(empno);
        }
        public string UpdateEmployBal(Employ employUpdated)
        {
            if (ValidateEmploy(employUpdated) == true)
            {
                return daoImpl.UpdateEmployDao(employUpdated);
            }
            throw new EmployException(sb.ToString());
        }

        public Employ SearchEmployBal(int empno)
        {
            return daoImpl.SearchEmployDao(empno);
        }

        public string AddEmployBal(Employ employ)
        {
            if (ValidateEmploy(employ) == true)
            {
                return daoImpl.AddEmployDao(employ);
            }
            throw new EmployException(sb.ToString());
        }

        public bool ValidateEmploy(Employ employ)
        {
            bool flag = true;
            if (employ.Empno <= 0)
            {
                sb.Append("Employ No Cannot be Zero or Negative...\n");
                flag = false;
            }
            if (employ.Name.Length < 5)
            {
                sb.Append("Name Contains Min. 5 characters...\n");
                flag = false;
            }
            if (employ.Basic < 10000 || employ.Basic > 80000)
            {
                sb.Append("Basic Must be Between 10000 and 80000...\n");
                flag = false;
            }
            return flag;
        }
    }
}