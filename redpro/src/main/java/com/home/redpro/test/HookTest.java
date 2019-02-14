package com.home.redpro.test;
import sun.misc.Signal;
import sun.misc.SignalHandler;

@SuppressWarnings("restriction")
public class HookTest implements SignalHandler {
	 
    public void registerSignal(String signalName) {
        Signal signal = new Signal(signalName);
        Signal.handle(signal, this);
    }
 
    @Override
    public void handle(Signal signal) {
       
        if (signal.getName().equals("TERM")) {
                //
        } else if (signal.getName().equals("INT") || signal.getName().equals("HUP")) {
                //
        } else {
                //
        }
    }
 
    
    private void shutdown() {
    	Runtime.getRuntime().addShutdownHook(new Thread() {
    	    public void run() {
    	      
    	    }
    	});
    }
}
