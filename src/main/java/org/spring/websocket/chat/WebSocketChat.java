package org.spring.websocket.chat;

import org.springframework.stereotype.Service;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
@ServerEndpoint("/chat")
public class WebSocketChat {

    //클라이언트의 정보나 메세지를 set 설정
    //채팅창에 메세지를 반환
    //클라이언트 세션 정보를 가지고 있따
    private static Set<Session> clientInfo=
            Collections.synchronizedSet(new HashSet<Session>());


    @OnOpen //접속시 접속사 세션 설정
    public void onOpen(Session session){
        System.out.println("session->"+session.toString());

        if(!clientInfo.contains(session)){ //저장되어 있는 세션정보가 없다면
            clientInfo.add(session);        //세션 설정
            System.out.println("openSession -> "+session);
        }else{
            System.out.println("존재하는 세션");
        }
    }

    @OnMessage // 클라리언트 메세지를 수신할 때    접속자
    public void onMessage(String message, Session session) throws Exception{
        System.out.println("respone msg->"+message);

        for (Session session1 : clientInfo ) {
            System.out.println("send msg -:> "+message);
            session1.getBasicRemote().sendText(message);
        }

    }

    @OnClose //접속 해제시
    public void onClose(Session session){
        System.out.println("세션종료->"+session);
        clientInfo.remove(session); //세션 삭제
    }

    @OnError //에러 발생시
    public void handleError(Throwable throwable){
        throwable.printStackTrace();
    }


}
