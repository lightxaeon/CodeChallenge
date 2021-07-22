using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.DTOs;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IGenericRepository<Blog> _blogRepository;
        private readonly IMapper _mapper;
        private const int maxPageSize = 20;
        public BlogController(IGenericRepository<Blog> blogRepository, IMapper mapper)
        {
            _blogRepository = blogRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<BlogDto>>> GetBlogs([FromQuery] int pageIndex, [FromQuery] int pageSize)
        {
            pageIndex = pageIndex <= 0 ? 1 : pageIndex;
            pageSize = pageSize > maxPageSize ? maxPageSize : (pageSize <= 0) ? 5 : pageSize;
            var spec = new BlogSpecification(pageSize, pageIndex);
            var blogs = await _blogRepository.GetAllWithSpec(spec);
            var specCount = new BlogForCountingSpecification();
            var totalBlogs = await _blogRepository.CountAsync(specCount);
            var rounded = Math.Ceiling(Convert.ToDecimal(totalBlogs / pageSize));
            var totalPages = Convert.ToInt32(rounded);

            var data = _mapper.Map<IReadOnlyList<Blog>, IReadOnlyList<BlogDto>>(blogs);
            return Ok(new Pagination<BlogDto>
            {
                Count = totalBlogs,
                Data = data,
                PageCount = totalPages,
                PageIndex = pageIndex,
                PageSize = pageSize
            });
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDto>> GetBlogs(int id)
        {
            var spec = new BlogSpecification(id);
            var blog = await _blogRepository.GetByIdWithSpec(spec);
            return _mapper.Map<Blog, BlogDto>(blog);
        }
        [HttpPost]
        public async Task<ActionResult<Blog>> Post(Blog blog)
        {
            var result = await _blogRepository.Add(blog);
            if (result == 0)
            {
                throw new Exception("Blog not added");

            }
            else
                return Ok(blog);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Blog>> Put(int id,Blog blog)
        {
            blog.Id = id;
            var result = await _blogRepository.Update(blog);
            if (result == 0)
            {
                throw new Exception("Blog not updated");

            }
            else
                return Ok(blog);
        }
    }
}
