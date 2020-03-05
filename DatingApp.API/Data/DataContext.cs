using DatingApp.API.Properties.Models;
using Microsoft.EntityFrameworkCore;
namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options){}
        
        public DbSet<Values> Valuess { get; set; }
    }
}