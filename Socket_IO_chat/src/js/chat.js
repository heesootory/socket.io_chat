"use strict"

const socket = io();            // 소켓 객체가 생성됨.

const nickname = document.querySelector("#nickname");       // ID 불러오기
const chatlist = document.querySelector(".chatting-list");  // 채팅내용 불러오기
const chatInput = document.querySelector(".chatting-input");    //메세지 입력 받아오기
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")       //스크롤바 따라내려오게

chatInput.addEventListener("keypress", (event)=> {
    if( event.keyCode === 13){      //엔터가 눌리게 될시 전송 버튼 클릭
        send()
    }
})

function send(){
    const param = {
        name:nickname.value,
        msg:chatInput.value
    }

    socket.emit("chatting", param)       // emit("채팅 아이디", "내용") -> 데이터 보내기
}

sendButton.addEventListener("click", send)


socket.on("chatting", (data)=>{             // 프론트쪽에서도 메세지 받는 것 구현.
    console.log(data) //-> 보낸 메세지가 콘솔창에 뜨게 했다면
    // 그걸 li를 이용해서 웹에 뜨게 만들어 보자.
    // const li = document.createElement("li");
    // li.innerText = `${data.name}님 - ${data.msg}`;
    // chatlist.appendChild(li);


    // 이제 메세지가 올떄마다 LiModel함수를 실행시켜서, 모든 html을 담는 것을 구현
    const {name, msg, time} = data // data를 세부분으로 쪼개줌
    const item = new LiModel(name, msg, time);     //new를 이용해서, LiModel을 초기화.
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

console.log(socket);            // 소켓을 반환

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () =>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "recevied");
        const dom = `<span class = "profile">
            <span class = "user">${this.name}</span>
            <img class="image" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8pAbG51fiGYpqZJ_6v4UGRMewDOF4bKJAuw&usqp=CAU" alt = "any">
        </span>
        <span class = "message">${this.msg}</span>
        <span class = "time">${this.time}</span>`;
        li.innerHTML = dom;
        chatlist.appendChild(li);
    }

}




























