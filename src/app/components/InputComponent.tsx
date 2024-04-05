import React, { FunctionComponent, PropsWithChildren } from "react"; 
import { InputParams } from "../interfaces/inputParams";


/**
 * @exports
 * @default
 * @constant
 * @name InputComponent
 * @type FunctionComponent<PropsWithChildren<InputParams>>
 * @param type string
 * @param columnName string 
 * @param placeholder string 
 * @param columnValue string 
 * @param obChange function callback
 * @description   Provides an editable column, per field name, for the data entry 
 *                to be made/displayed with
 * @returns JSX.Element
 */
const InputComponent: FunctionComponent<PropsWithChildren<InputParams>> = ({ type, columnName, placeholder, columnValue, onChange }): JSX.Element => {
    return(
      <div className="column">
        <input 
          type={type}
          name={columnName}
          placeholder={placeholder}
          value={columnValue}
          minLength={2}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
            onChange(e.currentTarget.value) }} />
      </div>
    )
};

export default InputComponent;