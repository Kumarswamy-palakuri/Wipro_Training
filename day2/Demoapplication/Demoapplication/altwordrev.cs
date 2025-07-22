using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class altwordrev
    {
        static void Main()
        {
            string str = Console.ReadLine();
            string[] words = str.Split(' ');
            for (int i = 0; i < words.Length; i++)
            {
                if (i % 2 == 1)
                {
                    char[] chars = words[i].ToCharArray();
                    Array.Reverse(chars);
                    words[i] = new string(chars);
                }
            }
            string result = string.Join(" ", words);
            Console.WriteLine(result);
        }
    }
}
