using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class PalindromeWords
    {
        public bool palin(string s)
        {
            string reversed = new string(s.Reverse().ToArray());
            return s.Equals(reversed, StringComparison.OrdinalIgnoreCase);
        }
        static void Main()
        {
            string str = Console.ReadLine();
            string[] words = str.Split(' ');
            PalindromeWords pal = new PalindromeWords();
            foreach (string i in words)
            {
                if(pal.palin(i))
                {
                    Console.WriteLine(i);
                }
            }
        }
    }
}
