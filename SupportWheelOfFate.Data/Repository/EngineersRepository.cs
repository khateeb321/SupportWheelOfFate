using SupportWheelOfFate.Interface.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SupportWheelOfFate.Model.Models;
using SupportWheelOfFate.Interface;
using System.Data.Entity;

namespace SupportWheelOfFate.Data.Repository
{
	public class EngineersRepository : IEngineersRepository
	{
		private IWheelOfFaithContext _db = new WheelOfFaithContext();
		public List<Engineers> GetAll()
		{
			return _db.Engineers.ToList();
		}

		public Engineers Save(Engineers engineer)
		{
			_db.Entry(engineer).State = EntityState.Added;
			_db.Engineers.Add(engineer);
			_db.SaveChanges();

			return engineer;
		}
	}
}