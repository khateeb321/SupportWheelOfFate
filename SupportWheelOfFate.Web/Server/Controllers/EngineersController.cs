using SupportWheelOfFate.Data.Repository;
using SupportWheelOfFate.Interface.IRepository;
using SupportWheelOfFate.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SupportWheelOfFate.Web.Server.Controllers
{
    public class EngineersController : Controller
    {
		private readonly IEngineersRepository _repo = new EngineersRepository();
		// GET: Engineers
		public ActionResult GetAll()
		{
			var result = _repo.GetAll();
			return Json(result, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Save(Engineers engineer)
		{
			var result = _repo.Save(engineer);
			return Json(result, JsonRequestBehavior.AllowGet);
		}
	}
}