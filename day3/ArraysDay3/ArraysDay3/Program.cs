using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArraysDay3
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[,] x = new int[2, 3]
            {
                {2,2,5 },
                {5,8,4 }
            };
            Console.WriteLine("--------------------------------------");
            Console.WriteLine(x[0, 0]);
            Console.WriteLine(x[0, 1]);
            Console.WriteLine(x[0, 2]);
            Console.WriteLine("--------------------------------------");

            Console.WriteLine(x[1, 0]);
            Console.WriteLine(x[1, 1]);
            Console.WriteLine(x[1, 2]);
        
}
    }
}
