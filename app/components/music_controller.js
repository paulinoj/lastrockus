import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../css/music_controller.css';

class MusicController extends Component {

  constructor(props) {
    super(props);
    this.state = { pButton: null,
                   playhead: null,
                   timeline: null,
                   timelineWidth: null,
                   duration: 0,
                   clickStarted: false };
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.moveplayhead = this.moveplayhead.bind(this);
    this.timelineClick = this.timelineClick.bind(this);                   
    this.timeUpdate = this.timeUpdate.bind(this);                   
    this.clickPercent = this.clickPercent.bind(this);                   
  }

  componentDidMount() {
    var buttonRef = "button " + this.props.audioID;
    var timelineRef = "timeline " + this.props.audioID;
    var playheadRef = "playhead " + this.props.audioID;

    this.setState({ pButton: this.refs[buttonRef],
                    playhead: this.refs[playheadRef],
                    timeline: this.refs[timelineRef] },
      function() {
        var music = this.props.player; // id for audio element
        var pButton = this.state.pButton;
        var playhead = this.state.playhead;
        var timeline = this.state.timeline;
        var duration = music.duration;

        this.setState({ duration: duration });

        // timeline width adjusted for playhead
        var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        this.setState({ timelineWidth: timelineWidth });

        pButton.onclick = play;

        function play() {
          var playStyles = styles.play + " " + styles.pButton;
          var pauseStyles = styles.pause + " " + styles.pButton;
          // start music
          if (music.paused) {
            music.play();
            // remove play, add pause
            pButton.className = "";
            pButton.className = pauseStyles;
          } else { // pause music
            music.pause();
            // remove pause, add play
            pButton.className = "";
            pButton.className = playStyles;
          }
        }

        // timeupdate event listener
        music.addEventListener("timeupdate", this.timeUpdate, false);

        //Makes timeline clickable
        timeline.addEventListener("click", this.timelineClick, false);

        // Makes playhead draggable 
        playhead.addEventListener('mousedown', this.mouseDown, false);

        // Boolean value so that mouse is moved on mouseUp only when the playhead is released 
        this.setState({ clickStarted: false });

        timeline.addEventListener('mousemove', this.moveplayhead, false);
        timeline.addEventListener('mouseup', this.mouseUp, false);
        timeline.addEventListener('mouseleave', this.mouseLeave, false);    

      }.bind(this));
  }

  timelineClick(e) {
    var music = this.props.player;
    var duration = this.state.duration;
    this.moveplayhead(e);
    music.currentTime = duration * this.clickPercent(e);
  }

  clickPercent(e) {
    var timeline = this.state.timeline;
    var timelineWidth = this.state.timelineWidth;
    return (e.pageX - timeline.offsetLeft) / timelineWidth;
  }

  mouseDown() {
    var music = this.props.player; // id for audio element
    this.setState({ clickStarted: true });
    music.removeEventListener('timeupdate', this.timeUpdate, false);
  }

  // mouseUp EventListener
  // getting input from all mouse clicks
  mouseUp(e) {
    var music = this.props.player; // id for audio element
    var duration = this.state.duration;
    if (this.state.clickStarted) {
      this.setState({ clickStarted: false });
      music.currentTime = duration * this.clickPercent(e);
      music.addEventListener('timeupdate', this.timeUpdate, false);        
    }
  }

  mouseLeave(e) {
    var music = this.props.player; // id for audio element
    var duration = this.state.duration;
    if (this.state.clickStarted) {
      this.setState({ clickStarted: false });
      music.currentTime = duration * this.clickPercent(e);
      music.addEventListener('timeupdate', this.timeUpdate, false);        
    }
  }

  moveplayhead(e) {
    var playhead = this.state.playhead;
    var timeline = this.state.timeline;
    var timelineWidth = this.state.timelineWidth;
    var newMargLeft = e.pageX - timeline.offsetLeft - 10;

    if (this.state.clickStarted) {
      if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
      }
      if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
      }
      if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
      }
    }
  }

  // timeUpdate 
  // Synchronizes playhead position with current point in audio 
  timeUpdate() {
    var music = this.props.player; // id for audio element
    var pButton = this.state.pButton;
    var playhead = this.state.playhead;
    var timelineWidth = this.state.timelineWidth;
    var duration = this.state.duration;
    var playPercent = timelineWidth * (music.currentTime / duration);
    var playStyles = styles.play + " " + styles.pButton;
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
      pButton.className = playStyles;
    }
  }

  componentWillUnmount() {
    var music = this.props.player; // id for audio element
    var pButton = this.state.pButton;
    var playhead = this.state.playhead;
    var timeline = this.state.timeline;
    pButton.onclick = null;
    music.removeEventListener("timeupdate", this.timeUpdate, false);
    timeline.removeEventListener("click", this.timelineClick, false);
    playhead.removeEventListener('mousedown', this.mouseDown, false);
    timeline.removeEventListener('mousemove', this.moveplayhead, false);
    timeline.removeEventListener('mouseup', this.mouseUp, false);
    timeline.removeEventListener('mouseleave', this.mouseLeave, false);    
  }

  render() {
    var playStyles = styles.play + " " + styles.pButton;
    var buttonRef = "button " + this.props.audioID;
    var timelineRef = "timeline " + this.props.audioID;
    var playheadRef = "playhead " + this.props.audioID;

    return (
      <div className={styles.audioplayer}>
        <button className={playStyles} ref={buttonRef} ></button>
        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.playhead} ref={playheadRef}></div>
        </div>
      </div>
    )    
  }

};

export default MusicController;