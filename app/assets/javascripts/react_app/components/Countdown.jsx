var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Countdown = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("CountdownStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("CountdownStore").getState();
  },

  componentDidMount: function() {
    if (this.props.setTime)
      this.getFlux().actions.setCountdown(this.props.setTime);
    if (this.props.autorun == true)
      this.start(this.state.setTime);
  },

  start: function() {
    this.getFlux().actions.startCountdown();
  },

  render: function() {

    return (
      <span className={"countdown seconds"}>
        {this.state.seconds}
      </span>
    );
  }

});
