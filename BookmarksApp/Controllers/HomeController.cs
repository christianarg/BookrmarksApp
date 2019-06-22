using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using BookmarkApp.Models;

namespace BookmarkApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment hostingEnv;

        public HomeController(IHostingEnvironment hostingEnv)
        {
            this.hostingEnv = hostingEnv;
        }
        public IActionResult Index()
        {
            if (hostingEnv.IsDevelopment())
            {
                return File("app/index.debug.html", "text/html");
            }
            return File("app/index.html","text/html");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
