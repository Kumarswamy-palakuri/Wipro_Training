using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class ArrayCopy
    {
        public void Show()
        {
            int[] a = new int[] { 12, 5, 23, 66, 22 };
            int[] b = a;
            for (int i = 0; i < b.Length; i++)
            {
                Console.WriteLine(b[i]);
            }
        }
        static void Main()
        {
            ArrayCopy arrayCopy = new ArrayCopy();
            arrayCopy.Show();
        }
    }
}
