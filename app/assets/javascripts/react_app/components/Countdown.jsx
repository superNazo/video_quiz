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
    var countdown = Math.round(this.state.countdown);
    var seconds = (countdown / 10).toFixed(1);
    var secondsStyle = {color: 'red'};

    return (
      <span style={secondsStyle}>
        {seconds}
      </span>
    );
  }
});

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
