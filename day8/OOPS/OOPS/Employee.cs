using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Text;
using System.Threading.Tasks;

namespace OOPS
{
    internal class Employee
    {
        internal string name;
        internal int id;
        internal long mobile_num;
        internal int age;
        internal string city;
        internal Employee()
        { }
        // ✅ Correct: constructor with no return type
        internal Employee(string Name, int Id, long Mobile_num, int Age, string City)
        {
            name = Name;
            id = Id;
            mobile_num = Mobile_num;
            age = Age;
            city = City;
        }
    }

}
