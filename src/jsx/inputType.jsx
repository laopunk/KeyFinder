//JS modules
var React = require('react')
  , Widgets = require('react-widgets')
  , Multiselect = Widgets.Multiselect
 ;



var InputType = React.createClass({

  render: function() {
	return <Multiselect placeholder={"Chose "+this.props.name+"(s)"} value={this.props.values} data={this.props.list} onChange={this.props.onChange}/>
  }
});


module.exports = InputType;
