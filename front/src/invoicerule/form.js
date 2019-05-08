import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

class InvoiceRuleform extends Component {
    constructor(props){
        super(props);
        this.state={
            dynamicId:""
        }
    }


    componentWillMount(){
        if(this.props.match.params.id){
            this.setState({dynamicId:this.props.match.params.id})
        }


    }


  render() {
    return (
      <div>
            Invoice Rule Form
      </div>
    )
  }
}


export default withRouter(InvoiceRuleform);