using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Extension
{
    internal static class CalcExtention
    {
        public static void mul(this Calculation calc, int a ,int b)
        {
            Console.WriteLine("Mul: "+(a*b));
        }
        public static void div(this Calculation calc, int a, int b)
        {
            Console.WriteLine("Div: "+(a / b));
        }

    }
}
