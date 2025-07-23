using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace arrays
{
    internal class Boxing
    {
        static void Main()
        {
            int x = 54;
            string str = "kumar";
            double per = 89.25;

            /* Boxing */
            object ob1 = x;
            object ob2 = str;
            object ob3 = per;

            //Console.WriteLine(ob1+" "+ob2+" "+ob3);
            /* Unboxing */
            int x1 = (int)ob1;
            string str1 = (string)ob2;
            double per1 = (double)ob3;

            Console.WriteLine(x1+" "+str1+" "+per1);
        }
    }
}
