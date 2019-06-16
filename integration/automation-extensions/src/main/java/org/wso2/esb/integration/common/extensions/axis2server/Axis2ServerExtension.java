/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.esb.integration.common.extensions.axis2server;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.params.CoreConnectionPNames;
import org.wso2.carbon.automation.engine.exceptions.AutomationFrameworkException;
import org.wso2.carbon.automation.engine.extensions.ExecutionListenerExtension;

import java.io.IOException;

public class Axis2ServerExtension extends ExecutionListenerExtension {
    private Axis2ServerManager serverManager;
    private static final Log log = LogFactory.getLog(Axis2ServerExtension.class);

    public void initiate() throws AutomationFrameworkException {

    }

    public void onExecutionStart() throws AutomationFrameworkException {
        serverManager = new Axis2ServerManager();
        //To set the socket can be bound even though a previous connection is still in a timeout state.
        if (System.getProperty(CoreConnectionPNames.SO_REUSEADDR) == null) {
            System.setProperty(CoreConnectionPNames.SO_REUSEADDR, "true");
        }
        try {
            serverManager.start();
            log.info(".................Deploying services..............");
            serverManager.deployService(ServiceNameConstants.LB_SERVICE_1);
            serverManager.deployService(ServiceNameConstants.SIMPLE_STOCK_QUOTE_SERVICE);
            serverManager.deployService(ServiceNameConstants.SECURE_STOCK_QUOTE_SERVICE);
            serverManager.deployService(ServiceNameConstants.SIMPLE_AXIS2_SERVICE);
        } catch (IOException e) {
            handleException("Error While Deploying services", e);
        }
    }

    public void onExecutionFinish() throws AutomationFrameworkException {
        serverManager.stop();
    }

    private static void handleException(String msg, Exception e) {
        log.error(msg, e);
        throw new RuntimeException(msg, e);
    }
}
