var renderVideoRecorder = function(id, countdown, limit, autorun, width, height, perms) {

  var videoRecorderStores = {
    VideoRecorderStore: new VideoRecorderStore(),
    CountdownStore: new CountdownStore(),
    StopwatchStore: new StopwatchStore()
  };

  var mergedActions = {};
  Object.assign(mergedActions, videoRecorderActions,
                countdownActions,stopwatchActions);

  var videoRecorderFlux = new Fluxxor.Flux(videoRecorderStores, mergedActions);

  var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

  var VideoRecorder = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("VideoRecorderStore",
                                        "CountdownStore", "StopwatchStore")],

    getInitialState: function() {
      return {
        statusReady: "Ready to record.",
        statusCountdown: "Counting down till record...",
        statusRecording: "Record in progress...",
        statusUploading: "Your video is uploading to the server...",
        statusUploaded: "Video was successfully uploaded.",

        showStartRecordButton: false,
        showStopRecordButton: false,
        showNextQuestionButton: false,

        triggerStartRecord: false,
        triggerStopRecord: false,

        ziggeoApiListenOnSubmitted: false
      };
    },

    getStateFromFlux: function() {
      var flux = this.getFlux();
      return {
        VideoRecorderStore: flux.store("VideoRecorderStore").getState(),
        CountdownStore: flux.store("CountdownStore").getState(),
        StopwatchStore: flux.store("StopwatchStore").getState()
      };
    },

    componentDidMount: function() {
      this.props.autorun === true
        ? this.getFlux().actions.setVideoRecorderStatus(this.state.statusCountdown)
        : this.getFlux().actions.setVideoRecorderStatus(this.state.statusReady);
      this.setState({
        showStartRecordButton: true,
        triggerStartRecord: true
      });
    },

    videoRecorderId: function() {
      return ((typeof this.props.id === "string")
        ? this.props.id
        : "video-recorder");
    },

    getVideoRecorder: function() {
      var id = this.videoRecorderId();
      return ZiggeoApi.Embed.get(id);
    },

    handleCountdown: function() {
      if (this.state.VideoRecorderStore.status === this.state.statusCountdown) {
        this.getFlux().actions.stopCountdown();
        this.startRecord();
      } else if (this.props.countdown === 0 ||
                 this.props.countdown === null ||
                 this.props.countdown === undefined) {
        this.startRecord();
      } else {
        this.getFlux().actions.setVideoRecorderStatus(this.state.statusCountdown);
      };
    },

    startRecord: function() {
      this.getVideoRecorder().record();
      this.getFlux().actions.setVideoRecorderStatus(this.state.statusRecording);
      this.setState({
        showStartRecordButton: false,
        showStopRecordButton: true,
        triggerStopRecord: true
      });
    },

    stopRecord: function() {
      this.getVideoRecorder().stopRecord();
      this.getFlux().actions.stopStopwatch();
      this.getFlux().actions.setVideoRecorderStatus(this.state.statusUploading);
      this.setState({
        showStartRecordButton: false,
        showStopRecordButton: false,
        ziggeoApiListenOnSubmitted: true
      });
    },

    render: function() {
      var id = this.videoRecorderId();
      var countdown = this.props.countdown || 0;
      var limit = this.props.limit || 30;
      var width = this.props.width || 160;
      var height = this.props.height || 120;
      var perms = this.props.perms || "forbidrerecord";

      var status = this.state.VideoRecorderStore.status;
      var statusReady = this.state.statusReady;
      var statusCountdown = this.state.statusCountdown;
      var statusRecording = this.state.statusRecording;
      var statusUploading = this.state.statusUploading;
      var statusUploaded = this.state.statusUploaded;

      var divStyle = {width: width};

      var statusBar = function() {
        switch (status) {
          case statusReady:
            return (<p>{status}</p>);
          case statusCountdown:
            return (
              <p>Will record in: <Countdown flux={videoRecorderFlux}
                                            setTime={countdown}
                                            autorun={true}/>
              </p>
            );
          case statusRecording:
            return (
              <p>Record in progress: <Stopwatch flux={videoRecorderFlux}
                                                setTime={limit}
                                                autorun={true}/>
              </p>
            );
          case statusUploading:
            return (<p>{status}</p>);
          case statusUploaded:
            return (<p>{status}</p>);
          default:
            return <p>{status}</p>;
        };
      };

      let startRecordButton = null;
      if (this.state.showStartRecordButton) {
        startRecordButton = (
          <button type="button" className="recorder-btn record"
                  aria-label="Start record" onClick={() => this.handleCountdown()}>
            <span className="glyphicon glyphicon-record" aria-hidden="true"></span>
          </button>
        );
      };

      let stopRecordButton = null;
      if (this.state.showStopRecordButton) {
        stopRecordButton = (
          <button type="button" className="recorder-btn stop-record"
                  aria-label="Stop record" onClick={() => this.stopRecord()}>
            <span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
          </button>
        );
      };

      let nextQuestionButton = null;
      if (this.state.showNextQuestionButton) {
        nextQuestionButton = (
          <button type="button" className="recorder-btn stop-record"
                  aria-label="Next question" >
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </button>
        );
      };

      return (
        <div className={"video-recorder component"} style={divStyle}>

          <div className={"status-bar"}>
            {statusBar()}
          </div>

          <ziggeo is ziggeo-id={id}
                     ziggeo-countdown={0}
                     ziggeo-limit={limit}
                     ziggeo-width={width}
                     ziggeo-height={height}
                     ziggeo-perms={perms}
                     ziggeo-disable_snapshots
                     ziggeo-disable_first_screen >
          </ziggeo>

          <div className={"control-panel"}>
            {startRecordButton}
            {stopRecordButton}
            {nextQuestionButton}
          </div>

        </div>
      );
    },

    componentDidUpdate: function() {
      var countdownStatus = this.state.CountdownStore.status;
      var countdownStatusFinished = this.state.CountdownStore.statusMessages.finished;
      var stopwatchStatus = this.state.StopwatchStore.status;
      var stopwatchStatusFinished = this.state.StopwatchStore.statusMessages.finished;

      if (countdownStatus === countdownStatusFinished && this.state.triggerStartRecord === true) {
        this.startRecord();
        this.setState({triggerStartRecord: false});
      };
      if (stopwatchStatus === stopwatchStatusFinished && this.state.triggerStopRecord === true) {
        this.stopRecord();
        this.setState({triggerStopRecord: false});
      };
      if (this.state.ziggeoApiListenOnSubmitted) {
        ZiggeoApi.Events.on("submitted", function(data) {
          this.getFlux().actions.setRecordedVideoToken(data.video.token);
          this.getFlux().actions.setVideoRecorderStatus(this.state.statusUploaded);
          this.setState({
            showNextQuestionButton: true,
            ziggeoApiListenOnSubmitted: false
          });
        }.bind(this));
      };
      return true;
    }
  });

  ReactDOM.render(
    <VideoRecorder flux={videoRecorderFlux}
                   id={id}
                   countdown={countdown}
                   limit={limit}
                   autorun={autorun}
                   width={width}
                   height={height}
                   perms={perms}/>, document.getElementById(id));
};
