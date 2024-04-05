import React, { FunctionComponent, PropsWithChildren } from "react"; 
import { InputParams } from "../interfaces/inputParams";


/**
 * @exports
 * @default
 * @constant
 * @name FieldComponent
 * @type FunctionComponent<PropsWithChildren<InputParams>>
 * @param type string
 * @param columnName string 
 * @param placeholder string 
 * @param columnValue string 
 * @description   Provides a non-editable column, per field name, for the search results 
 *                to be displayed with
 * @returns JSX.Element
 */
const FieldComponent: FunctionComponent<PropsWithChildren<InputParams>> = ({ type, columnName, placeholder, columnValue }): JSX.Element => {
    return(
      <div className="column">
        {columnValue !== '' ? (
        <input 
          className="blank"
          type={type}
          name={columnName}
          placeholder={placeholder}
          value={columnValue}
          readOnly />
        ) : (
          <div className="placeholder">No value for {columnName}</div>
        )}
      </div>
    )
};

export default FieldComponent;