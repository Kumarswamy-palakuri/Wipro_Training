using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class comparethreenums
    {
        public int result(int a,int b,int c)
        {
            int m = a;
            if(m<b)
            {
                m = b;
            }
            if(m<c)
            {
                m = c;
            }
            return m;

        }
        static void Main()
        {
            int a = Convert.ToInt32(Console.ReadLine());
            int b = Convert.ToInt32(Console.ReadLine());
            int c = Convert.ToInt32(Console.ReadLine());
            comparethreenums obj = new comparethreenums();
            Console.WriteLine(obj.result(a,b,c));
        }
    }
}
