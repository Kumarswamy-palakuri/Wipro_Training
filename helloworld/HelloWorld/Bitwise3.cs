using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    internal class Bitwise3
    {
       static void Main()
        {
            // Bitwise XOR sets each bit to 1 if the corresponding bits are different 

            int a = 5, b = 3;
            // 101
            // 011
            // 110 result 
            Console.WriteLine(a ^ b);
        }
    }
}
