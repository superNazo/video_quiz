var renderCountdwown = function(seconds, autorun, id) {
  var countdownStores = {CountdownStore: new CountdownStore()};
  var countdownFlux = new Fluxxor.Flux(countdownStores, countdownActions);
  var settedId = id || "countdown";

  ReactDOM.render(
    <Countdown flux={countdownFlux}
               setTime={seconds}
               autorun={autorun}/>, document.getElementById(settedId)
  );
};

var renderStopwatch = function(seconds, autorun) {
  var stopwatchStores = {StopwatchStore: new StopwatchStore()};
  var stopwatchFlux = new Fluxxor.Flux(stopwatchStores, stopwatchActions);
  var settedId = id || "stopwatch";

  ReactDOM.render(
    <Stopwatch flux={stopwatchFlux}
               setTime={seconds}
               autorun={autorun}/>, document.getElementById(settedId)
  );
};
