import React, { Component } from 'react';

//modules
import { isObjectEmpty, isObjectAFunction, isObjectAnArray } from './../../../modules/rkt_module_object';

//components
import { PlComponentSidebarHeader } from './pl_component_sidebar_header/pl_component_sidebar_header';
import { PlComponentSidebarFamily } from './pl_component_sidebar_family/pl_component_sidebar_family';
import { PlComponentSidebarPatient } from './pl_component_sidebar_patient/pl_component_sidebar_patient';


export class PlComponentSidebar extends Component {

    constructor() {
        super();

        this.state = {
            mode: "patient",
        }
    }

    set_database_component_mode(mode) {

        this.setState({
            mode: mode
        });
    }

    render() {

        var sidebar_header_items = ["patient", "family"];
        var family = this.props.family;
        var patient = this.props.patient;
        var father = this.props.father;
        var mother = this.props.mother;
        var children = this.props.children;
        var relatives = this.props.relatives;
        var mode = this.state.mode;
        var sidebar;

        if (mode === "patient") {

            sidebar =
                <PlComponentSidebarPatient
                    patient={patient}
                    mother={mother}
                    father={father}
                    children={children}
                    relatives={relatives}
                    perform_database_action={this.props.perform_database_action}
                />

        } else if (mode === "family") {
            
            sidebar =
                <PlComponentSidebarFamily
                    family={family}
                    perform_database_action={this.props.perform_database_action}
                />

        }

        return (
            <div className="grid-block vertical pl_component_sidebar">
                <div className="grid-block shrink pl_component_sidebar_element">
                    <PlComponentSidebarHeader mode={this.state.mode} items={sidebar_header_items} set_database_component_mode={this.set_database_component_mode.bind(this)} />
                </div>
                {sidebar}
            </div>
        );
    }
}