using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demoapplication
{
    internal class BoxingEx2
    {
        public void Show(object ob)
        {
            string type = ob.GetType().Name;
            Console.WriteLine(type);
            if (type.Equals("Int32"))
            {
                int x = (Int32)ob;
                Console.WriteLine("Integer Casting  " + x);
            }
            if (type.Equals("String"))
            {
                string x = (string)ob;
                Console.WriteLine("String Casting  " + x);
            }
            if (type.Equals("Double"))
            {
                double x = (Double)ob;
                Console.WriteLine("Double Casting  " + x);
            }
        }
        static void Main()
        {
            int x = 21;
            string str = "Company";
            double y = 22.3;

            BoxingEx2 obj = new BoxingEx2();
            obj.Show(x);
            obj.Show(y);
            obj.Show(str);
        }
    }

}

