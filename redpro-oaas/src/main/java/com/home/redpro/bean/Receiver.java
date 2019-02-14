package com.home.redpro.bean;

import java.util.concurrent.CountDownLatch;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

public class Receiver {
	private static final Logger logger = Logger.getLogger(Receiver.class);
	private CountDownLatch latch;

    @Autowired
    public Receiver(CountDownLatch latch) {
        this.latch = latch;
    }

    public void receiveMessage(String message) {
    	logger.info("--------------------接受到信息--------------");
    	logger.info(message);
        latch.countDown();
    }
}
