using SupportWheelOfFate.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace SupportWheelOfFate.Interface
{
	public interface IWheelOfFaithContext
	{
		// Interface to Entities
		DbSet<BAUDetails> BAUDetails { get; set; }
		DbSet<Engineers> Engineers { get; set; }
		int SaveChanges();
		DbEntityEntry Entry(object o);
		void Dispose();
	}
}