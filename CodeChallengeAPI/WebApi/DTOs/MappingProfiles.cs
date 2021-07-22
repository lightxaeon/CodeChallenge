using AutoMapper;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.DTOs
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Blog, BlogDto>();
        }
    }
}
