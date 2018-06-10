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
    public class BAUController : Controller
    {
		private readonly IBAUDetailsRepository _repo = new BAUDetailsRepository();
		// GET: BAU
		public ActionResult GetAll()
		{
			var result = _repo.GetAll();
			return Json(result, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Save(List<BAUDetails> bauDetails)
		{
			var result = _repo.Save(bauDetails);
			return Json(result, JsonRequestBehavior.AllowGet);
		}
	}
}