import axios from 'axios';
const envoirnment = process.env.NODE_ENV;
// const defaultVersion = 'v1';
const api_url = envoirnment==='development'?'http://localhost:5000':'';

class Httpservice{
  
    get = (url="") => new Promise((resolve,reject)=>{
        // var headers = {
        //     'Authorization': "Bearer "+token
        // };
       
        axios.get(api_url+'/'+url)
        .then(function(response){
            resolve(response);
        })
        .catch(function(error){
            reject(error)
        });
    })
    

    post = (url,data) => new Promise((resolve,reject)=>{
        // var headers = {
        //     'Authorization': "Bearer "+token
        // };
       
        axios.post(api_url+'/'+url,data)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    })


    // postFile = (url,data,token,version=defaultVersion) => new Promise((resolve,reject)=>{
    //     axios.post(api_url+version+'/'+url,data,{headers: {'Authorization': "Bearer "+token, 'content-type': 'multipart/form-data' }})
    //         .then(function (response) {
    //             resolve(response);
    //         })
    //         .catch(function (error) {
    //             reject(error);
    //         });
    // })

    // putFile = (url,data,type)=>new Promise((resolve,reject)=>{
       
    //    var options = {
    //         headers: {
    //             'Content-Type': type
    //           },
    //           onUploadProgress: function(progressEvent) {
    //             var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    //             GlobalStore.fileUploadPercentage=percentCompleted;
    //           }
    //     }
        
    //     axios.put(url,data,options).then(response=>{
            
    //         resolve(response)
    //     }).catch(error=>{
    //         reject(error);
    //     })
    // })
   
    

  
}

export default new Httpservice();
// https://redappletravel.realbooks.in/api/