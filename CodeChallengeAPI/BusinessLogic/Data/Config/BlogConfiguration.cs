using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Data.Config
{
    public class BlogConfiguration : IEntityTypeConfiguration<Blog>
    {
        public void Configure(EntityTypeBuilder<Blog> builder) {
            builder.Property(p => p.Title).IsRequired().HasMaxLength(50);
            builder.Property(p => p.Content).HasMaxLength(5000);
            builder.Property(p => p.Image).HasMaxLength(1000);
        }
    }
}
