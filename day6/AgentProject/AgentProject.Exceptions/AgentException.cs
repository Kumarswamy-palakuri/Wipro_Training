using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace AgentProject.Exceptions
{
    public class AgentException :ApplicationException
    {
        public AgentException() { }

        public AgentException(string message) : base(message)
        {
        }

    }
}

