const cloudinary = require('cloudinary')
let multiparty = require('multiparty')
let http = require('http')
let util = require('util')

cloudinary.config({
    cloud_name: 'dtoxfmz86',
    api_key: 234177866619418,
    api_secret: 'e_Y2MlfDz62e8vZq0Yjmhf5qr1U'
})

module.exports = (req, res) => {
    if (req.method === "POST") {
        let form = new multiparty.Form();
       
        form.parse(req, (err, fields, files) => {
            res.writeHead(200, { 'content-type': 'text/plain' })
            res.write('received upload: \n\n')
             const path = files.upload[0].path
             const type = files.upload[0].headers['content-type']
            const typesImage = ['image/png','image/jpg','image/jpeg','image/gif','image/bmp','image/tiff']
            if(typesImage.includes(type)){
                cloudinary.uploader.upload(path, (err, result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.end('Uploaded')
                    }
                })
            }else{
                res.end('Choose image file')
            }
           
        });
        
        return;
    } else {
        res.end("Send a POST request.");
        return;
    }
}