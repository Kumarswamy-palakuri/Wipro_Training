using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    internal class BitWise2
    {
        static void Main()
        {
            int a = 5, b = 3;  // 101  011
            // 101
            // 011  
            // 111
            Console.WriteLine(a | b);
        }
    }
}
