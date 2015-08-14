//JS modules
var React = require('react')
	, _ = require('lodash')
	, np = require('noteplayer')
	, cp = require('chordplayer')
;

//bootstrap specific
var RB = require('react-bootstrap')
	, ButtonToolbar = RB.ButtonToolbar
	, Button = RB.Button
	, Glyphicon = RB.Glyphicon
	, Input = RB.Input
	, Row = RB.Row
	, Col = RB.Col
	, Glyphicon = RB.Glyphicon
	, DropdownButton = RB.DropdownButton
	, MenuItem = RB.MenuItem
;

//Web audio API
var ac = new AudioContext;

var scalePlayer = React.createClass({
	getInitialState: function() {
		return {
			//array of web audio chords
			  audioChords: []
			//array of web audio notes
			, audioNotes: []
			//audiocontext
			, audioContext: null
			//octaves
			, chordOctave: null
			, notesOctave: null
			//time between each note/chord being played (in seconds)
			, transitionTime: 0.1
			, isPlaying: false
			, continuePlaying: false
		};
	},

	componentWillUpdate: function(){
		//console.log("receiving new props")
		//forcing play to stop as we have new chords or notes added to the list
		//this.handleClickStop()
	},

	handleClickPlay: function(){
		//do not do anything is play is already taking place
		if (this.state.isPlaying){ return null }

		//build the audio environment if it has not been done
		t = this
		t.setState({
			audioContext: (this.state.audioContext == null) ? new (window.AudioContext || window.webkitAudioContext)() : this.state.audioContext
		},
		//callback
			function(){
				oct = (t.state.notesOctave == null) ? _.random(1,6,false) : t.state.notesOctave
				t.setState({
					audioNotes: _(t.props.selectedPlayNotes).map(function(e){
									return np.buildFromName(e+oct,t.state.audioContext)
								})
								.value()
					, audioChords: _(t.props.selectedPlayChords).map(function(e){
									c = cp.buildChordPlayer(e,t.state.audioContext)
									c.setOctave(oct)
									return c
								})
								.value()
					, continuePlaying: true
					, isPlaying: true
				},
				//callback
					function(){
						//play chords randomly
						t.playChords(t.chordToPlayIndex())
						//play notes randomly
						t.playNotes(t.noteToPlayIndex())
					}
				)//end setState
			}
		)//end setState

	},

	playChords: function(index){
		try{
		t2 = this
		if (index > this.state.audioChords.length){
			throw "Index of chord to play is out of range: "+index
		}
		//play if allowed and if there are chords to play
		if( this.state.continuePlaying && this.state.audioChords.length > 0){
			console.log("playing "+t2.state.audioChords[index].name)
			t2.state.audioChords[index].play(function(){
				setTimeout(function(){
					t2.playChords(t2.chordToPlayIndex())
				}, t2.state.transitionTime * 1000)
			})
		}
		}catch(err){
			console.error(err)
		}
	},

	playNotes: function(index){
		//only play notes in an index that exists
		try{
		t2 = this
		if (index > this.state.audioNotes.length){
			throw "Index of note to play is out of range: "+index
		}
		//play if allowed
		if( this.state.continuePlaying && this.state.audioNotes.length > 0){
			console.log("playing "+t2.state.audioNotes[index].name)
			t2.state.audioNotes[index].play(function(){
				setTimeout(function(){
					t2.playNotes(t2.noteToPlayIndex())
				}, t2.state.transitionTime * 1000)
			})
		}
		}catch(err){
			console.error(err)
		}
	},

	handleClickStop: function(){
		this.setState({
			  continuePlaying: false
			, isPlaying: false
		})
	},

	//get a random chord to play
	chordToPlayIndex: function(){ 
		return _.random(0,this.state.audioChords.length - 1,false)
	},

	//get a random note to play
	noteToPlayIndex: function(){ 
		return _.random(0,this.state.audioNotes.length - 1,false)
	},

	handleSelectNotesOctave: function(e){
		//console.log(e)
		this.setState({
			notesOctave: e
		})
	},

	render: function() {

		//not displaying anything if no data received
		if ( this.props.selectedPlayChords.length == 0 && this.props.selectedPlayNotes.length == 0) {
			return <Row><h2><Glyphicon glyph='headphones'/></h2></Row>
		}

		octaveValues = _([1,2,3,4,5,6]).map(function(e){
			return <MenuItem key={"octave_"+e} eventKey={e}>{e}</MenuItem>
		})
		.value()
	
		return <Row>
					<Col xs={1} md={1}>
						<h2><Glyphicon glyph='headphones'/></h2>
					</Col>
					<Col xs={1} md={1}>
						<h2><Button bsStyle='success' onClick={this.handleClickPlay} parentObj={this}><Glyphicon glyph='play'/></Button></h2>
					</Col>
					<Col xs={1} md={1}>
						<h2><Button bsStyle='danger' onClick={this.handleClickStop} parentObj={this}><Glyphicon glyph='stop'/></Button></h2>
					</Col>
					<Col xs={3} md={2}>
					<h2>
						<DropdownButton key={"OctaveSelector"} title='Octave' onSelect={this.handleSelectNotesOctave}>
					    	<MenuItem key={"octave_random"} eventKey='random'><Glyphicon glyph='random' bsStyle='success'/></MenuItem>
				        	{octaveValues}
				        </DropdownButton>
				    </h2>
					</Col>
			</Row>
	}
});


module.exports = scalePlayer;
