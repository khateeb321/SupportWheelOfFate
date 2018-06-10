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
	public class BAUDetailsRepository : IBAUDetailsRepository
	{
		private IWheelOfFaithContext _db = new WheelOfFaithContext();
		public List<BAUDetails> GetAll()
		{
			return _db.BAUDetails.ToList();
		}

		public List<BAUDetails> Save(List<BAUDetails> BAUDetailsList)
		{
			foreach (var BAUDetail in BAUDetailsList)
			{
				_db.Entry(BAUDetail).State = EntityState.Added;
				_db.BAUDetails.Add(BAUDetail);
			}

			_db.SaveChanges();
			return BAUDetailsList;
		}
	}
}