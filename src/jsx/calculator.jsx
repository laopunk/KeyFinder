//JSX modules
var InputType  = require('./inputType.jsx')
	, ScalesList = require('./scalesList.jsx')
	, ScaleElements = require('./scaleElements.jsx')
	, ScalePlayer = require('./scalePlayer.jsx')
;

//JS modules
var React = require('react')
  , sc  = require('scalesapi')
  , _ = require('lodash')

  //bootstrap specific
  , RB = require('react-bootstrap')
  , Well = RB.Well
  , Navbar = RB.Navbar
  , TabbedArea = RB.TabbedArea
  , TabPane = RB.TabPane
  , Row = RB.Row
  , Col = RB.Col
  , Nav = RB.Nav
  , NavItem = RB.NavItem
  , Badge = RB.Badge
  , Panel = RB.Panel
;

var Calculator = React.createClass({
	getInitialState: function() {
		return {
			inputType: 'scale',
			inputValues: [],
			selectedScale: "",
			selectedKey: "",
			selectedPlayChords: [],
			selectedPlayNotes: []
		};
	},

	handleSelectTab: function(e){
		this.setState({
			inputType: e,
			inputValues: [],
			selectedScale: "",
			selectedKey: "",
			selectedPlayChords: [],
			selectedPlayNotes: []
		});
	},

	handleUserInputChange: function(e){
		this.setState({
			inputValues: e,
			selectedScale: "",
			selectedKey: ""
		});
		//applying input to selectedPlayChords if in chord mode
		if (this.state.inputType == "chord"){
			this.setState({
				selectedPlayChords: e
			})
		}
		//applying input to selectedPlayNotes if in note mode
		if (this.state.inputType == "note"){
			this.setState({
				selectedPlayNotes: e
			})
		}	
	},

	handleSelectKey: function(e){
		this.setState({
			selectedScale: e.split('_')[0],
			selectedKey: e.split('_')[1]
		});
		//resetting selectedPlayChords to default values if in chord mode
		if (this.state.inputType == "chord"){
			this.setState({
				selectedPlayChords: this.state.inputValues
			})
		}else{
			this.setState({
				selectedPlayChords: []
			})
		}
		//resetting selectedPlayNotes to default values if in notes mode
		if (this.state.inputType == "note"){
			this.setState({
				selectedPlayNotes: this.state.inputValues
			})
		}else{
			this.setState({
				selectedPlayNotes: []
			})
		}
	},

	handleSelectChord: function(e){
		if (this.state.inputType == "chord"){
			this.setState({
				inputValues: e
			})
		}
		this.setState({
			selectedPlayChords: e
		})
				
	},

	handleSelectNote: function(e){
		if (this.state.inputType == "note"){
			this.setState({
				inputValues: e
			})
		}
		this.setState({
			selectedPlayNotes: e
		})
	},

	render: function() {
		//calculate list of keys per scale
		var obj
		//console.log('values : '+this.state.inputValues)
		if(this.state.inputValues.length > 0){
			switch(this.state.inputType){
				case "scale":
					//can't call getScales(), return all Notes for each scales selected instead
					obj = _(this.state.inputValues).map(function(e){
						return [e,sc.getNotes(e)]
					})
					.object()
					.value()
					break;
				case "chord":
					obj = sc.getScales("fromChords",this.state.inputValues)
					break;
				case "note":
					obj = sc.getScales("fromNotes",this.state.inputValues)
					break;
			}
		}

		//prepare list of chords to send to ScaleElements Component
		chords3 = (this.state.selectedScale == "" || this.state.selectedKey == "") ? "" : sc.getChords(this.state.selectedScale,this.state.selectedKey,3)
		chords4 = (this.state.selectedScale == "" || this.state.selectedKey == "") ? "" : sc.getChords(this.state.selectedScale,this.state.selectedKey,4)
		notesInScale = (this.state.selectedScale == "" || this.state.selectedKey == "") ? "" : sc.getNotes(this.state.selectedScale,this.state.selectedKey)

		return <div>
		<Row>
			<Navbar brand='laopunk.com'></Navbar>
		</Row>
		<Panel className="noBorder">
			<Row className="greyBG">
				<Col xs={9} md={6} >
					<h2>Scale and Key Finder</h2>
				</Col>
				<Col xs={9} md={6}>
					<ScalePlayer key='ScalePlayer' selectedPlayChords={this.state.selectedPlayChords} selectedPlayNotes={this.state.selectedPlayNotes}/>
				</Col>
			</Row>
			<Row>.</Row>
			<Row>
				<Col xs={3} md={3}>
					<Panel header = "Source">
						<TabbedArea activeKey={this.state.inputType} justified onSelect={this.handleSelectTab}>

						    <TabPane eventKey={'scale'} tab='by scale'>
								<p> </p>
						    	<InputType key="scale" name="scale" list={sc.getScales("names")} values={this.state.inputValues} onChange={this.handleUserInputChange}/>
						    </TabPane>

						    <TabPane eventKey={'chord'} tab='by chord'>
								<p> </p>
						    	<InputType key="chord" name="chord" list={sc.getChords("*")} values={this.state.inputValues} onChange={this.handleUserInputChange}/>
						    </TabPane>

						    <TabPane eventKey={'note'} tab='by note' >
								<p> </p>
						    	<InputType key="note" name="note" list={sc.getNotes("*")} values={this.state.inputValues} onChange={this.handleUserInputChange}/>
						    </TabPane>

						</TabbedArea>
					</Panel>
				</Col>
				<Col xs={3} md={3}>
					<ScalesList key='ScalesList' list={obj} onSelect={this.handleSelectKey}/>
				</Col>
				<Col xs={6} md={5}>
					<ScaleElements key='ScaleElements' selectedScale={this.state.selectedScale} selectedKey={this.state.selectedKey} selectedPlayChords={this.state.selectedPlayChords} selectedPlayNotes={this.state.selectedPlayNotes} chords3={chords3} chords4={chords4} notesInScale={notesInScale} onChordSelect={this.handleSelectChord} onNoteSelect={this.handleSelectNote}/>
				</Col>
			</Row>
		</Panel>
		</div>
	}
});


module.exports = Calculator;
