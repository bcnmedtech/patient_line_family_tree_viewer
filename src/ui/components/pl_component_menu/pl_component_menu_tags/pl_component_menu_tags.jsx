/*
# Patient line family tree viewer is (c) BCNMedTech, UNIVERSITAT POMPEU FABRA
#
# Patient line family tree viewer is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Patient line family tree viewer is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
# Carlos Yagüe Méndez
# Paula Bassagañas
# Paula Bassagañas
# Contributors: 
# Begoña Benito
# Bart Bijnens
# Oscar Camara
*/

import React, { Component } from 'react';
import { Tag } from 'carbon-components-react';
//modules
import { isObjectEmpty, isObjectAFunction } from './../../../../modules/rkt_module_object';

import {
    get_keys_from_data
} from './pl_component_menu_tags_actions';

export class PlComponentMenuTags extends Component {

    constructor(){

        super();

        this.state={
            expanded:false
        }
    }

    on_unselect_tag(tag) {
        if (isObjectAFunction(this.props.on_un_selected_tag)) {
            this.props.on_un_selected_tag(tag);
        }
    }

    on_select_tag(tag) {

        if (isObjectAFunction(this.props.on_select_tag)) {
            this.props.on_select_tag(tag);
        }
    }

    render_tags() {

        var data = this.props.data;
        var keys_selected = this.props.keys_selected;

        if (!isObjectEmpty(data)) {

            if (data.length >= 1) {

                var columns = get_keys_from_data(data);

                return (

                    columns.map((item, index) => {

                        if (keys_selected.indexOf(item) !== -1) {
                            return (

                                <a onClick={this.on_unselect_tag.bind(this, item)} className="grid-item" key={index}><Tag className="tag-selected" type="beta">{item}</Tag></a>

                            );
                        } else {
                            return (

                                <a onClick={this.on_select_tag.bind(this, item)} className="grid-item" key={index}><Tag className="tag-un-selected" type="beta">{item}</Tag></a>

                            );
                        }
                    })

                );
            }
        }
    }

    set_menu_expanded(){

        this.setState({
            expanded:!this.state.expanded
        });
    }

    render() {

        var data = this.props.data;
        var divStyle

        //var icon = <a><svg className="settings-icon" width='20' height='20' viewBox='0 0 24 24' fillRule='evenodd'><path d='M10.9 3c-.4-1.7-2-3-3.9-3S3.6 1.3 3.1 3H0v2h3.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H24V3H10.9zM7 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm10 3c-1.9 0-3.4 1.3-3.9 3H0v2h13.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H24v-2h-3.1c-.5-1.7-2-3-3.9-3zm0 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM7 16c-1.9 0-3.4 1.3-3.9 3H0v2h3.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H24v-2H10.9c-.5-1.7-2-3-3.9-3zm0 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z'></path></svg></a>
        var icon = <svg className="settings-icon" width='20' height='20' viewBox='0 0 24 24' fillRule='evenodd'><path d='M10.9 3c-.4-1.7-2-3-3.9-3S3.6 1.3 3.1 3H0v2h3.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H24V3H10.9zM7 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm10 3c-1.9 0-3.4 1.3-3.9 3H0v2h13.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H24v-2h-3.1c-.5-1.7-2-3-3.9-3zm0 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM7 16c-1.9 0-3.4 1.3-3.9 3H0v2h3.1c.4 1.7 2 3 3.9 3s3.4-1.3 3.9-3H24v-2H10.9c-.5-1.7-2-3-3.9-3zm0 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z'></path></svg>

        if(this.state.expanded === false){
            divStyle = {
                "maxHeight":"20px"
            };
        }else{
            divStyle = {};
        }

        return (
            <div className="grid-block shrink pl-component-menu-tags">
                <div className="grid-block">
                    <div className="grid" style={divStyle}>
                        {this.render_tags()}
                    </div>
                </div>
                <div className="grid-block shrink right-bar">
                    <div className="grid-block shrink item">{get_keys_from_data(data).length}</div>
                    <div className="grid-block shrink item"><a onClick={this.set_menu_expanded.bind(this)}>{icon}</a></div>
                </div>
            </div>
        );
    }
}