import React, { Component } from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Form from './form';
import InvoiceRuleform from './invoicerule/form';

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* <Route exact path="/" component={()=>(<div>RealBooks</div>)} /> */}
        <Route exact path="/local/booking" component={Form} />
        <Route exact path="/local/booking/:ra_reference" component={Form} />
        <Route exact path="/invoicerule/form" component={InvoiceRuleform} />
        <Route exact path="/invoicerule/form/:id" component={InvoiceRuleform} />
      </Router>
    )
  }
}
