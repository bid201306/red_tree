package com.home.redpro.ws.ftp;

import org.apache.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/affix")
public class AffixController {
	//private Logger logger = LoggerFactory.getLogger(FlowDubboServiceInf.class);
	public static final Logger logger = Logger.getLogger(AffixController.class);

	@Transactional
	@RequestMapping(value = "/ftpProcessHttp", method = RequestMethod.POST)
	public String ftpProcessHttp(@RequestBody String params) {
		
		logger.info("params:\t" + params);
		return params;
		
	}

}
