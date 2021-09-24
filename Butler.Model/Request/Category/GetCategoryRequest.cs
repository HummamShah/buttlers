﻿using Butler.Model.EntityModel;
using Butler.Model.Request.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Butler.Model.Request.Category
{
    public class GetCategoryResponse : Response 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ControlCenterId { get; set; }
        public bool IsAdded { get; set; }
    }
    public class GetCategoryRequest
    {
        public int Id { get; set; }
        private ButlerEntities _dbContext = new ButlerEntities();
        public object RunRequest(GetCategoryRequest req)
        {
            var response = new GetCategoryResponse();
            response.ValidationErrors = new List<string>();
            try
            {
                var Category = _dbContext.Category.Where(x => x.Id == req.Id).FirstOrDefault();
                response.Id = Category.Id;
                response.Name = Category.Name;
                response.Description = Category.Description;
                response.ControlCenterId = Category.ContolCenterId;
                response.IsAdded = Category.IsAdded;
                response.Success = true;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.ValidationErrors.Add(e.Message.ToString());
            }
            return response;
        }

    }
}
