using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace ExceptionHandling
{
    internal class CustomException
    {
        static void Main()
        {
            int age = int.Parse(Console.ReadLine());
            if(age>18)
            {
                Console.WriteLine("Welcome to voter");
            }
            else
            {
                throw new CustException("get out from this place");
            }
        }
        
    }
    public class CustException: Exception
    {
        public CustException(string message) : base(message)
        { 
        }

        
    }
}
