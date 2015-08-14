//JS modules
var React = require('react')
  , _ = require('lodash')

  //bootstrap specific
  , RB = require('react-bootstrap')
  , Nav = RB.Nav
  , NavItem = RB.NavItem
  , Badge = RB.Badge
  , PanelGroup = RB.PanelGroup
  , Panel = RB.Panel
;


var ScalesList = React.createClass({

	handleSelectKey: function(a){
		this.props.onSelect(a)
	},

	render: function() {
		var obj = this.props.list
		t = this
		keysByScale = _(obj).map(function(v,k){//parsing each scale returned
			//not displaying if the scale has no corresponding key
			if( v.length === 0){
				return null
			}
			li = _(v).map(function(e){//parsing each key returned
				return <NavItem key={k+"_"+e} eventKey={k+"_"+e} title={"Scale: "+k+", key: "+e}>{e}</NavItem>
			})
			.value()

			header = <h6>{k} <Badge>{li.length}</Badge></h6>

			return <Panel key={k} header={header} eventKey={k} expanded={false}>
						<Nav bsStyle="pills" stacked onSelect={t.handleSelectKey}>{li}</Nav>
					</Panel>
		})
		.without(null)
		.value()

		if ( keysByScale == "" ){
			return <div></div>
		}else{
			return <Panel header = "Scale">
					<PanelGroup accordion>
						{keysByScale}
					</PanelGroup>
					</Panel>
		}
	}
});


module.exports = ScalesList;
