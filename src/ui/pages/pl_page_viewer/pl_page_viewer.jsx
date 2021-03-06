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
//actions
import {
  get_data,
  perform_database_action,
  format_patient_to_export
} from './pl_page_viewer_actions';
//components
import { PlComponentFamilyTreeViewer } from './../../components/pl_component_family_tree_viewer/pl_component_family_tree_viewer';
import { PlComponentSidebar } from './../../components/pl_component_sidebar/pl_component_sidebar';
import { PlComponentButtonCircle } from './../../components/pl_component_button/pl_component_button_circle/pl_component_button_circle';
import { PlComponentButtonCircleSelectable } from './../../components/pl_component_button/pl_component_button_circle_selectable/pl_component_button_circle_selectable';
import { PlComponentLegend } from './../../components/pl_component_legend/pl_component_legend';
import { PlComponentTextPlain } from './../../components/pl_component_text/pl_component_text_plain/pl_component_text_plain';

//modules
import { url_getParameterByName } from './../../../modules/rkt_module_url';

import { map } from 'underscore';

export default class PlPageViewer extends Component {

  constructor() {
    super();

    this.state = {
      root: false,
      siblings: false,
      show_legend: false,
      family: false,
      patient: false,
      father: false,
      mother: false,
      children: false,
      relatives: false
    };
  }

  update_component_state_from_database(patient_id) {

    var myComponent = this;
    var relatives = this.state.relatives;

    //console.log(relatives);

    // we update the id of the current patient in array "relatives" with the value "patient_id"
    //relatives = map(relatives, function(relative){
    //  if (relative["relation"] === "current patient") relative.id = patient_id;
    //  return relative;
    //});

    get_data(patient_id, relatives, function (result) {

      if (result) {

        if ("patient" in result) {

          myComponent.setState({
            root: result.root,
            siblings: result.siblings,
            family: result.family,
            family_statistics: result.family_statistics,
            patient: result.patient,
            mother: result.mother,
            father: result.father,
            children: result.children,
            relatives: result.relatives
          });

        } else {

          myComponent.setState({
            root: result.root,
            siblings: result.siblings,
            family: result.family,
          });

        }

      } else {

        myComponent.on_click_button("go_back");

      }


    });

  }

  componentDidMount() {

    var location = window.location;

    if ("href" in location) {

      var location_url = location.href;
      var patient_id = url_getParameterByName("patient_id", location_url);
      this.update_component_state_from_database(patient_id);

    }

  }

  explore_new_patient(id) {

    this.update_component_state_from_database(id);

  }

  export_patient(patient) {

    var myComponent = this;

    var data = {};
    data["action"] = "export_patient";
    data["data"] = { "patient": {}, "family_tree": undefined };

    // "patient.xlsx" + "family_tree.pdf" will be exported in a zip (TODO?)
    // patient
    var patient_to_export = format_patient_to_export(patient);
    var id_patient = patient_to_export.id;

    // family tree
    //var family_tree = this.refs.FamilyTreeViewer.get_family_tree(); // this refs do not exist for the moment

    data["data"]["patient"][id_patient] = [patient_to_export];
    //data["data"]["family_tree"] = family_tree;

    myComponent.perform_database_action(data);

  }

  perform_database_action(data) {

    var myComponent = this;

    perform_database_action(data, function (result) {

      console.log(result);

      var location = window.location;

      if ("href" in location) {

        var location_url = location.href;
        var patient_id = url_getParameterByName("patient_id", location_url);


        if(result.hasOwnProperty("family_removed")) {

          if(result.family_removed === true){
            var browserHistory = myComponent.props.history;
            browserHistory.push("/patients");
          }
          
        }else if(result.hasOwnProperty("patient_id")){
          patient_id = result.patient_id;
          myComponent.update_component_state_from_database(patient_id);
        }else if ("patient_id" in data){
          patient_id = data.patient_id;
          myComponent.update_component_state_from_database(patient_id);
        }else if (patient_id === undefined){
          patient_id = myComponent.state.root.children[2].id;// family's root
          myComponent.update_component_state_from_database(patient_id);
        }else if (result){
          myComponent.update_component_state_from_database(patient_id);
        }
      }

    });

  }

  on_click_button(action) {

    if (action === "go_back") {

      var browserHistory = this.props.history;
      browserHistory.push("/patients");

    } else if (action === "show_legend") {

      this.setState({
        show_legend: !this.state.show_legend
      })
    }

  }

  render() {

    var tree_viewer;
    var sidebar;
    var viewer_legend;
    var patient = this.state.patient;
    var family = this.state.family;
    var family_statistics = this.state.family_statistics;
    var father = this.state.father;
    var mother = this.state.mother;
    var relatives = this.state.relatives;
    var children = this.state.children;
    var root = this.state.root;
    var siblings = this.state.siblings;

    var bottom_button_left =
      {
        "name": "go_back",
        "icon": <svg width='16' height='14' viewBox='0 0 16 14' fillRule='evenodd'><path d='M3.4 8H16V6H3.3l5-4.7L7 0 0 7l7 7 1.3-1.3z'></path></svg>
      }

    var bottom_button_right =
      {
        "name": "show_legend",
        "icon": <svg width='16' height='15' viewBox='0 0 12 11' fillRule='evenodd'><path d='M1 9V1h2.8S6 1 6 2.5v7.1S5.7 9 3.7 9H1zm6.5-9C6.4 0 6 .8 6 .8S5.6 0 3.8 0H0v10h3.7S6 10 6 11c0-1 2.2-1 2.2-1H12V0H7.5z'></path></svg>,
        "selected": this.state.show_legend
      }

    if (this.state.root !== false && this.state.siblings !== false) {
      tree_viewer = <PlComponentFamilyTreeViewer
        root={root}
        siblings={siblings}
        set_patient={this.explore_new_patient.bind(this)}
        patient_id={patient.id}
      />;
      sidebar = <PlComponentSidebar
        patient={patient}
        family={family}
        family_statistics={family_statistics}
        father={father}
        mother={mother}
        children={children}
        relatives={relatives}
        perform_database_action={this.perform_database_action.bind(this)}
        export_patient={this.export_patient.bind(this)}
      />
    }

    if (this.state.show_legend) {
      viewer_legend =
        <div className="grid-block shrink legend">
          <PlComponentLegend />;
        </div>
    }

    return (
      <div className="grid-frame pl-page-viewer">
        <div className="grid-block medium-8">
          <div className="grid-block vertical top_bar_left">
            <h4><PlComponentTextPlain text={family.name} /></h4>
            <PlComponentTextPlain text={family.symptoms} />
          </div>
          {tree_viewer}
          <div className="grid-block bottom_bar_left">
            <PlComponentButtonCircle
              text={""}
              icon={bottom_button_left.icon}
              backgroundcolor={"transparent"}
              backgroundhovercolor={"#5C4EE5"}
              fontcolor={"#5C4EE5"}
              fonthovercolor={"white"}
              bordercolor={"#5C4EE5"}
              borderhovercolor={"#5C4EE5"}
              onclickelement={this.on_click_button.bind(this, bottom_button_left.name)} />
          </div>
          <div className="grid-block bottom_bar_right">
            <PlComponentButtonCircleSelectable
              text={""}
              icon={bottom_button_right.icon}
              backgroundcolor={"transparent"}
              backgroundhovercolor={"#5C4EE5"}
              backgroundselectedcolor={"#5C4EE5"}
              fontcolor={"#5C4EE5"}
              fonthovercolor={"white"}
              fontselectedcolor={"white"}
              bordercolor={"#5C4EE5"}
              borderhovercolor={"#5C4EE5"}
              borderselectedcolor={"#5C4EE5"}
              selected={bottom_button_right.selected}
              onclickelement={this.on_click_button.bind(this, bottom_button_right.name)} />
          </div>
          {viewer_legend}
        </div>
        <div className="grid-block medium-4">
          {sidebar}
        </div>
      </div>
    );
  }
}