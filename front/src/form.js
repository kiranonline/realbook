import React, { Component } from 'react'
import axios from 'axios';
import 'antd/dist/antd.css';
import './App.css';
import { Select,DatePicker, message,notification, AutoComplete, Modal, Input, InputNumber } from 'antd';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import HttpService from './services/HttpService';

const Option = Select.Option;



class Form extends Component {

    constructor(props){
        super(props);
        this.state={
            name:"",
            modalVisible:false,
            suppliers:[],
            activeInitial:{},
            countries:[],
            isEdit:false,
            hasErr:false,
            currencies:[],
            RA_REFERENCE:"",
            agents:[],
            activeRowIndex:-1,
            formData:{OVER_ALL_DISCOUNT:0,TOTAL_TAX_CALCULATION:0,OVER_ALL_LOSS:0,OVER_ALL_PROFIT:0},
            dynamic:[],
            totalTax:0,
            totalDiscount:0,
            totalCost:0,
            dynamic_formData:{
                SERVICE_CATEGORY:"",
                PRODUCT_NAME:"",
                PER_SERVICE_WISE_SUPPLIER_NAME:"",
                COMPONENTS_WISE_SELLING_COST:"",
                PER_SERVICE_SUPPLIER_CODE:"",
                SERVICE_COUNTRY:""
            }

        }
    }

    getAgentCode(formData,value){
        // /api/customer/search?search=
         if(value.length>=3){
            HttpService.get("api/customer/search?search="+value).then(res=>{
                if(res.status===200){
                    console.log(res.data)
                    let data=[]
                res.data.customer.map((item,indx)=>{
                    
                        data.push(item.customer_name+","+item.client_ref_no)

                })
                if(value!==undefined){
                    // dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=value.split(",")[0]
                    formData['RA_AGENT_CODE']=value.split(",")[1]
     
             }
             else{
                 formData['RA_AGENT_CODE']=null;
                //  dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']="";
             }
                this.setState({agents:data,formData})
                }
            })
        }
        else{
            formData['RA_AGENT_CODE']=null;
            // dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']="";
            this.setState({formData})

        }
    }

    openModal(indx){
        // console.log(this.props.match.params.ra_reference)
        if(this.props.match.params.ra_reference!==undefined){
            this.setState({activeRowIndex:indx,activeInitial:this.state.dynamic[indx]})
        }
        else{
            if(this.state.dynamic[indx]!==undefined){
            this.setState({activeRowIndex:indx,activeInitial:this.state.dynamic[indx]})
                
            }
            else{
                let activeObj={SERVICE_CITY:null,TAX_CALCULATION:null,FOREIGN_CURRENCY:null,COMPONENTS_WISE_MARKUP:null,
                    COMPONENTS_WISE_DISCOUNT_COMISSION:null,COMPONENTS_WISE_NET_COST_CURRENCY:null,COMPONENTS_WISE_NET_COST:null,RA_FILE_HANDLER:null,PAYMENT_SLABS:null,
                SUPPLIER_PAYMENT_DEADLINE:null,COMPONENTS_WISE_CURRENCY:null,ARRIVALDATE:null};
                this.setState({activeRowIndex:indx,activeInitial:activeObj})
                console.log(activeObj)
            }

        }
        this.setState({modalVisible:true})
    }
    componentWillMount(){
        // this.getSupplier()
        this.getCountries()
        this.getCurrency()
        document.title="BOOKING FORM | REAL BOOKS"
        // edit mode setup
        if(this.props.match.params.ra_reference!==undefined){
            this.getActiveBooking(this.props.match.params.ra_reference)
        }
         // dynamic form_setup
        let {dynamic,dynamic_formData}=this.state;
        dynamic.push(Object.assign({},dynamic_formData));
        
        this.setState({dynamic});
    }

    getActiveBooking(id){
        
        HttpService.get('bookingmaster/local/'+id).then(res=>{
            if(res.data.success){
               
                this.setState({isEdit:true,formData:res.data.data,dynamic:res.data.data.dynamic,RA_REFERENCE:res.data.RA_REFERENCE,totalCost:res.data.data.SELLINGCOST,totalDiscount:res.data.data.OVER_ALL_DISCOUNT,totalTax:res.data.data.TOTAL_TAX_CALCULATION,
                activeInitial: res.data.data.dynamic[ res.data.data.dynamic.length-1]
                })
            }
            
            // console.log(this.state)
        })
    }

    //  getSupplier(){
        
    //     HttpService.get('api/supplier/getall').then(res=>{
    //         if(res.status===200){
    //             let data=[]
    //             res.data.supplier.map((item,indx)=>{
    //                 // if(indx<20){
    //                     data.push(item.supplier_display_name+" , "+item.supplier_id)

    //                 // }
    //             })
    //             this.setState({suppliers:data})
    //         }
    //     })
    // }

    getCountries(){
        
        HttpService.get('api/service/country/getall').then(res=>{
            if(res.status===200){
                this.setState({countries:res.data.suppliercountry})
            }
        })
    }

    getCurrency(){
        
        HttpService.get('api/currency/getall').then(res=>{
            if(res.status===200){
                this.setState({currencies:res.data.currency})
            }
        })
    }

    setSupplierName(dynamic,value,indx){
        // value=value.target.value;
        console.log(value.split("~"))
        if(value!==undefined){
            if(value.split("~").length===2){
                dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=value.split("~")[0]
               dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']=value.split("~")[1].trim()
            }
            else{
                dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=value.split("~")[0]+value.split("~")[value.split("~").length-2]
                dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']=value.split("~")[value.split("~").length].trim()
            }
               

        }
        else{
            dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=undefined;
            dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']="";
        }

        console.log(dynamic[indx])
       this.setState({dynamic});
    }

    cloneField(dynamic){
        let {dynamic_formData}=this.state;
        // console.log('cloning>>>>>')

        dynamic.push(Object.assign({},dynamic_formData,{ismanual:1}))

        this.setState({dynamic});
    }

    
    deleteRow(dynamic,indx){
        // console.log(dynamic)
        // console.log('deleting>>>>> '+indx)

        dynamic.splice(indx,1);
        // console.log('deleted')
        // console.log(dynamic)
        let cost=0;
        dynamic.map(item=>{
            cost=cost+parseFloat(item.COMPONENTS_WISE_SELLING_COST);
        })

        this.setState({dynamic,totalCost:cost,formData:Object.assign({},this.state.formData,{SELLINGCOST:cost})});
    }

    setSellingCost(indx,dynamic,formData){
        // let {formData}=this.state;
     
            let cost=0;
            console.log(formData);
            dynamic.map(item=>{
                console.log(formData.EXCHANGE_RATE);
                cost=cost+parseFloat(parseInt(item.COMPONENTS_WISE_SELLING_COST));
            })
            // console.log("Cost",cost)
            this.setState({formData:Object.assign({},formData,{SELLINGCOST:cost}),totalCost:cost});
       

    }

    setTotalDiscount(indx,dynamic,formData,activeInitial){
                dynamic[indx]=Object.assign({},dynamic[indx],activeInitial);
                let discount=0;
                dynamic.map(item=>{
                    discount=discount+parseInt(item.COMPONENTS_WISE_DISCOUNT_COMISSION);
                })
        
                this.setState({formData:Object.assign({},formData,{OVER_ALL_DISCOUNT:discount}),totalDiscount:discount});
        
    }

    setTotalTax(indx,dynamic,formData,activeInitial){
        dynamic[indx]=Object.assign({},dynamic[indx],activeInitial);
        let tax=0;
        dynamic.map(item=>{
            tax=tax+parseInt(item.TAX_CALCULATION);
        })

        this.setState({formData:Object.assign({},formData,{TOTAL_TAX_CALCULATION:tax}),totalTax:tax});
}

    submitData=(formData,dynamic)=>new Promise(resolve=>{
      
        
        if(this.state.RA_REFERENCE.length===0){

            notification['warning']({
                message: 'Required field missing',
                description: "RA Reference can't be empty.",
              });
            resolve(false);
        }
        else if(formData.RA_AGENT_CODE===undefined || formData.RA_AGENT_CODE.length===0){
            notification['warning']({
                message: 'Required field missing',
                description: "RA AGENT CODE can't be empty!",
              });

            resolve(false);
        }
        else if(formData.STAND_ALONE===null){
            notification['warning']({
                message: 'Required field missing',
                description: "Please select a STAND ALONE state",
              });

            resolve(false);
        }
        else if(dynamic!==undefined && formData.STAND_ALONE==="NO"){
            if(dynamic.length===1){
                // if(){
                    notification['warning']({
                        message: 'Multiple field missing',
                        description: "Please add another row.",
                      });
        
                    resolve(false);
                    // }
            }
            else{
                resolve(true);
            }
        }
        else if(formData.INVOICE_CURRENCY===undefined || formData.INVOICE_CURRENCY.length===0){
            notification['warning']({
                message: 'Required field missing',
                description: "Please select an Invoice Currency",
              });

            resolve(false);
        }
        else if(formData.INVOICE_DATE===undefined || formData.INVOICE_DATE===null){
            notification['warning']({
                message: 'Required field missing',
                description: "Please select an Invoice Date",
              });

            resolve(false);
        }
        else if(formData.EXCHANGE_RATE===undefined || parseInt(formData.EXCHANGE_RATE)<0){
            console.log(formData.EXCHANGE_RATE)
            notification['warning']({
                message: 'Required field missing',
                description: "Exchange rate can't be empty",
              });

            resolve(false);
        }
        else if(formData.CHECK_IN_DATE===undefined){
            notification['warning']({
                message: 'Required field missing',
                description: "Please set a check in date",
              });
            resolve(false);
        } 
        else if(formData.CHECK_OUT_DATE===undefined){
            notification['warning']({
                message: 'Required field missing',
                description: "Please set a check out date",
              });
            resolve(false);
        } 
        
        else if(parseFloat(formData.SELLINGCOST)!==parseFloat(this.state.totalCost.toString())){
            console.log(formData.SELLINGCOST,this.state.totalCost)
            notification['warning']({
                message: 'Required field missing',
                description: "Invalid selling cost",
              });

            resolve(false);
        }
        else if(parseInt(formData.TOTAL_IN_AMOUNTS)<formData.SELLINGCOST){
            notification['warning']({
                message: 'Required field missing',
                description: "Invalid Total in amount",
              });

            resolve(false); 
        }
        else if(parseInt(formData.OVER_ALL_DISCOUNT)!==parseInt(this.state.totalDiscount!==null?this.state.totalDiscount.toString():0)){
            notification['warning']({
                message: 'Required field missing',
                description: "Invalid overall discount",
              });
              
            resolve(false);
        }
        
        else if(formData.SBU===undefined){
            notification['warning']({
                message: 'Required field missing',
                description: "SBU can't be empty",
              });

            resolve(false);
        }
        else if(parseInt(formData.TOTAL_TAX_CALCULATION)!==parseInt(this.state.totalTax!==null?this.state.totalTax.toString():0)){
            console.log(this.state.totalTax)
            notification['warning']({
                message: 'Required field missing',
                description: "Invalid tax calculation",
              });

            resolve(false);
        }
        else if(parseInt(formData.TOTAL_IN_AMOUNTS)===0 || formData.TOTAL_IN_AMOUNTS===undefined || formData.TOTAL_IN_AMOUNTS===null){
            notification['warning']({
                message: 'Required field missing',
                description: "Total In Amount can't be empty",
              });

            resolve(false);
        }
        else{
            dynamic.map((item,idx)=>{
                // console.log(item)

                if(item.SERVICE_COUNTRY.length===0){
                    notification['warning']({
                        message: 'Required field missing',
                        description: "Please select a service country!",
                      });
        
                    resolve(false);
                }
                else if(item.PER_SERVICE_WISE_SUPPLIER_NAME.length===0){
                    console.log(item.PER_SERVICE_WISE_SUPPLIER_NAME)
                    notification['warning']({
                        message: 'Required field missing',
                        description: "Please select a Supplier!",
                      });
        
                    resolve(false);
                }
                else if(item.SERVICE_CATEGORY.length===0){
                    message.warning("Please select a service category!",0.9);
                    resolve(false);
                }
                else if(item.PRODUCT_NAME.length===0){
                    notification['warning']({
                        message: 'Required field missing',
                        description: "PRODUCT NAME can't be empty",
                      });
        
        
                    resolve(false);
                }
                else if(item.COMPONENTS_WISE_SELLING_COST.length===0){
                    notification['warning']({
                        message: 'Required field missing',
                        description: "Component wise selling cost can't be empty",
                      });
        
                    resolve(false);
                }
                else if(item.COMPONENTS_WISE_NET_COST===undefined){
                    notification['warning']({
                        message: 'Required field missing',
                        description: "Component wise net cost can't be empty",
                      });
        
                    resolve(false);
                }
                
                else if(item.COMPONENTS_WISE_NET_COST_CURRENCY===undefined || item.COMPONENTS_WISE_NET_COST_CURRENCY===null ||  item.COMPONENTS_WISE_NET_COST_CURRENCY===0){
                    console.log("item",item.COMPONENTS_WISE_NET_COST_CURRENCY,"state",this.state.activeInitial.COMPONENTS_WISE_NET_COST_CURRENCY)
                    notification['warning']({
                        message: 'Required field missing',
                        description: "Component wise net cost currency can't be empty",
                      });
                        this.setState({hasErr:true})

                    resolve(false);
                }
                else{
                    if(!this.state.hasErr && idx===dynamic.length-1){
                      resolve(true);
                    }
                }

            })
        }
        
    })


    SaveData(formData,dynamic){
        this.submitData(formData,dynamic).then(valid=>{
            console.log(valid)
            if(valid===true ){
            

                formData.dynamic=[...dynamic];
                formData.dynamic.map((item,indx)=>{
                    formData.dynamic[indx]['ismanual']=1;
                })
                formData.RA_REFERENCE=this.state.RA_REFERENCE;
                if(formData.msg!==undefined){
                    delete formData.msg;
                }
                if(formData.success!==undefined){
                    delete formData.success;
                }
    
                formData.RA_AGENT_CODE.trim();
                formData.isEdit=this.state.isEdit;
                formData.TOTALCOST=formData.SELLINGCOST;
    
                message.loading("Saving data....",1.5)
                HttpService.post("bookingmaster/local/"+this.state.RA_REFERENCE,{data:formData}).then(res=>{
                    if(res.status===200){
                        if(res.data.success){
                          
                            notification['success']({
                                message: 'Booking form data is submitted',
                                description: "Data saved succesfully",
                              });
    
                              var self=this;
                              setTimeout(function(){
                                window.location.href="/local/booking/"+self.state.RA_REFERENCE
    
                              },1000)
                        }
                        else{
                            notification['error']({
                                message: 'BookingMaster Error',
                                description:res.data.msg,
                              });
                        }
                    }
                })
               
            }
        }).catch(err=>{
            console.log(err)
        })
        
        

      
    }

    setOutDate(formData,dateString){
        if(formData.CHECK_IN_DATE){
            if(dateString>=formData.CHECK_IN_DATE){
                this.setState({formData:Object.assign({},formData,{CHECK_OUT_DATE:dateString}),hasErr:false})
            }
            else{
                notification['error']({
                    message: 'Invalid Date',
                    description: "Invalid date selected!",
                  });
                this.setState({hasErr:true})
            }
            
        }
        else{
            notification['warning']({
                message: 'Required Field missing',
                description: "Please enter check in date before proceeding",
              });
              this.setState({hasErr:true})
        }

    }

    setInDate(formData,dateString){
        if(formData.CHECK_OUT_DATE){
            if(dateString<=formData.CHECK_OUT_DATE){
                this.setState({formData:Object.assign({},formData,{CHECK_IN_DATE:dateString}),hasErr:false})
            }
            else{
                notification['error']({
                    message: 'Invalid Date',
                    description: "Invalid date selected!",
                  });
                this.setState({hasErr:true})
            }
            
        }
        else{
            formData.CHECK_IN_DATE=dateString;
            delete formData.CHECK_OUT_DATE;
           this.setState({formData})
        }

    }

    setModalValues(name,value){
        this.setState({activeInitial:Object.assign({},this.state.activeInitial,{[name]:value})});
    }


    saveRow(activeRowData){
        let {dynamic}=this.state;
        activeRowData.COMPONENTS_WISE_SELLING_COST=activeRowData.COMPONENTS_WISE_NET_COST*this.state.formData.EXCHANGE_RATE;
        dynamic[this.state.activeRowIndex]=Object.assign({},dynamic[this.state.activeRowIndex],activeRowData);
        // console.log( dynamic)
        this.setState({dynamic,activeInitial:{},activeRowIndex:-1,modalVisible:false});
        this.setSellingCost(activeRowData,dynamic,this.state.formData);
    }

    clearList(){
        let {dynamic,formData}=this.state;
        console.log(formData.STAND_ALONE)
        if(formData.STAND_ALONE==="YES"){
            if(dynamic.length>1){
                dynamic.map((item,indx)=>{
                    if(indx===0){
                        dynamic.pop();
                    }
                    
                })
            }
        }
        
    }

    searchSupplier(value,indx,dynamic){
        // console.log(value)
        if(value.length>=3){
            HttpService.get("api/supplier/search?search="+value).then(res=>{
                if(res.status===200){
                    let data=[]
                res.data.supplier.map((item,indx)=>{
                    // if(indx<20){
                        data.push(item.supplier_display_name+"~"+item.supplier_id)

                    // }
                })
                if(value!==undefined){
                    dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=value.split("~")[0]
                    dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']=value.split("~")[1]
     
             }
             else{
                 dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=undefined;
                 dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']="";
             }
                this.setState({suppliers:data,dynamic})
                }
            })
        }
        else{
            dynamic[indx]['PER_SERVICE_WISE_SUPPLIER_NAME']=undefined;
            dynamic[indx]['PER_SERVICE_SUPPLIER_CODE']="";
            this.setState({dynamic})

        }
    }

  render() {
      const {formData,dynamic,activeInitial}=this.state;
    console.log(activeInitial)
    return [
        <header>
        <div className="container-fluid">
            <div className="col-auto m-auto">
                <h3>Booking Entry</h3>
            </div>
        </div>
    </header>,
    <main>
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">RA Reference *</label>
                        <input readOnly={this.state.isEdit} disabled={this.state.isEdit} type="text" className="form-control" defaultValue={this.state.RA_REFERENCE} onChange={(e)=>this.setState({RA_REFERENCE:e.target.value})} id="" placeholder="" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">RA Agent Code *</label><br/>
                        {   formData.RA_AGENT_CODE!==null?
                        <AutoComplete
                        style={{ width: 380,left:'-0.5em' }}
                        dataSource={this.state.agents}
                        value={this.state.formData.RA_AGENT_CODE}
                        onSelect={(value)=>{this.setState({formData:Object.assign({},formData,{RA_AGENT_CODE:value.split(",")[1].trim()})})}}
                        onChange={(value)=>this.getAgentCode(formData,value)}
                        className="form-control"
                        filterOption={(inputValue, option) => option.props.children.split(",")[0].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.props.children.split(",")[1].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />:
                        <AutoComplete
                        style={{ width: 380,left:'-0.5em' }}
                        dataSource={this.state.agents}
                        defaultValue={this.state.formData.RA_AGENT_CODE}
                        onSelect={(value)=>{this.setState({formData:Object.assign({},formData,{RA_AGENT_CODE:value.split(",")[1].trim()})})}}
                        onChange={(value)=>this.getAgentCode(formData,value)}
                        className="form-control"
                        filterOption={(inputValue, option) => option.props.children.split(",")[0].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.props.children.split(",")[1].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                        
                        }
                        {/* <input type="text" className="form-control" defaultValue={formData.RA_AGENT_CODE} onChange={(e)=>{formData.RA_AGENT_CODE=e.target.value;this.getAgentCode(e.target.value)}} id="" placeholder="" /> */}
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Invoice Number</label>
                        <input type="text" className="form-control" defaultValue={formData.INVOICE_NUMBER} onChange={(e)=>{formData.INVOICE_NUMBER=e.target.value;}} id="" placeholder="" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">First Name</label>
                        <input type="text" className="form-control" defaultValue={formData.FIRSTNAME} onChange={(e)=>{formData.FIRSTNAME=e.target.value;}} id="" placeholder="" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Invoice Currency *</label>
                        <div className="input-group mb-3">
                        <select className="form-control ng-pristine ng-valid ng-touched" onChange={(e)=>{formData.INVOICE_CURRENCY=e.target.value;}} defaultValue="">
                                <option value="">{this.props.match.params.ra_reference?formData.INVOICE_CURRENCY:"Select Currency..."}</option>
                                {
                                    this.state.currencies!==undefined?
                                    this.state.currencies.map(currency=>{
                                        return <option value={currency}>{currency}</option>
                                    }):null
                                }

                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Invoice Date *</label>
                        <div className="input-group mb-3">
                            <DatePicker style={{width:'30em'}} value={formData.INVOICE_DATE?moment(formData.INVOICE_DATE, 'YYYY-MM-DD'):""} format="YYYY-MM-DD" onChange={(date,dateString)=>{this.setState({formData:Object.assign({},formData,{INVOICE_DATE:dateString})})}} placeholder="yyyy-mm-dd" />
                            {/* <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2"><i className="ion ion-md-calendar"></i></span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Exchange Rate *</label>
                        <input type="number" className="form-control" min="0" defaultValue={formData.EXCHANGE_RATE} onChange={(e)=>{formData.EXCHANGE_RATE=e.target.value}} id="" placeholder="" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Payment Deadline</label>
                        <div className="input-group mb-3">
                            <DatePicker style={{width:'30em'}} value={formData.PAYMENT_DEADLINE?moment(formData.PAYMENT_DEADLINE, 'YYYY-MM-DD'):""}  onChange={(date,dateString)=>{this.setState({formData:Object.assign({},formData,{PAYMENT_DEADLINE:dateString})})}} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Stand Alone *</label>
                        <select className="form-control" value={formData.STAND_ALONE} onChange={(e)=>{formData.STAND_ALONE=e.target.value;this.setState({formData});this.clearList()}} >
                            <option value="">Choose one</option>
                            {[{val:'YES',name:'YES'},{val:'NO',name:'NO'}].map(itm=>{
                                return <option value={itm.val}>{itm.name}</option>
                            })}
                        </select>
                       
                    </div>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">SBU *</label>
                        <select  className="form-control" value={formData.SBU} onChange={(e)=>{formData.SBU=e.target.value;this.setState({formData})}}>
                            <option value="">Choose one</option>
                            {['FIT','GROUP'].map(itm=>{
                                return <option val={itm}>{itm}</option>
                            })}
                        </select>

                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Lead Passanger</label>
                        <input type="text" className="form-control" defaultValue={formData.LEAD_PASSENGER} onChange={(e)=>{formData.LEAD_PASSENGER=e.target.value}} id="" placeholder="" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Checkin Date *</label>
                        <div className="input-group mb-3">
                            <DatePicker style={{width:'30em'}} value={formData.CHECK_IN_DATE?moment(formData.CHECK_IN_DATE, 'YYYY-MM-DD'):""} format="YYYY-MM-DD" onChange={(date,dateString)=>{this.setInDate(formData,dateString)}} placeholder="yyyy-mm-dd" />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="">Checkout Date *</label>
                        <div className="input-group mb-3">
                            <DatePicker style={{width:'30em'}} value={formData.CHECK_OUT_DATE?moment(formData.CHECK_OUT_DATE, 'YYYY-MM-DD'):""} format="YYYY-MM-DD" onChange={(date,dateString)=>{this.setOutDate(formData,dateString)}} placeholder="yyyy-mm-dd" />
                           
                        </div>
                    </div>
                </div>

            </div>
            {dynamic.map((item,indx)=>{
               return <div className="row align-items-end"  key={indx}>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="">Service Category *</label>
                            <select className="form-control ng-pristine ng-valid ng-touched" 
                            value={item.SERVICE_CATEGORY}
                            onChange={(e)=>{dynamic[indx]['SERVICE_CATEGORY']=e.target.value;this.setState({dynamic})}}>
                                <option value="">{this.props.match.params.ra_reference?item.SERVICE_CATEGORY:"Select a category"}</option>
                                <option value="Tour">Tour</option>
                                <option value="Hotel">Hotel</option>
                            </select>
                          
                       
                      
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="">Product Name *</label>
                        <input type="text" className="form-control mb-4" id="" value={item.PRODUCT_NAME} onChange={(e)=>{dynamic[indx]['PRODUCT_NAME']=e.target.value;this.setState({dynamic})}} placeholder="" />
                       
                        
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="" >Per Service Supplier Name *</label>
                        {   item.PER_SERVICE_WISE_SUPPLIER_NAME!==undefined?
                            item.PER_SERVICE_WISE_SUPPLIER_NAME.length>0?
                        <AutoComplete
                        style={{ width: 200,left:'-0.5em' }}
                        dataSource={this.state.suppliers}
                        value={item.PER_SERVICE_WISE_SUPPLIER_NAME}
                        onSelect={(value)=>{this.setSupplierName(dynamic,value,indx)}}
                                                onChange={(value)=>this.searchSupplier(value,indx,dynamic)}

                        filterOption={(inputValue, option) => option.props.children.split("~")[0].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 || option.props.children.split("~")[1].toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />:
                        <AutoComplete
                        style={{ width: 200,left:'-0.5em' }}
                        dataSource={this.state.suppliers}
                        defaultValue={item.PER_SERVICE_WISE_SUPPLIER_NAME}
                        onSelect={(value)=>{this.setSupplierName(dynamic,value,indx)}}
 
                        onChange={(value)=>this.searchSupplier(value,indx,dynamic)}
                        />:
                        <AutoComplete
                        style={{ width: 200,left:'-0.5em' }}
                        dataSource={this.state.suppliers}
                        defaultValue={item.PER_SERVICE_WISE_SUPPLIER_NAME}
                        onSelect={(value)=>{this.setSupplierName(dynamic,value,indx)}}
                        onChange={(value)=>this.searchSupplier(value,indx,dynamic)}
                       
                        />
                        }
                                            </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label htmlFor="">Components Wise Cost(Invoice currency) *</label>
                        
                        <input type="number" className="form-control mb-4" value={item.COMPONENTS_WISE_SELLING_COST} onChange={(e)=>{dynamic[indx]['COMPONENTS_WISE_SELLING_COST']=e.target.value;}} id="" placeholder="" />
                        
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-group">
                        <label htmlFor="">Service Country *</label>
                        
                        {<div className="input-group mb-3">
                            <select className="form-control ng-pristine ng-valid ng-touched" onChange={(e)=>{dynamic[indx].SERVICE_COUNTRY=e.target.value;this.setState({dynamic})}} value={item.SERVICE_COUNTRY}>
                                <option value="">{this.props.match.params.ra_reference?item.SERVICE_COUNTRY:"Select Country..."}</option>
                                {this.state.countries!==undefined?this.state.countries.map((contryName)=>{
                                    return <option value={contryName}>{contryName}</option>
                                }):null}
                            </select>
                            </div>}
                        
                        
                    </div>
                </div>
                {indx===dynamic.length-1?<div className="col-auto align-self-center mt-4" >
                    <div className="form-action-group d-flex align-items-center justify-content-between mb-3">
                        <button style={{display:'block'}} type="button" className="btn btn-light mr-2" onClick={()=>{this.openModal(indx)}} data-toggle="modal" data-target="#exampleModalCenter"><i
                                className="ion ion-ios-more text-dark"></i></button>
                        <button type="button" style={formData.STAND_ALONE==="YES"?{display:'none'}:null} className="btn btn-light mr-2" onClick={()=>{ this.setState({activeInitial:{}});this.cloneField(dynamic)}}><i
                                className="ion ion-md-add text-primary"></i></button>
                        {indx>0?<button type="button" className="btn btn-light" onClick={()=>{this.deleteRow(dynamic,indx)}}><i
                                className="ion ion-ios-trash text-danger"></i></button>:null}
                    </div>
                    
                    
                </div>:<div className="col-auto align-self-center mt-5" >
                    <div className="form-action-group d-flex align-items-center justify-content-between mb-4">
                        <button type="button" className="btn btn-light mr-2" data-toggle="modal" onClick={()=>{this.openModal(indx)}} data-target="#exampleModalCenter"><i
                                className="ion ion-ios-more text-dark"></i></button>
                        <button type="button" className="btn btn-light" onClick={()=>{this.deleteRow(dynamic,indx)}}><i
                                className="ion ion-ios-trash text-danger"></i></button>
                    </div>
                </div>
                         }
                
            </div>
            })}
            
            <div className="row">
                <div className="col-10">
                <div className="form-group row">
                        <label htmlFor="" className="ml-auto col-auto col-form-label">Total Cost</label>
                        <div className="col-2">
                            <input type="number" readOnly  min="0" defaultValue={formData.SELLINGCOST} onChange={(e)=>{formData.SELLINGCOST=e.target.value;formData.OVER_ALL_PROFIT=formData.TOTAL_IN_AMOUNTS-formData.SELLINGCOST;this.setState({formData})}} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="ml-auto col-auto col-form-label">Total In Amounts</label>
                        <div className="col-2">
                            <input type="number" defaultValue={formData.TOTAL_IN_AMOUNTS} onChange={(e)=>{formData.TOTAL_IN_AMOUNTS=e.target.value;formData.OVER_ALL_PROFIT=formData.TOTAL_IN_AMOUNTS-formData.SELLINGCOST;this.setState({formData})}}  className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="ml-auto col-auto col-form-label">Over All Discounts</label>
                        <div className="col-2">
                            <input type="number" min="0" defaultValue={formData.OVER_ALL_DISCOUNT} onChange={(e)=>{formData.OVER_ALL_DISCOUNT=e.target.value;}} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="ml-auto col-auto col-form-label">Total Tax Calculation</label>
                        <div className="col-2">
                            <input type="number" defaultValue={formData.TOTAL_TAX_CALCULATION} onChange={(e)=>{formData.TOTAL_TAX_CALCULATION=e.target.value;}} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="ml-auto col-auto col-form-label">Over All Profit</label>
                        <div className="col-2">
                            <input type="number" min="0"  value={parseInt(formData.OVER_ALL_LOSS)===0 || formData.OVER_ALL_LOSS===null?formData.OVER_ALL_PROFIT:console.log('yeah')} onChange={(e)=>{this.setState({formData:Object.assign({},formData,{OVER_ALL_PROFIT:e.target.value})})}}  className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="" className="ml-auto col-auto col-form-label" >Over All Loss</label>
                        <div className="col-2">
                            <input type="number" min="0" defaultValue={formData.OVER_ALL_PROFIT===0?formData.OVER_ALL_LOSS:0} onChange={(e)=>{formData.OVER_ALL_LOSS=e.target.value;}} className="form-control"  />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', height: '150px'}}></div>
            <div className="row align-items-end">
                <div className="col-6">
                    <div className="form-group mb-0">
                        <label htmlFor="exampleFormControlTextarea1">Booking Note</label>
                        <textarea className="form-control" value={formData.BOOKING_NOTES} onChange={(e)=>{formData.BOOKING_NOTES=e.target.value}} id="exampleFormControlTextarea1" rows="5"
                            style={{resize: 'none'}}></textarea>
                    </div>
                </div>
                
                <div className="col-1 text-right">
                    <button type="submit" className="btn btn-primary w-100"  onClick={()=>{this.SaveData(formData,dynamic)}}>Save</button>
                </div>
            </div>
        </div>

        {/* <!-- Modal --> */}
  
            <Modal
             visible={this.state.modalVisible} 
             width={900} footer={[]}
              onCancel={()=>this.setState({modalVisible:false,activeRowIndex:-1,activeInitial:{}})}
              >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    
                    <div className="modal-body">

                            <div className="tab-pane fade show active" id="supplier" role="tabpanel" aria-labelledby="supplier-tab">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Service City</label>
                                                <Input type="text" value={this.state.activeInitial.SERVICE_CITY} onChange={(e)=>{this.setModalValues('SERVICE_CITY',e.target.value);}} className="form-control" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Tax Calculation</label>
                                                <Input type="number" value={activeInitial.TAX_CALCULATION} onChange={(e)=>{activeInitial.TAX_CALCULATION=e.target.value;this.setTotalTax(this.state.activeRowIndex,dynamic,formData,activeInitial)}} className="form-control" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        {/* <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Foreign Currency</label>
                                                <Select className="form-control ng-pristine ng-valid ng-touched" 
                                                    value={activeInitial.FOREIGN_CURRENCY} onChange={(e)=>{this.setState({activeInitial:Object.assign({},activeInitial,{FOREIGN_CURRENCY:e})})}}
                                                >
                                                   
                                                    {
                                                        this.state.currencies.map(item=>{
                                                            return <Option value={item}>{item}</Option>
                                                        })
                                                    }

                                                </Select>
                                            </div>
                                        </div> */}
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">City</label>
                                                <Input type="text" className="form-control"
                                                    value={activeInitial.SERVICE_CITY} onChange={(e)=>{activeInitial.SERVICE_CITY=e.target.value}}
                                                 id="" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Components Wise Markup</label>
                                                <Input type="number" min="0" className="form-control" value={activeInitial.COMPONENTS_WISE_MARKUP} onChange={(e)=>{this.setState({activeInitial:Object.assign({},activeInitial,{COMPONENTS_WISE_MARKUP:e.target.value})})}} id="" placeholder="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Component Wise Net Cost *</label>
                                                <Input type="number" value={activeInitial.COMPONENTS_WISE_NET_COST} onChange={(e)=>{activeInitial.COMPONENTS_WISE_NET_COST=e.target.value;this.setState({activeInitial:Object.assign({},this.state.activeInitial,activeInitial)})}} className="form-control" id="" placeholder="" />
                                            </div>
                                        </div>
                                        <div classsName="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Components Wise Net Cost Currency *</label>
                                                <Select 
                                                className="form-control ng-pristine ng-valid ng-touched"
                                                value={activeInitial.COMPONENTS_WISE_NET_COST_CURRENCY} onChange={(e)=>{activeInitial.COMPONENTS_WISE_NET_COST_CURRENCY=e;activeInitial.COMPONENTS_WISE_CURRENCY=e;this.setState({activeInitial:Object.assign({},this.state.activeInitial,activeInitial),hasErr:false})}}
                                                >   
                                                    {
                                                        this.state.currencies.map(item=>{
                                                            return <Option value={item}>{item}</Option>
                                                        })
                                                    }

                                                </Select>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group mb-0">
                                                <label htmlFor="">Booking Reference(RA File Handler)</label>
                                                <Input type="text" value={activeInitial.RA_FILE_HANDLER} onChange={(e)=>{activeInitial.RA_FILE_HANDLER=e.target.value;this.setState({activeInitial})}} className="form-control" id="" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group mb-0">
                                                <label htmlFor="">Payment Slabs</label>
                                                <Input type="text" value={activeInitial.PAYMENT_SLABS} onChange={(e)=>{activeInitial.PAYMENT_SLABS=e.target.value}} className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group mb-0">
                                                <label htmlFor="">Supplier Payment Deadline</label>
                                                <div className="input-group-mb6">
                                                <DatePicker format="YYYY-MM-DD" 
                                                        value={activeInitial.SUPPLIER_PAYMENT_DEADLINE?moment(activeInitial.SUPPLIER_PAYMENT_DEADLINE):null} 
                                                        onChange={(date,dateString)=>{activeInitial.SUPPLIER_PAYMENT_DEADLINE=dateString;this.setState({activeInitial:Object.assign({},activeInitial,{SUPPLIER_PAYMENT_DEADLINE:dateString})})}}
                                                    style={{width:"25.5em"}}
                                                />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group mb-0">
                                                <label htmlFor="">Component Wise Discount Comission</label>
                                                <Input type="number" value={activeInitial.COMPONENTS_WISE_DISCOUNT_COMISSION} onChange={(e)=>{activeInitial.COMPONENTS_WISE_DISCOUNT_COMISSION=e.target.value;this.setTotalDiscount(this.state.activeRowIndex,dynamic,formData,activeInitial)}} className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="">Component Wise Currency</label>
                                                <Select 
                                                className="form-control ng-pristine ng-valid ng-touched"
                                                value={activeInitial.COMPONENTS_WISE_CURRENCY} onChange={(e)=>{dynamic[this.state.activeRowIndex].COMPONENTS_WISE_CURRENCY=e;this.setState({activeInitial:Object.assign({},activeInitial,{COMPONENTS_WISE_CURRENCY:e})})}}
                                                >
                                                    {
                                                        this.state.currencies.map(item=>{
                                                            return <Option value={item}>{item}</Option>
                                                        })
                                                    }

                                                </Select>
                                            </div>
                                        </div> */}
                                        <div className="col-6">
                                            <div className="form-group mb-0">
                                                <label htmlFor="">Arrival Date</label>
                                                <div className="input-group-mb6">
                                                <DatePicker format="YYYY-MM-DD" 
                                                        value={activeInitial.ARRIVALDATE?moment(activeInitial.ARRIVALDATE, 'YYYY-MM-DD'):""} 
                                                        onChange={(date,dateString)=>{activeInitial.ARRIVALDATE=dateString;this.setState({activeInitial:Object.assign({},activeInitial,{ARRIVALDATE:dateString})})}}
                                                    style={{width:"25.5em"}}
                                                />

                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        {/* <div className="col-6">
                                            <div className="form-group mb-0">
                                                <label htmlFor="">Arrival Date</label>
                                                <div className="input-group-mb6">
                                                <DatePicker format="YYYY-MM-DD" 
                                                        value={activeInitial.ARRIVALDATE?moment(activeInitial.ARRIVALDATE, 'YYYY-MM-DD'):""} 
                                                        onChange={(date,dateString)=>{activeInitial.ARRIVALDATE=dateString;this.setState({activeInitial:Object.assign({},activeInitial,{ARRIVALDATE:dateString})})}}
                                                    style={{width:"25.5em"}}
                                                />

                                                </div>
                                            </div>
                                        </div> */}
                                        
                                    </div>
                                </div>
                            {/* </div> */}
                           
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={()=>{this.saveRow(activeInitial)}}>Save</button>
                    </div>
                </div>
            </div>

            </Modal>

        </main>
    ]
  }
}



export default withRouter(Form);
