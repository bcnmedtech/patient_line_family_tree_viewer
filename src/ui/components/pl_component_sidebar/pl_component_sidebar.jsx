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

//components
import { PlComponentSidebarHeader } from './pl_component_sidebar_header/pl_component_sidebar_header';
import { PlComponentSidebarFamily } from './pl_component_sidebar_family/pl_component_sidebar_family';
import { PlComponentSidebarPatient } from './pl_component_sidebar_patient/pl_component_sidebar_patient';

//modules
import { isObjectAFunction, isObjectEmpty } from './../../../modules/rkt_module_object';
import { format_date } from '../../../modules/rkt_module_date';

export class PlComponentSidebar extends Component {

    constructor() {
        super();

        this.state = {
            mode: "patient",
            mode_edit: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props !== nextProps) {

            this.setState({
                mode_edit: false
            });

        }

    }

    on_click_edit_item_button(mode, action) {
        
        if (action === "edit") {

            this.set_mode_edit();

        } else if (action === "delete") {

            if (mode === "patient") {

                var patient = this.props.patient;

                if (isObjectEmpty(patient.children)) {

                    this.refs.sidebarPatient.on_ask_to_remove_patient();

                } else {
                    
                    alert("You cannot delete a patient with children");

                }

            } else if (mode === "family") {

                this.refs.sidebarFamily.on_ask_to_remove_family();

            }

        } else if (action === "export") {

            if (mode === "patient") {

                this.on_ask_to_export_patient();

            }

        }

    }

    set_database_component_mode(mode) {

        this.setState({
            mode: mode,
            mode_edit: false
        });
    }

    set_mode_edit() {

        this.setState({
            mode_edit: !this.state.mode_edit
        });
    }

    on_ask_to_export_patient() {

        if (isObjectAFunction(this.props.export_patient)) {

            var patient = this.props.patient;
            if ("dob" in patient) patient["dob"] = format_date(patient["dob"]);
            
            this.props.export_patient(patient);

        }

    }

    render() {

        var sidebar_header_items = ["patient", "family"];
        var family = this.props.family;
        var family_statistics = this.props.family_statistics;
        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var relatives = this.props.relatives;
        var mode = this.state.mode;
        var mode_edit = this.state.mode_edit;
        var sidebar;

        if (mode === "patient") {

            sidebar =
                <PlComponentSidebarPatient
                    ref="sidebarPatient"
                    patient={patient}
                    mother={mother}
                    father={father}
                    children={children}
                    relatives={relatives}
                    mode_edit={mode_edit}
                    perform_database_action={this.props.perform_database_action} />

        } else if (mode === "family") {

            sidebar =
                <PlComponentSidebarFamily
                    ref="sidebarFamily"
                    family={family}
                    family_statistics={family_statistics}
                    mode_edit={mode_edit}
                    perform_database_action={this.props.perform_database_action} />

        }
        
        return (
            <div className="grid-block vertical pl_component_sidebar">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentSidebarHeader
                        mode={this.state.mode}
                        items={sidebar_header_items}
                        mode_edit={mode_edit}
                        set_database_component_mode={this.set_database_component_mode.bind(this)}
                        on_click_edit_item_button={this.on_click_edit_item_button.bind(this)}
                    />
                </div>
                {sidebar}
            </div>
        );
    }
}