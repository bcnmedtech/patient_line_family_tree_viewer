
export function update_family_from_text_field_editable(edited_name, edited_id, original_id, family) {

    var new_data;
    family.name = edited_name;

    if (original_id === edited_id) {

        family.id = original_id;
        new_data = family;

    } else if (original_id !== edited_id) {

        family.id = edited_id;
        new_data = { "id_family_to_remove": original_id, "family_to_update": family };
    
    }

    return new_data;

}