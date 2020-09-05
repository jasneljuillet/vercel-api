const cloudinary = require('cloudinary')
const multiparty = require('multiparty')

cloudinary.config({
    cloud_name: 'XXXXXX',
    api_key: XXXXXX,
    api_secret: 'XXXXXX'
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
