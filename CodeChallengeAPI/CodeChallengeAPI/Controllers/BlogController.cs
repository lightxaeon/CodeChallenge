using CodeChallengeAPI.Context;
using CodeChallengeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodeChallengeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BlogController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/<BlogController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listBlogs = await _context.Blog.ToListAsync();
                return Ok(listBlogs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // GET api/<BlogController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BlogController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Blog blog)
        {
            try
            {
                _context.Add(blog);
                await _context.SaveChangesAsync();

                return Ok(blog);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<BlogController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Blog blog)
        {
            try
            {
                if (id != blog.Id)
                    return NotFound();

                _context.Update(blog);
                await _context.SaveChangesAsync();

                return Ok(new { message="Blog updated!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<BlogController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var blog = await _context.Blog.FindAsync(id);
                if (blog == null)
                    return NotFound();
                _context.Blog.Remove(blog);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Blog deleted!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
