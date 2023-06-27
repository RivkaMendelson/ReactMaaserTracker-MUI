using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class Income
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public int SourceId { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]
        public Source Source { get; set; }

       
    }
}
