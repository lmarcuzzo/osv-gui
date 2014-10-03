var GraphBox = require("../GraphBox"),
    CassandraCompactionGraph = require("../../API/Applications/CassandraCompactionGraph");

function CompactionGraph() {
  GraphBox.call(this, arguments)
}

CompactionGraph.prototype = Object.create(GraphBox.prototype);

CompactionGraph.prototype.title = "Compaction";

CompactionGraph.prototype.extraSettings = function() {
  return {
    title: "Compaction",
    axes: {
      xaxis: {
        renderer: $.jqplot.DateAxisRenderer,
        tickOptions: {
          formatString: "%H:%M:%S"
        },
        label: "Time"
      },
    },
    series: [
      {
        label: "Bytes Compacted",
      },

      {
        label: "Total Bytes in Progress",
      }

    ],
  }
};

CompactionGraph.prototype.fetchData = function() {
  var data = CassandraCompactionGraph.getData();
  return $.Deferred().resolve(data);
    
};

module.exports = CompactionGraph;
