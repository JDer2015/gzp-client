import axios from 'axios'
export default  (url,data={},type="GET") =>{
    if(type==="GET"){
        let queryString = ''
        Object.keys(data).forEach(key => {
            queryString += key + '=' + data[key] + '&'
        })
        if(queryString){
            queryString = queryString.substring(0,queryString.length-1)
        }
        return axios.get(url + '?' + queryString)
    }else{
        return axios.post(url,data)
    }
}