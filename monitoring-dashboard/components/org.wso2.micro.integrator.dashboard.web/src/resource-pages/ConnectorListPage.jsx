/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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


import React, { Component } from 'react';
import ListViewParent from '../common/ListViewParent';
import ResourceAPI from '../utils/apis/ResourceAPI';

import MUIDataTable from "mui-datatables";
import DisableIcon from '@material-ui/icons/Block';
import ActiveIcon from '@material-ui/icons/CheckBox';

export default class ConnectorListPage extends Component {

    constructor(props) {
        super(props);
        this.connectors = null;
        this.state = {
            data: [],
            error: null
        };
    }

    /**
     * Retrieve connectors from the MI.
     */
    componentDidMount() {
        this.retrieveConnectors();
    }

    retrieveConnectors() {
        const data = [];

        new ResourceAPI().getResourceList(`/connectors`).then((response) => {
            this.connectors = response.data.list || [];

            this.connectors.forEach((element) => {
                const rowData = [];
                rowData.push(element.name);
                rowData.push(element.package);
                rowData.push(element.description);
                rowData.push(element.status);
                data.push(rowData);

            });
            this.setState({data: data});
        }).catch((error) => {
            this.setState({error:error});
        });
    }

    renderResourceList() {

        const columns = ["Library Name", "Package", "Description",
        {
        name: "Status",
        options: {
        customBodyRender: (value, tableMeta, updateValue) => {
         if ("enabled" === tableMeta.rowData[3]) {
                return(<span><ActiveIcon style={{color:"green"}}/> Enabled </span>);
                    } else {
      return(<span><DisableIcon style={{color:"red"}}/> Disabled </span>);
      }
        }
      }}];
        const options = {
            selectableRows: 'none',
            print: false,
            download: false,
        };

        return (
            <MUIDataTable
                title={"CONNECTORS"}
                data={this.state.data}
                columns={columns}
                options={options}
            />
        );
    }
    render() {
        return (
            <ListViewParent
                data={this.renderResourceList()}
                error={this.state.error}
            />
        );
    }
}