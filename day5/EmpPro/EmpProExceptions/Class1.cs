using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace EmpProExceptions
{
    public class EmployException : Exception
    {
        public EmployException(string message) : base(message) { }
    }
}
