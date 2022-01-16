using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using JqueryProgram.Api.Model;
using System.IO;
using Microsoft.AspNetCore.Hosting;
namespace JqueryProgram.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IWebHostEnvironment hostingEnvironment;
        private string _dbContent;
        private string GetDBPath {
            get { 
                return hostingEnvironment.ContentRootPath + "/JsonDB/Employee.json";
            }
        }
        private string DBContent {
            get {
                return JsonConvert.SerializeObject(GetAllEmployee());
            }
            set {
                _dbContent = value;
            }
        }
        public EmployeeController(IWebHostEnvironment hosting)
        {
            this.hostingEnvironment = hosting;
            CreateEmployees();
        }
        [HttpGet("Test")]
        public string Test() {
            return "Ya, Its working " + hostingEnvironment.ContentRootPath;
        }
        [HttpGet("GetAllEmployee")]
        public IEnumerable<Employee> GetAllEmployee()
        {
            return GetEmployees();
        }
        [HttpPost]
        public bool SaveEmployee([FromBody] Employee employee) {
            bool isSaved = false;

            return isSaved;
        }
        [HttpGet("GetEmpById/{empId}")]
        public Employee GetEmployee(int empId) {
          return  GetEmployees().Where(e => e.Id == empId).FirstOrDefault();
        }

        private List<Employee> GetEmployees() {
            List<Employee> emp = null;
            using (StreamReader reader = new StreamReader(this.GetDBPath))
            {
                emp = JsonConvert.DeserializeObject<List<Employee>>(reader.ReadToEnd());
            }
            return emp;
        } 
        private void CreateEmployees() {
            string filePath = hostingEnvironment.ContentRootPath + "/JsonDB/Employee.json";
            if (System.IO.File.Exists(filePath)) {
                using (StreamReader r = new StreamReader(filePath))
                {
                    if (r.ReadLine()!=null)
                    {
                        return;
                    }
                }
                List<Employee> emps = new List<Employee>();
                for (int i = 1; i < 200; i++)
                {
                    emps.Add(new Employee()
                    {
                        Id = i,
                        EmpId = "EMP000" + i.ToString(),
                        Name = "EmpName" + i.ToString(),
                        Email = "EmpName" + i.ToString() + "@domain.com",
                        Designation = "DES" + i.ToString(),
                        Phone = "000000000000"
                    });
                }
                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    writer.Write(JsonConvert.SerializeObject(emps));
                }
            }

        }

        private void SaveChanges() { 
            
        }
        
    }
}
