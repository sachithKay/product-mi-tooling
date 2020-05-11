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
import ListViewParent from '../common/ListViewParent';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthManager from '../auth/utils/AuthManager';

const styles = {
    contentDiv: {
        margin: '3%',
    },
    explorerHeaderDiv:{
        padding:'1%',
    },
    paper:{
        height:'100%'
    }
};

export default class ResourceExplorerParent extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderSourceViewContent() {
        return (
            <Box>
                <div id="exploreHeader" style={styles.explorerHeaderDiv}>
                    <Typography variant="h5" id="tableTitle">
                        {this.props.title}
                    </Typography>
                </div>
                <Divider/>
                <div id="content" style={styles.contentDiv}>
                    {this.props.content}
                </div>
            </Box>
        );
    }

    render() {
        return (<ListViewParent data={this.renderSourceViewContent()} error={this.props.error}/>);
    }
}

ResourceExplorerParent.propTypes = {
    config: PropTypes.string,
    theme: PropTypes.shape({}),
    language: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.element,
    breadcrumb: PropTypes.element,
    connectionError: PropTypes.bool,
    error: PropTypes.object
};

ResourceExplorerParent.defaultProps = {
    config: 'no config',
    theme: docco,
    language: 'xml',
    title: 'Explorer',
    content: '<span/>',
    breadcrumb: ' ',
    connectionError: false,
    error: null
};