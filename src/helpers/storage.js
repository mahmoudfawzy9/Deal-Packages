const axios = require('axios');
const FormData = require('form-data');

exports.getFileUrl = async (path) => {
    return new Promise((resolve, reject) => {
        let data = new FormData()
        data.append('bucket', 'kidstar-assets')
        data.append('path', path)
        axios({
            method: "post",
            url: `${process.env.SERVICE_STORAGE_URL}/api/json/storage/view`,
            data: data,
            headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` },
        }).then((response) => {
            resolve(response.data.data.url)
        }).catch(error => {
            console.log(error)
            resolve(null)
        })
    })
}