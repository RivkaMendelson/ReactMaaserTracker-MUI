using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;
using ReactMaaserTrackerMUI_Starter.Web.Models;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private string _connectionString;
        private IConfiguration _configuration;

        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _configuration = configuration;
        }

        [Route("getSources")]
        public List<Source> GetSources()
        {
            var repo = new Repository(_connectionString);
            return repo.GetSources();
        }

        [Route("addSource")]
        public void AddSource(Source source)
        {
            var repo = new Repository(_connectionString);
            repo.AddSource(source);
        }

        [Route("editSource")]
        public void EditSource(Source source)
        {
            var repo = new Repository(_connectionString);
            repo.EditSource(source);
        }

        [Route("deleteSource")]
        public void DeleteSource(Source source)
        {
            var repo = new Repository(_connectionString);
            repo.DeleteSource(source.Id);
        }

        [Route("addIncome")]
        public void AddIncome(Income income)
        {
            var repo = new Repository(_connectionString);
            repo.AddIncome(income);
        }

        [Route("addmaaser")]
        public void AddMaaser(Maaser maaser)
        {
            var repo = new Repository(_connectionString);
            repo.AddMaaser(maaser);
        }

        [Route("getIncomes")]
        public List<IncomeWithSource> GetIncomes()
        {
            var repo = new Repository(_connectionString);
            var incomes = repo.GetIncomes();
            var incomes2 = incomes.Select(i => new IncomeWithSource { Income = i, Source = repo.GetSourceLabelById(i.SourceId) }).ToList();
            return incomes2;

        }

        [Route("getMaaser")]
        public List<Maaser> GetMaaser()
        {
            var repo = new Repository(_connectionString);
            return repo.GetMaaser();
        }

        [Route("getOverview")]
        public IncomeMaaser GetOverview()
        {
            var repo = new Repository(_connectionString);
            return repo.GetOverview();
        }
    }
}
