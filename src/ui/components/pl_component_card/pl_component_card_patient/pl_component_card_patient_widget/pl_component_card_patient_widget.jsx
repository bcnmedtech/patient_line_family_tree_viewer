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

export class PlComponentCardPatientWidget extends Component {

    capitalize_first_letter(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    render() {

        var tittle = this.props.tittle;
        var content = this.props.content;

        return (
            <div className="grid-block vertical pl-component-card-patient-widget">
                <h5>{this.capitalize_first_letter(tittle)}</h5>
                {content}
            </div>
        );

    }
}