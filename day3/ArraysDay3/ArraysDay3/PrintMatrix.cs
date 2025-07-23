using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArraysDay3
{
    internal class PrintMatrix
    {
        static void Main(string[] args)
        {
            int[,] x = new int[2, 3]
            {
                {2,2,5 },
                {5,8,4 }
            };
            for(int i=0;i<x.GetLength(0);i++)
            {
                for (int j = 0; j < x.GetLength(1); j++)
                {
                    Console.Write("({0} {1} : {2}) ", i, j, x[i,j]);
                }
                Console.WriteLine();
            }
        }
    }
}
