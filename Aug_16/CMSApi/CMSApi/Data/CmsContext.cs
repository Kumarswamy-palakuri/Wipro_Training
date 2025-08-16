using CMSApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CMSApi.Data
{
    public class CmsContext : DbContext
    {
        public CmsContext(DbContextOptions<CmsContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
    }
}
