import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import 'antd/dist/antd.css';
import './form.css'
import { Card,Select, Row, Col, Button, notification } from 'antd';

import HttpService from '../services/HttpService';
const Option = Select.Option;

class InvoiceRuleform extends Component {
    constructor(props){
        super(props);
        this.state={
            dynamicId:"",
            countryList:[],
            partList:[],
            sbuList:[],
            defaultValues:{
              company_id:'',
              party_id : '',
              party_name:'',
              sbu_id : '',
              invoice_date :''
            },
            mode : '',
        }
    }


    componentWillMount(){
        if(this.props.match.params.id){
            this.setState({
              dynamicId:this.props.match.params.id,
              mode : 'edit'
            });
       }
       else{
        this.setState({
          mode : 'new'
        });
       }
    }

    getCompanyName =()=>{
      return new Promise((resolve,reject)=>{
        HttpService.get(`api/service/countrywithid/getall`).then((data)=>{
          this.setState((state,props)=>{
            return({
              countryList : data.data.suppliercountry
            })
          })
          resolve();
        })
        .catch((error)=>{
          notification['warning']({
            message: 'Error',
            description: "Unable to fetch Country list",
          });
          resolve();
        })
      })
    }

    getSbu =()=>{
      return new Promise((resolve,reject)=>{ 
        HttpService.get(`api/sbu/getall`).then((data)=>{
          this.setState((state,props)=>{
            return({
              sbuList : data.data.sbu
            })
          })
          resolve();
        })
        .catch((error)=>{
          notification['warning']({
            message: 'Error',
            description: "Unable to fetch Sbu list",
          });
          resolve();
        })
      })
    }



    handleSearchParty = (value)=>{
      if(value.length>=3){
        HttpService.get(`api/supplier/search?search=${value}`).then((data)=>{
          this.setState((state,props)=>{
            return({
              partList : data.data.supplier
            })
          })
        })
        .catch((error)=>{
          notification['warning']({
            message: 'Error',
            description: "Unable to fetch Supplier list",
          });
          return;
        })
      }
      else{
        return;
      }
    }


    mapParty=(id)=>{
      for(var i=0;i<this.state.partList.length;i++){
        if(this.state.partList[i].supplier_id==id){
          return this.state.partList[i].supplier_display_name;
        }
      }
    }

    handleChangeParty = (value)=>{
      var nm = this.mapParty(value);
      this.setState((state,props)=>{
        return({
          ...state,
          defaultValues:{
            ...state.defaultValues,
            party_id : value,
            party_name:nm
          }
        });
      })   
      console.log(this.state);   
    }

    handleCompanyChange = (value)=>{
      this.setState((state,props)=>{
        return({
          ...state,
          defaultValues:{
            ...state.defaultValues,
            company_id : value
          }
        });
      })  
      console.log(this.state);
    }


    handleSbuChange = (value)=>{
      this.setState((state,props)=>{
        return({
          ...state,
          defaultValues:{
            ...state.defaultValues,
            sbu_id : value
          }
        });
      })
      console.log(this.state);
    }

    handledateChange = (value)=>{
      this.setState((state,props)=>{
        return({
          ...state,
          defaultValues:{
            ...state.defaultValues,
            invoice_date : value
          }
        });
      })
      console.log(this.state);
    }


    getExistingdata = ()=>{
      return new Promise((resolve,reject)=>{
        if(this.state.mode==='edit'){
          HttpService.get(`invoicerule/form?id=${this.state.dynamicId}`).then((data)=>{
            HttpService.get(`api/supplier/search?search=${data.data[0].party_id}`).then((da)=>{
              this.setState((state,props)=>{
                return({
                  ...state,
                  defaultValues:{
                    company_id:data.data[0].company_id,
                    party_id : data.data[0].party_id,
                    party_name:da.data.supplier[0].supplier_display_name,
                    sbu_id : data.data[0].sbu_id,
                    invoice_date :data.data[0].invoice_date
                  }
                })
              })
              resolve();
            })
            .catch((error)=>{
              notification['warning']({
                message: 'Error',
                description: "Invalid Id",
              });
              this.setState((state,props)=>{
                return({
                  dynamicId : '',
                  mode : 'new'
                })
              })
            })
            reject();
            
          })
          .catch((error)=>{
            notification['warning']({
              message: 'Error',
              description: "Invalid Id",
            });
            this.setState((state,props)=>{
              return({
                dynamicId : '',
                mode : 'new'
              })
            })
          })
          reject();
        }
        else{
          resolve()
        }
      })
      
    }


    componentDidMount(){
      var p1 = this.getCompanyName();
      var p2 = this.getSbu();
      Promise.all([p1,p2]).then(data=>{
        this.getExistingdata().then(()=>{
          console.log(this.state);
        }).catch((err)=>{
          return;
        })
      }).catch(error=>{
        notification['warning']({
          message: 'Error',
          description: "Server error",
        });
      })
    }




    savedata = ()=>{
      if(this.state.defaultValues.company_id==='' || this.state.defaultValues.party_id==='' || this.state.defaultValues.sbu_id==='' || this.state.defaultValues.invoice_date===''){
        notification['warning']({
          message: 'Error',
          description: "All the fields are required",
        });
        return;
      }
      else{
        if(this.state.mode==='new'){
          var raw={
            ...this.state.defaultValues
          }
        }
        else{
          var raw = {
            ...this.state.defaultValues,
            id: this.state.dynamicId
          }
        }
        HttpService.post(`invoicerule/form?id=${this.state.dynamicId}`,raw).then((data)=>{
          console.log(data.data.id)
          notification['warning']({
            message: 'Success',
            description: "Data Saved",
          });
          setTimeout(function(){
            window.location.href="/invoicerule/data/form/"+data.data.id
          },300)
        }).catch((error)=>{
          notification['warning']({
            message: 'Error',
            description: "Error saving data",
          });
          return;
        })
      }
    }

  render() {
    return (
      <div style={{ background: '#F5F5F5',height:'100vh',padding:'40px', width:'100%' }}>
      <a className="back-button" href="/"><i class="fas fa-home"></i></a>
        <Card 
            title="INVOICE RULE" 
            bordered={false} 
            style={{ width: '50%',marginLeft:'25%' }}
            headStyle={{background:'#4179ef', color:'#fff'}}
        >
          <div style={{ padding:'20px' }}>
            <Row style={{ paddingBottom:'20px' }} >
              <Col span={8}>
                <p>Company Name : </p>
              </Col>
              <Col span={16}>
                <Select defaultValue={this.state.defaultValues.company_id} value={this.state.defaultValues.company_id} style={{ width:'100%' }} onChange={this.handleCompanyChange }>
                  <Option value="">Select any option..</Option>
                  {
                    (this.state.countryList).map((d,i)=>{
                      return(<Option key={i} value={d.id}>{d.name}</Option>)
                    })
                  }
                </Select>
              </Col>
            </Row>
            <Row style={{ paddingBottom:'20px' }}>
              <Col span={8}>
                <p>Party Name : </p>
              </Col>
              <Col span={16}>
              <Select
                showSearch
                value={this.state.defaultValues.party_name}
                placeholder="search"
                style={{ width:'100%' }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearchParty}
                onChange={this.handleChangeParty}
                notFoundContent={null}
              >
                {
                  this.state.partList.map((d,i) => <Option key={i} value={d.supplier_id}>{d.supplier_display_name}</Option>)
                }
              </Select>
              </Col>
            </Row>
            <Row style={{ paddingBottom:'20px' }}>
              <Col span={8}>
                <p>SBU : </p>
              </Col>
              <Col span={16}>
                <Select defaultValue={this.state.defaultValues.sbu_id} value={this.state.defaultValues.sbu_id} style={{ width:'100%' }} onChange={this.handleSbuChange }>
                  <Option value="">Select any option..</Option>
                  {
                    (this.state.sbuList).map((d,i)=>{
                      return(<Option key={i} value={d.id}>{d.sbu}</Option>)
                    })
                  }
                </Select>
              </Col>
            </Row>
            <Row style={{ paddingBottom:'20px' }}>
              <Col span={8}>
                <p>Invoice Date : </p>
              </Col>
              <Col span={16}>
                <Select defaultValue={this.state.defaultValues.invoice_date} value={this.state.defaultValues.invoice_date} style={{ width:'100%' }} onChange={this.handledateChange }>
                  <Option value="">Select any option..</Option>
                  <Option value="check_in_date">Check In Date</Option>
                  <Option value="check_out_date">Check Out Date</Option>
                  <Option value="invoice_date">Invoice Date</Option>
                  <Option value="manual">Manual</Option>
                </Select>
              </Col>
            </Row>
            <div style={{float :'right'}}>
             <Button type="primary" loading={this.state.loading} onClick={this.savedata}>
                Save
              </Button>
            </div>
          
          </div>
        </Card>
      </div>
    )
  }
}


export default withRouter(InvoiceRuleform);