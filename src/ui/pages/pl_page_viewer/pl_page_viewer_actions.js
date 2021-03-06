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


import {
    get_family_by_id,
    get_all_patients_and_all_families,
    get_patients_processed,
    get_family_processed,
    order_family_by_ids,
    label_patient_relatives,
    get_family_by_patient,
    get_family_statistics,
    is_this_child_unique
} from './pl_page_viewer_actions/pl_page_viewer_actions_database/pl_page_viewer_actions_database_get';

import {
    edit_patient,
    remove_patient,
    add_child_existing_family,
    add_child_new_family,
    edit_family,
    remove_family,
    export_patient
} from './pl_page_viewer_actions/pl_page_viewer_actions_database/pl_page_viewer_actions_database_update';

//modules
import { format_date } from '../../../modules/rkt_module_date';
import { isObjectEmpty, isObjectAnArray } from '../../../modules/rkt_module_object';

//actions
import {
    treeBuilder,
    siblingsBuilder
} from './pl_page_viewer_actions/pl_page_viewer_actions_d3_tree/pl_page_viewer_actions_d3_tree_creator';

import { findWhere,filter,omit, pluck } from 'underscore';

export function get_data(patient_id, relatives, callback) {

    get_all_patients_and_all_families(function (result) {

        if ("patients" in result) {

            var patients = get_patients_processed(result.patients);
            var patient = findWhere(patients, { id: patient_id });

            get_family_by_id(patient.family_id, function (family) {

                if (isObjectAnArray(family)) {

                    if (family.length > 0) {

                        var data = {};
                   
                        data["family"] = get_family_processed(patients, family[0]);

                        if (data["family"].num_family_members > 0) {

                                if (!isObjectEmpty(patient_id)) {

                                    var patient = findWhere(patients, { id: patient_id });
                                    if ("dob" in patient) patient["dob"] = format_date(patient["dob"]); 

                                    if (!isObjectEmpty(patient)) {

                                        data["patient"] = patient;

                                        if ("father" in patient) {

                                            var father = false;

                                            if (!isObjectEmpty(patient.father)) {

                                                father = findWhere(patients, { id: patient.father });
                                            }

                                            data["father"] = father;

                                        }

                                        if ("mother" in patient) {

                                            var mother = false;

                                            if (!isObjectEmpty(patient.mother)) {

                                                mother = findWhere(patients, { id: patient.mother });

                                            }

                                            data["mother"] = mother;
                                        }

                                        if ("children" in patient) {

                                            var children = [];

                                            if (!isObjectEmpty(patient.children)) {

                                                for (var i = 0; i < patient.children.length; i++) {

                                                    var child = findWhere(patients, { id: patient.children[i] });

                                                    if (!isObjectEmpty(child)) {
                                                        children.push(child);
                                                    }

                                                }

                                                data["children"] = children;

                                            }
                                        }

                                        var array_patients_family;

                                        if (!isObjectEmpty(relatives)) {

                                            var temp_family = get_family_by_patient(patient, result.patients);

                                            if (relatives.length === temp_family.length) {

                                                //Get family ids
                                                var relatives_ids = pluck(relatives, "id");
                                                temp_family = order_family_by_ids(temp_family, relatives_ids);
                                                array_patients_family = temp_family;

                                            } else {

                                                array_patients_family = temp_family;
                                            }

                                        } else {

                                            array_patients_family = get_family_by_patient(patient, result.patients);
                                        }
                                        
                                        label_patient_relatives(patient, array_patients_family);
                                        data["family_statistics"] = get_family_statistics(array_patients_family);
                                        data["root"] = treeBuilder(array_patients_family);
                                        data["relatives"] = array_patients_family;
                                        data["siblings"] = siblingsBuilder(array_patients_family);

                                        callback(data);

                                    } else {
                                        console.log("error");
                                    }

                                } else {

                                    callback(data);
                                }

                        } else {
                            console.log("error");

                        }

                    } else {

                        console.log("error");
                    }

                } else {
                    console.log("error");
                }

            });

        }

    });
}

export function perform_database_action(data, callback) {

    if (!isObjectEmpty(data)) {

        if ("action" in data) {

            if (data.action === "edit_patient") {

                edit_patient(data, function (result) {
                    callback(result);
                })

            } else if (data.action === "remove_patient") {

                //console.log(data);
                //console.log(data.data);

                is_this_child_unique(data.data.to_remove[0], data.data.to_update[0].id,data.data.to_update[1].id,function(result){
                    
                    console.log(result);

                    if(!isObjectEmpty(result)){

                        if(result.child_unique){

                            //Remove all the family of a patient
                            remove_family(result.child_unique, function (result) {
                                callback(result);
                            });
                            
                        }else if(result.child_unique_one_father){

                            //Remove one parent and kit
                            var data_2 = data.data;
                            data_2.to_remove.push(result.child_unique_one_father);
                            data_2.to_update = filter(data_2.to_update,function(item){
                                if(item.id !== result.child_unique_one_father){
                                    return true;
                                }
                            });

                            var next_patient_to_explore;

                            if(data.data.to_update[0].id === result.child_unique_one_father){
                                next_patient_to_explore = data.data.to_update[1].id;
                            }else{
                                next_patient_to_explore = data.data.to_update[0].id;
                            }

                            remove_patient(data_2, function (result) {

                                callback({"patient_id":next_patient_to_explore});
                            });

                        }else{

                            //remove child

                            var next_patient_to_explore = data.data.to_update[0].id;

                            remove_patient(data.data, function (result) {
                                
                                callback({"patient_id":next_patient_to_explore});
                            });
                        }
                    }

                });
                /**/

            } else if (data.action === "add_child_existing_family") {


                add_child_existing_family(data, function (result) {
                    callback(result);
                });


            } else if (data.action === "add_child_new_family") {

                add_child_new_family(data, function (result) {
                    callback(result);
                });

            } else if (data.action === "edit_family") {

                edit_family(data, function (result) {
                    callback(result);
                });

            } else if (data.action === "remove_family") {

                remove_family(data.data, function (result) {
                    callback(result);

                });

            } else if (data.action === "export_patient") {

                export_patient(data);

            }
        }
    }

}



export function format_patient_to_export(patient) {

    var patient_to_export = omit(patient, "depth", "parent", "no_parent", "num_relatives", "relation", "x", "y");
    if ("dob" in patient_to_export) patient_to_export["dob"] = format_date(patient_to_export["dob"]);
    return patient_to_export;

}

