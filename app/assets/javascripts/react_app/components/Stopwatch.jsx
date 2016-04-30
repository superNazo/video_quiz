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

    return (
      <span className={"stopwatch seconds"}>
        {this.state.seconds}
      </span>
    );
  }
  
});
