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
        [HttpPost("SaveEmployee")]
        public bool SaveEmployee(Employee employee) {
            bool isSaved = false;
            List<Employee> empList = GetEmployees();
            var selectedEmp = empList.Where(e => e.Id == employee.Id).FirstOrDefault();
            selectedEmp.Name = employee.Name;
            selectedEmp.Email = employee.Email;
            selectedEmp.Designation = employee.Designation;
            selectedEmp.Phone = employee.Phone;
            empList[employee.Id - 1] = employee;
            string content = JsonConvert.SerializeObject(empList);
            this.SaveChanges(content, ref isSaved);
            return isSaved;
        }
        [HttpGet("GetEmpById/{empId}")]
        public Employee GetEmployee(int empId) {
          return  GetEmployees().Where(e => e.Id == empId).FirstOrDefault();
        }

        [HttpGet("GetDesignations")]
        public List<string> GetDesignations()
        {
            List<string> designations = new List<string>();
            designations.Add("Developer");
            designations.Add("Manager");
            designations.Add("Architect");
            designations.Add("Tester");
            designations.Add("Designer");
            designations.Add("Deliver manager");
            return designations;
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


        private void SaveChanges(string content, ref bool isSaved) {
            string filePath = hostingEnvironment.ContentRootPath + "/JsonDB/Employee.json";
            try
            {
                isSaved = true;
                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    writer.Write(content);
                }
            }
            catch (Exception exp) {
                isSaved = false;
                throw exp;
            }
            
        }
        
    }
}
