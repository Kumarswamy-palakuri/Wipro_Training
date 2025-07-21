using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    internal class Quiz5
    {
        static void Main()
        {
            int x = 12;
            Console.WriteLine(x++ + ++x + ++x + x++);
            // 12 + 14 + 15 + 15 
        }
    }
}
