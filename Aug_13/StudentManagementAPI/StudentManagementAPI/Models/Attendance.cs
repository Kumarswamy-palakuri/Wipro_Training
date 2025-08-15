using System.Text.Json.Serialization;

namespace StudentManagementAPI.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool IsPresent { get; set; }
        public string Remarks { get; set; }

        public int StudentId { get; set; }
        [JsonIgnore]
        public Student? Student { get; set; }
    }
}
