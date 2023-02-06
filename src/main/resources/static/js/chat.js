let data = {};
let ws; //webSocket url
let userId = document.querySelector('#userId'); //접속자
let ConnectBtn = document.querySelector('#ConnectBtn'); //접속자 이벤트
let msg = document.querySelector('#msg'); //전송 할 메세지
let sendBtn = document.querySelector('#sendBtn'); //메세지 전송
let chatWindowCon = document.querySelector('.chatWindow-con'); //채팅창

let url = "localhost:8090";

ConnectBtn.addEventListener('click',()=>{
    ws= new WebSocket("ws://"+url+"/chat");  // "/chat" <- endpoint mapping
    
    if(userId.value.length<=0 || userId.value==""){
        alert("사용자명 입력 필수");
        userId.focus();
        return false;
    }

    alert(userId.value+"접속");

    ws.onmessage=function(msg){
        //소켓 메세지 수신
        let data = JSON.parse(msg.data); //문자열 -> 객체
          
        // div 생성
        let divTag=document.createElement('div');
        let className;
        //전송아이디 == 채팅 대상
        if(data.userId == userId.value){
                className="yellow"
        }else{
            className="white"
        }

        let item;
        item = "<div class='"+className+"'> <p><span>[작성자]: "
                + data.userId+"</span><br/>"
                +"<span> 내용 : " + data.msg + "</span></p></div>";
        
        divTag.innerHTML = item; // item에 생성된 div 태그 추가

        chatWindowCon.append(divTag); // 생성된 것을 con뒤에 순서대로 추가
    }
});
//메세지 전송
sendBtn.addEventListener('click',()=>{

    sendMessage();

});


//3. 메세지 데이터
function sendMessage(){
    
    //전송 메세지 데이터 없으면 거름
    if(msg.value.length<=0 || msg.value==""){
        alert("전송 할 메세지가 없다");
        msg.focus();
        return false;
    }

    //소켓 서버에 전송 data
    data.userId=userId.value; //작성자
    data.msg=msg.value; //메세지
    data.date=new Date().toLocaleDateString(); //시간

    let sendData = JSON.stringify(data); //객체를 문자열로 변환

    ws.send(sendData); //data 전송
    
}

