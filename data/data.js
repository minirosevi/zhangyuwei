exports.data=function(){
    return [
        {
            route:"/html/index",
            handle:function(req,res,next){
                res.writeHead(200,{
                    "content-type":"application/json;charset=utf-8",
                    "access-control-allow-origin":"*"
                });
                var datas= [
                    {
                        id: '4',
                        name: "ipnone4",
                        money: "11111"
                    },
                    {
                        id: '2',
                        name: "ipnone5",
                        money: "22222"
                    },
                    {
                        id: '3',
                        name: "ipnone7",
                        money: "3333"
                    },
                    {
                        id: '1',
                        name: "ipnone6",
                        money: "44444"
                    }
                ];
                res.write(JSON.stringify(datas));
                res.end();
            }
        }
    ];
}