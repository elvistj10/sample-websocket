package com.websocket.websocketsample.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import com.websocket.websocketsample.model.Pesan;

@Controller
@EnableScheduling
public class WebsocketController {
	
	@Autowired SimpMessagingTemplate simpMessagingTemplate;
	
	
	@Scheduled(fixedDelay = 5000)
	public void serverSentEventFive() {
		simpMessagingTemplate.convertAndSend("/topic/schedule5", "Server sent this event every 5 second . . .");
	}
	
	@Scheduled(fixedDelay = 10000)
	public void serverSentEventTenth() {
		simpMessagingTemplate.convertAndSend("/topic/schedule10", "Server sent this event every 10 second . . .");
	}
	
	@MessageMapping("/clientMessage/{isiPesan}")
	public Pesan getDataFromClient(@DestinationVariable("isiPesan") String isiPesan) {
		Pesan pesan = new Pesan();
		pesan.setIsiPesan(isiPesan);		
		simpMessagingTemplate.convertAndSend("/topic/pesan", "reply from server : " + pesan.getIsiPesan());
		return pesan;
	}	

}