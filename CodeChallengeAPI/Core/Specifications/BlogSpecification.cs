using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
   public class BlogSpecification : BaseSpecification<Blog>
    {
        public BlogSpecification(int pageSize,int pageIndex) {
            ApplyPagging(pageSize * (pageIndex - 1),pageSize);
        }
        public BlogSpecification(int id) : base(x => x.Id == id) { 
        
        }
    }
}
