const express = require("express");
const app = express();
require("dotenv").config();

const sns = require('aws-node-sns');

app.get("/", (req, res) => {
  const { m, n, s } = req.query;

  if (!m || !n || !s)
    res.end(JSON.stringify({ status: false, message: "Bad Request" }));
  else {
    console.log("Message = " + m);
    console.log("Number = " + n);
    console.log("Subject = " + s);

    sns.createClient({       
        accessKeyId: `${process.env.accessKeyId}`,
        secretAccessKey:  `${process.env.secretAccessKey}`,
        region: `${process.env.region}`,
    });

    sns.sendSMS(m , n , `${process.env.senderServiceType}` , 'Transactional ', function(error, data){
        if (error){
            console.log(error)
        }else{
            console.log('MessageID' , data)
        }
    });
    
       
  }
});

app.listen(3000, () => console.log("SMS Service Listening on PORT 3000"));
