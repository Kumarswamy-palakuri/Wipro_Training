using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployProject.Models;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

namespace EmployProject.Dao
{
    public class EmployDaoImpl : IEmployDao
    {
        static List<Employ> employList;

        static EmployDaoImpl()
        {
            employList = new List<Employ>();
        }
        public string AddEmployDao(Employ employ)
        {
            employList.Add(employ);
            return "Employ Record Inserted...";
        }

        public string DeleteEmployDao(int empno)
        {
            Employ employFound = SearchEmployDao(empno);
            if (employFound != null)
            {
                employList.Remove(employFound);
                return "Employ Record Deleted Successfully...";
            }
            return "Employ Record Not Found...";
        }

        public string ReadFromFileDao()
        {
            /*D:\Wipro_Training\day5\EmployProject*/
            FileStream fs = new FileStream(@"d:\Wipro_Training\day5\EmployProject\Employ.txt", FileMode.Open, FileAccess.Read);
            BinaryFormatter formatter = new BinaryFormatter();
            employList = (List<Employ>)formatter.Deserialize(fs);
            return "Data Retrieved from the File Successfully...";
        }

        public Employ SearchEmployDao(int empno)
        {
            Employ employFound = null;
            foreach (Employ employ in employList)
            {
                if (employ.Empno == empno)
                {
                    employFound = employ;
                    break;
                }
            }
            return employFound;
        }

        public List<Employ> ShowEmployDao()
        {
            return employList;
        }

        public string UpdateEmployDao(Employ employUpdated)
        {
            Employ employFound = SearchEmployDao(employUpdated.Empno);
            if (employFound != null)
            {
                employFound.Name = employUpdated.Name;
                employFound.Gender = employUpdated.Gender;
                employFound.Dept = employUpdated.Dept;
                employFound.Desig = employUpdated.Desig;
                employFound.Basic = employUpdated.Basic;
                return "Employ Record Updated...";
            }
            return "Employ Record Not Found...";
        }

        public string WriteToFileDao()
        {
            FileStream fs = new FileStream(@"d:\Wipro_Training\day5\EmployProject\Employ.txt", FileMode.Create, FileAccess.Write);
            BinaryFormatter formatter = new BinaryFormatter();
            formatter.Serialize(fs, employList);
            fs.Close();
            return "Data Stored in Files Successfully...";
        }
    }
}