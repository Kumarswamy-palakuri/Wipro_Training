using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class loop2
    {
        public void repeat(int n)
        {
            //int i = 0;
            for(int i=0;i<n;i++)
            {
                Console.WriteLine("For loop iteration no " + (i + 1));
                
            }
        }
        static void Main()
        {
            int n = Convert.ToInt32(Console.ReadLine());
            loop2 loop1 = new loop2();
            loop1.repeat(n);
        }
    }
}
