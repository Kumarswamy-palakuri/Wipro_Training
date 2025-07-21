using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    internal class EmployCustom
    {
        static void Main()
        {
            Employ employ1 = new Employ();
            Employ employ2 = new Employ();
            Console.WriteLine("Enter Employ No, Name and Basic for First Employ  ");
            employ1.empno = Convert.ToInt32(Console.ReadLine());
            employ1.name = Console.ReadLine();
            employ1.basic = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Enter Employ No, Name and Basic for Second Employ  ");
            employ2.empno = Convert.ToInt32(Console.ReadLine());
            employ2.name = Console.ReadLine();
            employ2.basic = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("First Employ Data  ");
            Console.WriteLine("Employ No  " +employ1.empno);
            Console.WriteLine("Employ Name  " +employ1.name);
            Console.WriteLine("Basic  " +employ1.basic);

            Console.WriteLine("Second Employ Data  ");
            Console.WriteLine("Employ No  " + employ2.empno);
            Console.WriteLine("Employ Name  " + employ2.name);
            Console.WriteLine("Basic  " + employ2.basic);
        }
    }
}
