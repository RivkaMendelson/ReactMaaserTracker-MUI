using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System.Xml.Linq;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class Repository
    {
        private readonly string _connectionString;

        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Source> GetSources()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Sources.ToList();
        }

        public void AddSource(Source source)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Sources.Add(source);
            context.SaveChanges();
        }

        public void EditSource(Source source)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Sources.Update(source);
            context.SaveChanges();
        }
        public void DeleteSource(int id)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Sources WHERE Id = {id}");
            context.SaveChanges();
        }
        public void AddIncome(Income income)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Income.Add(income);
            context.SaveChanges();
        }
        public void AddMaaser(Maaser maaser)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Maaser.Add(maaser);
            context.SaveChanges();
        }

        public List<Maaser> GetMaaser()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Maaser.ToList();
        }

        public List<Income> GetIncomes()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Income.ToList();

        }

        public string GetSourceLabelById(int id)
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Sources.FirstOrDefault(s => s.Id == id).Name;

        }

        public IncomeMaaser GetOverview()
        {
            using var context = new MaaserDataContext(_connectionString);
            int income = context.Income.Sum(income => income.Amount);
            int maaser = context.Maaser.Sum(maaser => maaser.Amount);
            IncomeMaaser im = new IncomeMaaser { Income = income, Maaser = maaser };
            return im;
        }
    }
}