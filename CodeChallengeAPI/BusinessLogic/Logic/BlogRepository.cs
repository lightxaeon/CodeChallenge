using BusinessLogic.Data;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Logic
{
    public class BlogRepository : IBlogRepository
    {
        private readonly CodeChallengeDBContext _context;
        public BlogRepository(CodeChallengeDBContext context)
        {
            _context = context;
        }
        public async Task<Blog> GetBlogByIdAsync(int id)
        {
            return await _context.Blog.FindAsync(id);
        }

        public async Task<IReadOnlyList<Blog>> GetBlogsAsync()
        {
            return await _context.Blog.ToListAsync();
        }
    }
}
