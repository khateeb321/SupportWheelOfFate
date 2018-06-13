using SupportWheelOfFate.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SupportWheelOfFate.Interface.IRepository
{
	public interface IBAUDetailsRepository
	{
		List<BAUDetails> Save(List<BAUDetails> BAUDetailsList);
		List<BAUDetails> GetAll();
		bool Reset();
	}
}