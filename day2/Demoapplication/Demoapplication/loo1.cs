using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class loo1
    {
        public void repeat(int n)
        {
            int i = 0;
            while(i<n)
            {
                Console.WriteLine("loop iteration no "+(i+1));
                i++;
            }
        }
        static void Main()
        {
            int n=Convert.ToInt32(Console.ReadLine());
            loo1 loop1 = new loo1();
            loop1.repeat(n);
        }
    }
}
