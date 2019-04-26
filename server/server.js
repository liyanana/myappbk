const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());

//静态目录
app.use("/static",express.static("static"));
//路由模块
const adminRouter=require("./routers/admin");
const indexRouter=require("./routers/homepage");
app.use("/admin",adminRouter);
app.use("/index",indexRouter);
app.get("/*",(req,res)=>{
    res.send("404");
})

app.listen(8081,()=>{
    console.log("服务器开启成功")
})