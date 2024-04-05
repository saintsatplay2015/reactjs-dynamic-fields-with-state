import InputComponent from "./InputComponent";
import { useFields, useFieldsDispatch } from "../state/fieldsContext";
import { details } from "../interfaces/details";
import { FunctionComponent } from "react";


/**
 * @exports
 * @default
 * @constant
 * @name ListComponent
 * @type FunctionComponent
 * @description   Generates a list of input fields for data entry
 * @returns JSX.Element
 */
const ListComponent: FunctionComponent = (): JSX.Element => {
    const fields: Array<details>    = useFields();
    const dispatch                  = useFieldsDispatch();

    return (
        <div className="details">

            <div className="details__caption">
                <h1>Personnel Details</h1>
            </div>
            <div className="details__head">
                <div className="details__head--column">
                    <strong>First name</strong>
                </div>
                <div className="details__head--column">
                    <strong>Surname</strong>
                </div>
                <div className="details__head--column">
                    <strong>Email</strong>
                </div>
                <div className="details__head--column">
                    <strong>Gender</strong>
                </div>
                <div className="details__head--column">
                    <strong>Remove</strong>
                </div>
            </div>
            {fields.map((field: details, index: number) => {
                return (
                <div className="details__row" key={index}>
                    <InputComponent
                        type='text'
                        columnName='firstName'
                        placeholder='Enter your first name...'
                        columnValue={field.firstName}             
                        onChange={(val: string) => {
                            dispatch({
                                type: 'FIELD_EDITED',
                                fields: {
                                    ...field,
                                    firstName: val                                  
                                }
                            })
                        }} />
                    <InputComponent
                        type='text'
                        columnName='surname'
                        placeholder='Enter your surname...'
                        columnValue={field.surname}                   
                        onChange={(val: string) => {
                            dispatch({
                                type: 'FIELD_EDITED',
                                fields: {
                                    ...field,
                                    surname: val                                  
                                }
                            })
                        }} />
                    
                    {/* Email Input */}
                    <InputComponent
                        type='email'
                        columnName='email'
                        placeholder='Enter your email address...'
                        columnValue={field.email}                   
                        onChange={(val: string) => {
                            dispatch({
                                type: 'FIELD_EDITED',
                                fields: {
                                    ...field,
                                    email: val                                
                                }
                            })
                        }} />
                    <InputComponent
                        type='text'
                        columnName='gender'
                        placeholder='Male or female?'
                        columnValue={field.gender}                   
                        onChange={(val: string) => {
                            dispatch({
                                type: 'FIELD_EDITED',
                                fields: {
                                    ...field,
                                    gender: val                                  
                                }
                            })
                        }} />
                    <div className="column">
                        <button 
                            className="red"
                            type="button" 
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            dispatch({
                                type: 'ROW_DELETED',
                                id: field.id   
                            });
                        }}>Remove</button>
                    </div>
                </div>
                )            
            })}
            <div className="details__footer">
                <div className="details__footer--column"></div>
                <div className="details__footer--column"></div>
                <div className="details__footer--column"></div>
                <div className="details__footer--column"></div>
                <div className="details__footer--column">
                    <button 
                        type="button"
                        className="submit"
                        onClick={() => {
                            dispatch({
                                type: 'FORM_SUBMITTED' 
                            })
                        }}>Submit form</button>
                </div>
            </div>
        </div>
    );
}

export default ListComponent;