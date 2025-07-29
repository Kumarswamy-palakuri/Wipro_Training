using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgentProject.Models
{
    public class Agent
    {
        public int Agentid { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public int PremiumAmount { get; set; }
        public Agent() { }
        public Agent (int agendid,string firstname,string lastname,string city,string gender,int premiumamount)
        {
            Agentid = agendid;
            Firstname = firstname;
            Lastname = lastname;
            City = city;
            Gender = gender;
            PremiumAmount = premiumamount;
        }
    }
}
