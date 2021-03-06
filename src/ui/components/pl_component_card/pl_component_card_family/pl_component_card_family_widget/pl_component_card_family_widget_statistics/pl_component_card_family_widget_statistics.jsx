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
import { PlComponentButtonIcon } from "./../../../../pl_component_button/pl_component_button_icon/pl_component_button_icon";
import { PlComponentCardPatientStatus } from './../../../pl_component_card_patient/pl_component_card_patient_status/pl_component_card_patient_status';
import { PlComponentCardPatientWidgetRelatives } from './../../../pl_component_card_patient/pl_component_card_patient_widget/pl_component_card_patient_widget_relatives/pl_component_card_patient_widget_relatives';
//modules
import { calculate_age } from './../../../../../../modules/rkt_module_date';
import { isObjectEmpty } from './../../../../../../modules/rkt_module_object';
//actions
import { sort_statistics, format_phenotype } from './pl_component_card_family_widget_statistics_actions';

import { filter } from "underscore";

export class PlComponentCardFamilyWidgetStatistics extends Component {

    constructor() {

        super();

        this.state = {
            index_item_to_open: false
        }

    }

    open_close_row_content(index) {

        if ((this.state.index_item_to_open !== false) && (this.state.index_item_to_open === index)) {

            index = false; // to close when clicking an opened item

        }

        this.setState({

            index_item_to_open: index

        })
    }

    render_card_family_widget_statistics(statistics) {

        if (!isObjectEmpty(statistics)) {

            return (

                <table className="grid-block vertical">
                    <tbody>
                        {this.render_list_of_statistics(statistics)}
                    </tbody>
                </table>

            );

        }

    }

    render_list_of_statistics(statistics) {

        var index_item_to_open = this.state.index_item_to_open;
        var sorted_statistics = sort_statistics(statistics);

        return (

            sorted_statistics.map((stat, index) => {

                var phenotype = stat["phenotype"];
                var counter = stat["counter"];
                var counter_males = stat["counter_males"];
                var counter_females = stat["counter_females"];

                var chevron_down =
                    <svg width="15" height="15" viewBox="0 0 12 7">
                        <path d="M6.002 5.55L11.27 0l.726.685L6.003 7 0 .685.726 0z"></path>
                    </svg>


                var chevron_up =
                    <svg width="15" height="15" viewBox="0 0 12 7">
                        <path d="M5.994 1.45L.726 7 0 6.315 5.994 0l6.002 6.315L11.27 7z"></path>
                    </svg>


                var row_content;
                var style;
                var icon_button;
                if ((index_item_to_open !== false) && (index_item_to_open === index)) {

                    var relatives = stat["relatives"];
                    row_content = this.render_row_content(relatives);
                    style = { "backgroundColor": "#00000047" };
                    icon_button = chevron_up;

                } else {

                    icon_button = chevron_down;

                }

                return (
                    <tr className="grid-block vertical pl-component-card-family-widget-statistics-item" style={style} key={index}>
                        <td className="grid-block">
                            <table className="grid-block vertical">
                                <tbody className="grid-block vertical">
                                    {this.render_row(phenotype, counter, counter_males, counter_females, icon_button, index)}
                                    {row_content}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )

            })

        );

    }

    render_row(phenotype, counter, counter_males, counter_females, icon_button, index) {

        return (
            <tr className="grid-block shrink">
                <td className="grid-block pl-component-card-family-widget-statistics-element">
                    <div className="grid-block vertical shrink centered">
                        <PlComponentCardPatientStatus phenotype={phenotype} gender={"male"} />
                        {counter_males}
                    </div>
                    <div className="grid-block vertical shrink centered">
                        <PlComponentCardPatientStatus phenotype={phenotype} gender={"female"} />
                        {counter_females}
                    </div>
                </td>
                <td className="grid-block vertical pl-component-card-family-widget-statistics-element">
                    <div className="grid-block shrink text">{format_phenotype(phenotype)}</div>
                </td>
                <td className="grid-block vertical pl-component-card-family-widget-statistics-element">
                    <div className="grid-block shrink text">{counter}</div>
                </td>
                <td className="grid-block align-right pl-component-card-family-widget-statistics-element">
                    <PlComponentButtonIcon
                        icon={icon_button}
                        backgroundcolor={"transparent"}
                        backgroundhovercolor={"transparent"}
                        fontcolor={"#5C4EE5"}
                        fonthovercolor={"#8c83ea"}
                        bordercolor={"transparent"}
                        borderhovercolor={"transparent"}
                        onclickelement={this.open_close_row_content.bind(this, index)}
                    />
                </td>
            </tr>
        );

    }

    render_row_content(relatives) {

        return (

            <tr className="pl-component-card-family-widget-statistics-item-content">
                <td className="grid-block">
                    <PlComponentCardPatientWidgetRelatives relatives={relatives} toDisplayCurrentPatient={true} />
                </td>
            </tr>

        );

    }

    render() {

        var family_statistics = this.props.family_statistics;

        return (
            <div className="grid-block pl-component-card-family-widget-statistics">
                {this.render_card_family_widget_statistics(family_statistics)}
            </div>
        );

    }
}