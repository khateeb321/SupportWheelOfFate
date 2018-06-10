using SupportWheelOfFate.Model.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace SupportWheelOfFate.Data.Migrations
{
	public class Configrations : DbMigrationsConfiguration<WheelOfFaithContext>
	{
		public Configrations()
		{
			AutomaticMigrationsEnabled = true;
			AutomaticMigrationDataLossAllowed = true;
		}


		// Pre-Populate DB with Data
		protected override void Seed(WheelOfFaithContext context)
		{
			List<string> engineers = new List<string>()
			{
				"Dan",
				"Wale",
				"Ahmed",
				"Khateeb",
				"Alice",
				"Lauren",
				"Peter",
				"James",
				"Shawn",
				"Paula"
			};

			foreach (var engineer in engineers)
			{
				context.Engineers.AddOrUpdate(p => p.Id, new Engineers
				{
					name = engineer,
					DateAdded = DateTime.Now
				});
			}
		}
	}
}