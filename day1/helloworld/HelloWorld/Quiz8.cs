using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    internal class Quiz8
    {
        int x;
        static void Main()
        {
            Quiz8 obj1= new Quiz8();
            obj1.x = 12;
            Quiz8 obj2 = obj1;
            obj2.x = 13;
            Console.WriteLine(obj1.x);

            Console.WriteLine(obj1.GetHashCode());
            Console.WriteLine(obj2.GetHashCode());
        }
    }
}
