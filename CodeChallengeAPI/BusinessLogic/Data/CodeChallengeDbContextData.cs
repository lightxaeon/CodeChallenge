using Core.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class CodeChallengeDbContextData
    {
        public static async Task LoadDataAsync(CodeChallengeDBContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Blog.Any()) {
                    var blogData = File.ReadAllText("../BusinessLogic/DataLoading/blog.json");
                    var blogs = JsonSerializer.Deserialize<List<Blog>>(blogData);
                    foreach (var blog in blogs) {
                        context.Blog.Add(blog);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception e) {
                var logger = loggerFactory.CreateLogger<CodeChallengeDbContextData>();
                logger.LogError(e.Message);
            }
        }
    }
}
