const express=require('express'),app=express();
app.get('/',(r,s)=>s.send('OK'));
app.get('/emess',(r,s)=>s.json({title:"🧪 LIVE",timestamp:Date.now()}));
app.listen(parseInt(process.env.PORT)||8080,'0.0.0.0');
