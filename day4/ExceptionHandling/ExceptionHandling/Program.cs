using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExceptionHandling
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int a, b;
            Console.WriteLine("Enter two numbers");
            try
            {
                a = Convert.ToInt32(Console.ReadLine());
                b = Convert.ToInt32(Console.ReadLine());
                int res = a / b;
                Console.WriteLine("Result is : "+res);
            }
            catch (OverflowException e)
            {
                Console.WriteLine("you have entered too big number....");
            }
            catch (DivideByZeroException e)
            {
                Console.WriteLine("You tried to divide with zero.......");
            }
            finally
            {
                Console.WriteLine("Execution completed.");
            }
        }
    }
}
