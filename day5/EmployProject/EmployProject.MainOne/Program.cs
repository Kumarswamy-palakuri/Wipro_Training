using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployProject.Bal;
using EmployProject.Models;
using EmployProject.Exceptions;
using System.Collections.Concurrent;
using System.Net.Http.Headers;

namespace EmployProject.MainOne
{
    internal class Program
    {
        static EmployBal employBal;

        static Program()
        {
            employBal = new EmployBal();
        }

        public static void WriteFileMain()
        {
            Console.WriteLine(employBal.WriteFileBal());
        }

        public static void ReadFileMain()
        {
            Console.WriteLine(employBal.ReadFileBal());
        }
        public static void DeleteEmployMain()
        {
            int empno;
            Console.WriteLine("Enter Employ Number   ");
            empno = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine(employBal.DeleteEmployBal(empno));
        }

        public static void UpdateEmployMain()
        {
            Employ employ = new Employ();
            Console.WriteLine("Enter Employ Number  ");
            employ.Empno = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Employ Name  ");
            employ.Name = Console.ReadLine();
            Console.WriteLine("Enter Gender (MALE/FEMALE)   ");
            employ.Gender = Console.ReadLine();
            Console.WriteLine("Enter Department  ");
            employ.Dept = Console.ReadLine();
            Console.WriteLine("Enter Designation  ");
            employ.Desig = Console.ReadLine();
            Console.WriteLine("Enter Basic  ");
            employ.Basic = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine(employBal.UpdateEmployBal(employ));
        }
        public static void SearchEmployMain()
        {
            int empno;
            Console.WriteLine("Enter Employ Number   ");
            empno = Convert.ToInt32(Console.ReadLine());
            Employ employ = employBal.SearchEmployBal(empno);
            if (employ != null)
            {
                Console.WriteLine(employ);
            }
            else
            {
                Console.WriteLine("*** Employ Record Not Found ***");
            }
        }
        public static void ShowEmployMain()
        {
            List<Employ> employList = employBal.ShowEmployBal();
            Console.WriteLine("Employ Record Are   ");
            foreach (Employ employ in employList)
            {
                Console.WriteLine(employ);
            }
        }
        public static void AddEmployMain()
        {
            Employ employ = new Employ();
            Console.WriteLine("Enter Employ Number  ");
            employ.Empno = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Employ Name  ");
            employ.Name = Console.ReadLine();
            Console.WriteLine("Enter Gender (MALE/FEMALE)   ");
            employ.Gender = Console.ReadLine();
            Console.WriteLine("Enter Department  ");
            employ.Dept = Console.ReadLine();
            Console.WriteLine("Enter Designation  ");
            employ.Desig = Console.ReadLine();
            Console.WriteLine("Enter Basic  ");
            employ.Basic = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine(employBal.AddEmployBal(employ));
        }
        static void Main(string[] args)
        {
            int choice;
            do
            {
                Console.WriteLine("O P T I O N S");
                Console.WriteLine("-------------");
                Console.WriteLine("1. Add Employ");
                Console.WriteLine("2. Show Employ");
                Console.WriteLine("3. Search Employ");
                Console.WriteLine("4. Update Employ");
                Console.WriteLine("5. Delete Employ");
                Console.WriteLine("6. Write to File");
                Console.WriteLine("7. Read From File");
                Console.WriteLine("8. Exit");
                Console.WriteLine("Enter Your Choice  ");
                choice = Convert.ToInt32(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        try
                        {
                            AddEmployMain();
                        }
                        catch (EmployException e)
                        {
                            Console.WriteLine(e.Message);
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                        }
                        break;
                    case 2:
                        ShowEmployMain();
                        break;
                    case 3:
                        SearchEmployMain();
                        break;
                    case 4:
                        try
                        {
                            UpdateEmployMain();
                        }
                        catch (EmployException e)
                        {
                            Console.WriteLine(e.Message);
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                        }
                        break;
                    case 5:
                        DeleteEmployMain();
                        break;
                    case 6:
                        WriteFileMain();
                        break;
                    case 7:
                        ReadFileMain();
                        break;
                    case 8:
                        return;
                }
            } while (choice != 8);

        }
    }
}