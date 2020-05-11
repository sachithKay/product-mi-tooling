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

import React, {Component} from 'react';
import ResourceExplorerParent from '../common/ResourceExplorerParent';
import ResourceAPI from '../utils/apis/ResourceAPI';
import queryString from 'query-string'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHeaderBox from '../common/TableHeaderBox';
import { Link } from "react-router-dom";

export default class LocalEntryDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metaData: [],
            value: "",
            response: {},
            error: null
        };
    }

    /**
     * Retrieve local entry details from the MI.
     */
    componentDidMount() {
        let url = this.props.location.search;
        const values = queryString.parse(url) || {};
        this.retrieveLocalEntryInfo(values.name);
    }

    createData(name, value) {
        return {name, value};
    }

    retrieveLocalEntryInfo(name) {
        const metaData = [];
        new ResourceAPI().getLocalEntryByName(name).then((response) => {

            metaData.push(this.createData("Local Entry Name", response.data.name));
            metaData.push(this.createData("Type", response.data.type));
            this.setState(
                {
                    metaData: metaData,
                    value: response.data.value,
                    response: response.data,
                });
        }).catch((error) => {
            this.setState({error:error});
        });
    }

    renderLocalEntryDetails() {
        return (
            <div>
                <Box pb={5}>
                    <TableHeaderBox title="Entry Details"/>
                    <Table size="small">
                        <TableBody>
                            {
                                this.state.metaData.map(row => (
                                    <TableRow>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.value}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Box>

                <Box pb={5}>
                    <TableHeaderBox title="Value"/>
                    <Box boxShadow={1} minHeight={100} color="text.secondary" paddingLeft={2}>
                        {this.state.value}
                    </Box>
                </Box>
            </div>
        );
    }

    renderBreadCrumbs() {
        return (
            <div style={{display:"flex"}}>
                <Box color="inherit" component={Link} to="/local-entry">Local Entries</Box>
                <Box color="textPrimary">&nbsp;>&nbsp;</Box>
                <Box color="textPrimary"> {this.state.response.name}</Box>
            </div>
        );
    }

    render() {
        return (
            <ResourceExplorerParent title={this.renderBreadCrumbs()}
                                    content={this.renderLocalEntryDetails()}
                                    error={this.state.error}/>
        );
    }
}