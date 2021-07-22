using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.DTOs;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IMapper _mapper;
        private const int maxPageSize = 20;
        public BlogController(IBlogRepository blogRepository, IMapper mapper)
        {
            _blogRepository = blogRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<Blog>>> GetBlogs([FromQuery] int? pageIndex, [FromQuery] int? pageSize)
        {
            pageIndex = pageIndex == null ? 1 : pageIndex;
            pageSize = pageSize > maxPageSize ? maxPageSize : (pageSize == null) ? 5 : pageSize;
            var blogs = await _blogRepository.GetBlogsAsync();
            return Ok(_mapper.Map<IReadOnlyList<Blog>, IReadOnlyList<BlogDto>>(blogs));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDto>> GetBlogs(int id)
        {
            var blog = await _blogRepository.GetBlogByIdAsync(id);
            return _mapper.Map<Blog, BlogDto>(blog);
        }
    }
}
