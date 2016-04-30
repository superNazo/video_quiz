var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Stopwatch = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("StopwatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("StopwatchStore").getState();
  },

  componentDidMount: function() {
    if (this.props.setTime)
      this.getFlux().actions.setStopwatch(this.props.setTime);
    if (this.props.autorun == true)
      this.start(this.state.setTime);
  },

  start: function(seconds) {
    this.getFlux().actions.startStopwatch(seconds);
  },

  render: function() {
    var elapsed = Math.round(this.state.elapsed);
    var seconds = (elapsed / 10).toFixed(1);
    var secondsStyle = {color: 'red'};

    return (
      <span style={secondsStyle}>
        {seconds}
      </span>
    );
  }
});

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
