using SupportWheelOfFate.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SupportWheelOfFate.Interface.IRepository
{
	public interface IEngineersRepository
	{
		Engineers Save(Engineers engineer);
		List<Engineers> GetAll();
	}
}