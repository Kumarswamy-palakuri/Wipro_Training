using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class factorial
    {
        public int fact(int n)
        {
            int i = 1;
            int k = 1;
            while(i<=n)
            {
                k = k * i;
                i++;
            }
            return k;
        }
        static void Main()
        {
            int n = Convert.ToInt32(Console.ReadLine());
            factorial factorial1 = new factorial();
            Console.WriteLine(factorial1.fact(n));
        }
    }
}
