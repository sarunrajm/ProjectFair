import axios from 'axios'

export const commonAPI = async (httpRequest,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpRequest,
        url,
        data:reqBody,
        Headers:reqHeader?reqHeader:{"content-Type":"application/json"}
    }
    return await axios(reqConfig).then(
        (result)=>{
            return result
        }
    ).catch((err)=>{
        return err
    })
}