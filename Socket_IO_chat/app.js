const express = require("express")      // require를 사용하면 node_modules을 바라보고 있기 때문에, "express"를 알아서 찾아서 가져온다.
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app)       // express 로 구현한 서버가 http를 이용해서 돌아가게 담아준다.
const socketIO = require("socket.io")       // 다운받은 소켓io 패키지 불러오기
const moment = require("moment");

const io = socketIO(server);                // 우리가 사용하는 서버를 socketIO에 담기.
                                            //소켓으로 주고 받는 메세지를 이용할 것이기 때문에.

// console.log(__dirname)  -> 현재의 경로를 말한다. == pwd와 동일하게 출력

app.use(express.static(path.join(__dirname, "src")))      // 위의 경로에다가 /public 을 추가해주는 느낌 (join)

const PORT = process.env.PORT || 5000;          // 프로세스 환경에 포트가 지정되있다면, 그것을 사용하고 || 아니라면 포트 5000번을 사용.

server.listen(PORT, () => console.log(`server is running ${PORT}`))        // app.listen(포트번호 , (서버가 열리면) => 뭐라고 출력할지)



io.on("connection", (socket) => {               // connection이 이루어 졌다면 !! 콘솔을 찍어라.
    //console.log(`연결이 이루어졌습니다.`)      
    socket.on("chatting",  (data)=>{                // socket.on("채팅아이디", 실행할 함수)  / data는 넘어온 데이터의 객체 변수
        const {name, msg} = data;
        console.log(data);
        //io.emit("chatting", `그래 반가워 ${data}`)      //프론트로 데이터보내기
        //io.emit("chatting", data);
        // 서버에서는 보내주는 내용까지만 구현
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h: ss A")       // 시간, (A:오전/오후) 
        })
    })
});

/**
 * socket.on("이벤트명", Callback Function) :  해당 이벤트를 받고 콜백함수를 실행.
 * socket.emit("이벤트명", Data) : 이벤트명을 지정하고 데이터를 보냄.
 * 
 * 이벤트명
 * connection : Client와 연결되었을때 발생.
 * disconnection : Client와 연결해제가 되었을때.
 */





































