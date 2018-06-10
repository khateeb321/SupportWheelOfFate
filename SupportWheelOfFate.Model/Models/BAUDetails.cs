using SupportWheelOfFate.Model.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SupportWheelOfFate.Model.Models
{
	public class BAUDetails : BaseModel
	{
		public int UserId { get; set; }
		public DateTime Rota { get; set; }
	}
}