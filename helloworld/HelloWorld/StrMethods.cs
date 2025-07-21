using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    internal class StrMethods
    {
        static void Main()
        {
            string str = "Welcome to Dotnet Programming...From Wipro";
            Console.WriteLine("Length of String is " +str.Length);
            Console.WriteLine("Lower Case String " +str.ToLower());
            Console.WriteLine("Upper Case String " +str.ToUpper());
            Console.WriteLine("First Occurrence of Char 'o' " +str.IndexOf("o"));
            Console.WriteLine("Replaced String  " +str.Replace("Dotnet","Dotnet Core"));
            string s1 = "Sunil", s2 = "Sreeja", s3 = "Sunil";
            Console.WriteLine(s1.Equals(s2));
            Console.WriteLine(s1.Equals(s3));
            Console.WriteLine(s1.CompareTo(s2));
            Console.WriteLine(s2.CompareTo(s1));
            Console.WriteLine(s1.CompareTo(s3));
        }
    }
}
