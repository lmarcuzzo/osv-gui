var OSv = OSv || {};
OSv.API = OSv.API || {};

OSv.API.GraphAPI = (function() {
  
  function GraphAPI (path, formatter) {
    this.path = path;
    this.data = [];
    this.startPulling();
    if (formatter) {
      this.formatResponse = formatter;
    }
  };

  GraphAPI.prototype.formatResponse = function (response) {
    return [ Date.now(), response / Math.pow(1024, 2) ];
  };

  GraphAPI.prototype.rate = OSv.Settings.DataFetchingRate;
  
  GraphAPI.prototype.fetchData = function() {
    var self = this,
      path = OSv.Settings.BasePath + this.path;

    $.get(path)
     .then(function (response) {
       return typeof response == "string"? JSON.parse(response) : response;
     })
     .then(this.formatResponse.bind(this)).then(function (res) {
       self.data.push(res)
    });
  };

  GraphAPI.prototype.getData = function() {
    return this.data.slice( -1 * OSv.Settings.Graph.MaxTicks);
  };

  GraphAPI.prototype.startPulling = function() {
    this.fetchData();
    setInterval(this.fetchData.bind(this), this.rate);
  };

  return GraphAPI;

}());
