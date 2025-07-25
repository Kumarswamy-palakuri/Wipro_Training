using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Extension
{
    internal class Calculation
    {
        public void add(int a, int b)
        {
            Console.WriteLine("add: "+(a+b));
        }
        public void sub(int a, int b)
        {
            Console.WriteLine("add: " + (a - b));
        }
        static void Main()
        {
            Calculation calc = new Calculation();
            calc.add(2, 3);
            calc.sub(2, 3);
            calc.mul(2, 3);
            calc.div(2, 3);
        }
    }
}
