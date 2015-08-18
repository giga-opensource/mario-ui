var ErrorNotice = require('../error_notice.js');
var Link = ReactRouter.Link;

var ProjectActionCreators = require('../../actions/project/ActionCreators.js');
var ProjectStore = require('../../stores/ProjectStore.js');

module.exports = React.createClass({

  getInitialState: function(){
    return { errors: [], modalIsOpen: false }
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  componentDidMount: function() {
    ProjectStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProjectStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({modalIsOpen: false});
  },

  onSubmit: function(e){
    e.preventDefault();
    var project = {
      name: this.refs.name.getDOMNode().value,
      description: this.refs.description.getDOMNode().value
    };

    ProjectActionCreators.new(project);
  },

  render: function(){
    return (
      <div className="project-list__create-button-wrapper">
        <button className="project-list__create-button project__button" onClick={this.openModal}>Create New Project</button>
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} >
          <ErrorNotice errors={this.state.errors} />
          <div><h3><i className='fa fa-times' onClick={this.closeModal}></i></h3></div>
          <div>
            <form  onSubmit={this.onSubmit}>
              <input placeholder="Name" type="text" ref='name'/>
              <textarea placeholder="Description" ref='description'/>
              <input value="Create Now" type="submit" />
            </form>
          </div>
        </Modal>
      </div>
    )
  }
});