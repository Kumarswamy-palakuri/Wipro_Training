using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployProject.Models;

namespace EmployProject.Dao
{
    internal interface IEmployDao
    {
        string AddEmployDao(Employ employ);
        List<Employ> ShowEmployDao();
        Employ SearchEmployDao(int empno);
        string UpdateEmployDao(Employ employUpdated);
        string DeleteEmployDao(int empno);
        string WriteToFileDao();
        string ReadFromFileDao();
    }
}