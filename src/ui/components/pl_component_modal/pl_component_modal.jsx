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

//modules
import {isObjectAFunction } from './../../../modules/rkt_module_object.js';
//components
import { PlComponentTitle } from './../pl_component_title/pl_component_title';
import { PlComponentButtonText } from './../pl_component_button/pl_component_button_text/pl_component_button_text';
//import plComponentFormTestData from './../pl_component_form/pl_component_form_test_data.json';

export class PlComponentModal extends Component {

    constructor() {

        super();
        this.state = {
            modal_content_info: undefined,
            isModalClosed: false
        };
    }

    closeModal() {
        this.setState({
            modal_content_info: undefined,
            isModalClosed: true
        });

        var myComponent = this;

        if (isObjectAFunction(this.props.onclickesc)) {
            setTimeout(function () {
                myComponent.props.onclickesc();
            }, 500);
        }
    }

    render() {

        var title = this.props.title;
        var Modal_content = this.props.Modal_content;

        var modal_id = "pl_component_modal_open";
        if (!this.state.isModalClosed) modal_id = "pl_component_modal_open";
        else modal_id = "pl_component_modal_closed";

        return (
            <div className="grid-block pl_component_modal shrink vertical" id={modal_id} >
            {this.props.button}
                <div className="grid-block shrink pl_component_modal_top_bar">
                    <div className="grid-block pl_component_modal_title">
                        <PlComponentTitle title={title} />
                    </div>
                    <div className="pl_component_modal_esc_button">
                        <PlComponentButtonText
                            text={"ESC"}
                            backgroundcolor={"transparent"}
                            backgroundhovercolor={"transparent"}
                            fontcolor={"#5C4EE5"} fonthovercolor={"#8c83ea"}
                            bordercolor={"transparent"} borderhovercolor={"transparent"}
                            onclickelement={this.closeModal.bind(this)} />
                    </div>
                </div>
                <div className="pl_component_modal_content">
                    {Modal_content}
                </div>
            </div>
        );
    }
}