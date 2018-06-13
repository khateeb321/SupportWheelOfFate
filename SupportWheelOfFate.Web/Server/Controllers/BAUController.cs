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

		public ActionResult GetThisWeek()
		{
			var result = _repo.GetAll().Where(m => DateInsideOneWeek(m.Rota, DateTime.Now)).OrderBy(m => m.Rota);
			return Json(result, JsonRequestBehavior.AllowGet);
		}

		public static bool DateInsideOneWeek(DateTime checkDate, DateTime referenceDate)
		{
			// get first day of week from your actual culture info, 
			DayOfWeek firstWeekDay = System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek;
			// or you can set exactly what you want: firstWeekDay = DayOfWeek.Monday;
			// calculate first day of week from your reference date
			DateTime startDateOfWeek = referenceDate;
			while (startDateOfWeek.DayOfWeek != firstWeekDay)
			{ startDateOfWeek = startDateOfWeek.AddDays(-1d); }
			// fist day of week is find, then find last day of reference week
			DateTime endDateOfWeek = startDateOfWeek.AddDays(6d);
			// and check if checkDate is inside this period
			return checkDate >= startDateOfWeek && checkDate <= endDateOfWeek;
		}

		public ActionResult Save(List<BAUDetails> bauDetails)
		{
			var result = _repo.Save(bauDetails);
			return Json(result, JsonRequestBehavior.AllowGet);
		}

		public ActionResult reset()
		{
			var result = _repo.Reset();
			return Json(result, JsonRequestBehavior.AllowGet);
		}
	}
}