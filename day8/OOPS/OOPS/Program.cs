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
            Employee emp = new Employee();
            emp.name = "kumar";
            emp.id = 101;
            emp.mobile_num = 7330902582;
            emp.age = 25;
            emp.city = "hyd";

            Console.WriteLine("Name       : " + emp.name);
            Console.WriteLine("ID         : " + emp.id);
            Console.WriteLine("Mobile No  : " + emp.mobile_num);
            Console.WriteLine("Age        : " + emp.age);
            Console.WriteLine("City       : " + emp.city);

        }
    }
}
