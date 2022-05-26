const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
const { send } = require("express/lib/response")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
var busModel=Mongoose.model("buses",
new Mongoose.Schema(
    {
        route:String,
        busname:String,
        regno:String,
        owner:String,
        contact:String
    }
))
Mongoose.connect("mongodb+srv://mzc:mzc@cluster0.m2f8m.mongodb.net/BusDb")

app.post("/api/addbus",(req,res)=>{
    var getRoute=req.body.route
    var getBusname=req.body.busname
    var getReg=req.body.regno
    var getOwner=req.body.owner
    var getContact=req.body.contact
    data={"route":getRoute,"busname":getBusname,"regno":getReg,"owner":getOwner,"contact":getContact}
    let mybus=new busModel(data)
    mybus.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })

})
app.get("/api/viewbus",(req,res)=>{
    res.send("View all bus")
})
app.listen(4500,()=>{
    console.log("server runnig")
})