//JS modules
var React = require('react')
	, _ = require('lodash')
;

//bootstrap specific
var RB = require('react-bootstrap')
	, ButtonToolbar = RB.ButtonToolbar
	, Button = RB.Button
	, Panel = RB.Panel
;

var scaleElements = React.createClass({

	isChordSelected: function(n){
		return _.findIndex(this.props.selectedPlayChords,function(e){return e === n}) > -1
	},

	isNoteSelected: function(n){
		return _.findIndex(this.props.selectedPlayNotes,function(e){return e === n}) > -1
	},

	handleChordSelect: function(e,v){
		//get chordName from target
		chordName = v.split('_')[1]
		//define if chord has to be added or removed from selection
		var list = ( this.isChordSelected(chordName) ) ? _.without(this.props.selectedPlayChords,chordName) : this.props.selectedPlayChords.concat([chordName]);
		//send list to parent
		this.props.onChordSelect(list)
	},

	handleNoteSelect: function(e,v){
		//get noteName from target
		noteName = v.split('_')[1]
		//define if chord has to be added or removed from selection
		var list = ( this.isNoteSelected(noteName) ) ? _.without(this.props.selectedPlayNotes,noteName) : this.props.selectedPlayNotes.concat([noteName]);
		//send list to parent
		this.props.onNoteSelect(list)
	},

	render: function() {

		//not displaying anything if no data received
		if (this.props.selectedScale == "" || this.props.selectedKey == "" || this.props.chords3 == "" || this.props.chords4 == "" || this.props.notesInScale == "") {
			return <div></div>
		}

		t = this

		chords3List = _(this.props.chords3).map(function(e){
			return <Button ref={"button_"+e} key={"button_"+e} bsStyle='primary' bsSize='small' active={t.isChordSelected(e)} onClick={t.handleChordSelect}>{e}</Button>
		})
		.value()
		chords4List = _(this.props.chords4).map(function(e){
			return <Button ref={"button_"+e} key={"button_"+e} bsStyle='primary' bsSize='small' active={t.isChordSelected(e)} onClick={t.handleChordSelect}>{e}</Button>
		})
		.value()

		notesList = _(this.props.notesInScale).map(function(e){
			return <Button ref={"button_"+e} key={"button_"+e} bsStyle='primary' bsSize='small' active={t.isNoteSelected(e)} onClick={t.handleNoteSelect}>{e}</Button>
		})
		.value()

		header = "Chords and Notes - " + this.props.selectedKey + " " + this.props.selectedScale
		return <Panel header={header}>
			<p>
				<label>Chords</label>
				<Panel>
					<label>3 notes</label>
					<ButtonToolbar>{chords3List}</ButtonToolbar>
				</Panel>
				<Panel>
					<label>4 notes</label>
					<ButtonToolbar>{chords4List}</ButtonToolbar>
				</Panel>
			</p>
			<p>
				<label>Notes</label>
				<Panel>
					<ButtonToolbar>{notesList}</ButtonToolbar>
				</Panel>
			</p>
		</Panel>
	}
});


module.exports = scaleElements;
