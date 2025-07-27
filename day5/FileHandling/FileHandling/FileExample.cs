using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace FileHandling
{
    internal class FileExample
    {
        static void Main()
        {
            FileInfo fo = new FileInfo("D://Wipro_Training//day5//FileHandling//king2.txt");
            FileStream fs = fo.Open(FileMode.OpenOrCreate, FileAccess.Write,FileShare.Read);
            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine("Hello wecome to files");
            sw.WriteLine("This is files second Line");
            sw.Close();
            Console.WriteLine("File successsfully created and written");
            
        }
    }
}
