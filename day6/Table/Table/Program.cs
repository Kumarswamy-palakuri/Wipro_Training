using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Table
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter Num that you want to print");
            int n = int.Parse(Console.ReadLine());
            for(int i=1;i<11;i++)
            {
                Console.WriteLine("{0}x{1}={2}",n,i,(n*i));
            }
        }
    }
}
