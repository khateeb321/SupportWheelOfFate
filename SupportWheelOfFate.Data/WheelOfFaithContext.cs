using SupportWheelOfFate.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SupportWheelOfFate.Model.Models;

namespace SupportWheelOfFate.Data
{
	public class WheelOfFaithContext : DbContext, IWheelOfFaithContext
	{
		public WheelOfFaithContext()
		{
			// Connection String, change "DESKTOP-SORKDQO" with your PC name
			Database.Connection.ConnectionString = @"Data Source=DESKTOP-SORKDQO;
                Initial Catalog=WheelOfFaithDB;
                Integrated Security=True;
                Connect Timeout=15;
                Encrypt=False;
                TrustServerCertificate=True;
                ApplicationIntent=ReadWrite;
                MultiSubnetFailover=False";
		}

		// DB Entities
		public DbSet<BAUDetails> BAUDetails { get; set; }
		public DbSet<Engineers> Engineers { get; set; }
	}
}