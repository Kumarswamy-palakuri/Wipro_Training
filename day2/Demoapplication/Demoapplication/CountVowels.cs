using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class CountVowels
    {
        static void Main()
        {
            String str = Console.ReadLine();
            int count=0;
            char[] ch = str.ToCharArray();
            foreach(char i in ch)
            {
                char c = char.ToLower(i);
                if(c=='a' || c=='e' || c=='i' || c=='o' || c=='u')
                {
                    count++;
                }
            }
            Console.WriteLine(count);
        }
    }
}
