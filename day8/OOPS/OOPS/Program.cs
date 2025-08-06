using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPS
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //string name;
            //int id;
            //long mobile_num;
            //int age;
            //string city;
            //Employee emp = new Employee();
            //emp.name = "kumar";
            //emp.id = 101;
            //emp.mobile_num = 7330902582;
            //emp.age = 25;
            //emp.city = "hyd";
            List<Employee> emps = new List<Employee>();
            Employee emp1 = new Employee("kumar", 101, 7330902582, 25, "hyd");
            Employee emp2 = new Employee("sai", 102, 7330902583, 26, "vizag");
            Employee emp3 = new Employee("ramya", 103, 7330902584, 24, "warangal");
            Employee emp4 = new Employee("anil", 104, 7330902585, 27, "nizamabad");
            Employee emp5 = new Employee("divya", 105, 7330902586, 23, "karimnagar");
            Employee emp6 = new Employee("vamsi", 106, 7330902587, 28, "khammam");

            emps.Add(emp1);
            emps.Add(emp2);
            emps.Add(emp3);
            emps.Add(emp4); 
            emps.Add(emp5);
            emps.Add(emp6);
            foreach (Employee e in emps)
            {
                Console.WriteLine("Name       : " + e.name);
                Console.WriteLine("ID         : " + e.id);
                Console.WriteLine("Mobile No  : " + e.mobile_num);
                Console.WriteLine("Age        : " + e.age);
                Console.WriteLine("City       : " + e.city);
                Console.WriteLine();
            }

        }
    }
}
