using Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBlogRepository
    {
        Task<Blog> GetBlogByIdAsync(int id);
        Task<IReadOnlyList<Blog>> GetBlogsAsync();
    }
}
