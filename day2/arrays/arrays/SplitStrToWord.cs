using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace arrays
{
    internal class SplitStrToWord
    {
        static void Main()
        {
            string str = Console.ReadLine();
            string[] strArray = str.Split(' ');
            int k = 0;
            foreach(string i in strArray)
            {
                Console.WriteLine("{0} : {1}", (k++), i);
                
            }
        }
    }
}
