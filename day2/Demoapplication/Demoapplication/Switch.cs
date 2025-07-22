using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class Switch
    {
        public void switchCheck(char ch)
        {
            switch (ch)
            {
                case 'A':
                case 'a':
                case '1':
                    Console.WriteLine("choose 1");
                    break;
                case 'B':
                case 'b':
                case '2':
                    Console.WriteLine("choose 2");
                    break;
                default:
                    Console.WriteLine("choosed other given options");
                    break;
            }
        }
        static void Main()
        {
            char ch= Convert.ToChar(Console.ReadLine());
                Switch obj = new Switch();
                    obj.switchCheck(ch);
            }
    }
}
