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

import {findWhere} from 'underscore';

export function isObjectEmpty(obj) {
    
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Check if object is numeric
    if(isObjectNumeric(obj)) return false;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export function isObjectAnArray(object) {

    var objectisarray = false;

    if (object.constructor === Array) {
        objectisarray = true;
    }

    return objectisarray;
}

export function isObjectAFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function getKeysOfAnObject(object) {
    return Object.keys(object);
}

export function searchInArrayOfObjects(objectKey, objectKeyValue, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][objectKey] === objectKeyValue) {
            return myArray[i];
        }
    }
}

export function deleteElementFromArray(element, array) {

    //console.log(element);
    var index = array.indexOf(element);

    if (index > -1) {
        array.splice(index, 1);
    }

    return array;

}

export function deleteDuplicatedElementsFromArray(array, duplicated_field, exception) {

    var new_array = [];

    for(var i=0;i<array.length;i++){

        var element = array[i];

        if(element[duplicated_field]!==exception){
            
            var str = {}
            str[duplicated_field]=element[duplicated_field];
            
            if(isObjectEmpty(findWhere(new_array,str))){

                new_array.push(element);
            }
        }else{
            new_array.push(element);
        }
    }

    return new_array;
}

export function deleteElementsFromArray(array_elements_to_delete, array) {

    for (var i = 0; i < array_elements_to_delete.length; i++) {

        array = deleteElementFromArray(array_elements_to_delete[i], array);

    }

    return array;
}

export function getKeysFromObject(object) {

    var arrayOfKeys = [];

    for (var i in object) {

        var key = i;
        arrayOfKeys.push(key);

    }

    return arrayOfKeys;
}

export function isObjectNumeric(object){
    
    var numeric = false;

    if(typeof(object)==="number"){
        
        numeric=true;
    }
    
    return numeric;
}