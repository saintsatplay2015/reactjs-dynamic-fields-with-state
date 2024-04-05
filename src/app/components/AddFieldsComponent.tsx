import { FunctionComponent } from "react";
import { useFields, useFieldsDispatch } from "../state/fieldsContext";
import { details } from "../interfaces/details";


/**
 * @exports
 * @default
 * @constant
 * @name AddFieldsComponent
 * @type FunctionComponent
 * @description  Renders a button which triggers state to add a new row for data entry
 * @returns JSX.Element
 */
const AddFieldsComponent: FunctionComponent = (): JSX.Element => {
    const dispatch  = useFieldsDispatch();
    const fields    = useFields();
    return (
        <div className="add">
            <div className="add_column">
                <button 
                    type="button" 
                    onClick={() => {  
                        if (rowHasValues(fields)) {                      
                            dispatch({
                                type: 'ROW_ADDED',
                                fields: {
                                    id: Date.now(),
                                    firstName: '',
                                    surname: '',
                                    email: '',
                                    gender: ''
                                }
                            })
                        }
                    }}>Add new row</button>
            </div>
            <div className="add_column"></div>
            <div className="add_column"></div>
            <div className="add_column"></div>
            <div className="add_column"></div>
            <div className="add_column"></div>
        </div>
    )
}


/**
 * @constant
 * @name rowHasValues
 * @type Function
 * @param fields Array<details| null>
 * @description  Takes the fields state object and determines if data has been entered
 *               into the last array item
 * @returns boolean
 */
const rowHasValues: Function = (fields: Array<details | null>): boolean => {
    const lastRow   = fields.length - 1;
    let hasValues   = false;
    if (fields[lastRow]?.firstName !== '' &&
        fields[lastRow]?.surname !== '' &&
        fields[lastRow]?.email !== '' &&
        fields[lastRow]?.gender !== '') {
            hasValues = true;
    }
    return hasValues;
}


export default AddFieldsComponent;