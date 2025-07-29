using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExceptionHandling
{
    internal class ExecptionEx2
    {
        static void Main()
        {

            try
            {
                string str = Console.ReadLine();
                int basic = int.Parse(Console.ReadLine());
                Console.WriteLine("{0} is having {1}", str, basic);
            }
            catch (Exception e)
            {
                Console.WriteLine("there is error occured -> "+e.Message);
            }
        }

    }
}
