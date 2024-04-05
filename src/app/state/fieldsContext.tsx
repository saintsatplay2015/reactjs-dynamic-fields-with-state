import { FunctionComponent, PropsWithChildren, ReactElement, createContext, useContext, useReducer } from "react";
import { details } from "../interfaces/details"; 
import { DataEntryAction } from "../interfaces/dataEntryAction";


/**
 * @constant
 * @name FieldsContext
 * @description Creates a new state context for managing data entry
 * @returns none
 */
const FieldsContext = createContext<Array<details>>([]);


/**
 * @exports
 * @constant
 * @name FieldsDispatchContext
 * @description Creates a new state context for managing data entry related actions
 * @returns none
 */
const FieldsDispatchContext = createContext<any | null>(null);


/**
 * @exports
 * @constant
 * @name initialFields
 * @type Array<details>
 * @description Defines the initial state value for the data entry functionality 
 */
export const initialFields: Array<details> = [
    {
        id: Date.now(),
        firstName: '',
        surname: '',
        email: '',
        gender: ''
    }
];


/**
 * @exports
 * @constant
 * @type FunctionComponent<PropsWithChildren>
 * @name FieldsProvider
 * @param param children
 * @description  Creates a ContextProvider for data entry related state to be managed through  
 *               with use of the useReducer hook
 * @returns ReactElement<any>
 */
export const FieldsProvider: FunctionComponent<PropsWithChildren> = ({ children }: any): ReactElement<any> => {
    const [fields, dispatch] = useReducer(
        fieldsReducer,
        initialFields
    );

    return (
        <FieldsContext.Provider value={fields}>
            <FieldsDispatchContext.Provider value={dispatch}>
                {children}
            </FieldsDispatchContext.Provider>
        </FieldsContext.Provider>
    )
}


/**
 * @exports
 * @constant
 * @name useFields
 * @description Returns the FieldsContext allowing its state related
 *              content to be accessible
 * @returns Array<details>
 */
export const useFields = (): Array<details> => {
    return useContext(FieldsContext);
}


/**
 * @exports
 * @constant
 * @name useFieldsDispatch
 * @description Returns the FieldsDispatchContext allowing its state related
 *              content to be accessible
 * @returns any
 */
export const useFieldsDispatch = () => {
    return useContext(FieldsDispatchContext);
}


/**
 * @exports
 * @constant
 * @name fieldsReducer
 * @param fields Array<details>
 * @param action DataEntryAction
 * @description Manages the state related actions required for the data entry functionality
 * @returns any
 */
export const fieldsReducer = (fields: Array<details>, action: DataEntryAction): any => {
    switch (action.type) {
        case 'ROW_ADDED': {
            return [...fields, {
                id: action.fields.id,
                firstName: action.fields.firstName,
                surname: action.fields.surname,
                email: action.fields.email,
                gender: action.fields.gender
            }];
        };
        case 'FIELD_EDITED': {
            return fields.map((field: details) => {
                if (field.id === action.fields.id) {
                    return action.fields;
                } else {
                    return field;
                }
            });
        };
        case 'ROW_DELETED': {
            return fields.filter((field: details) => field.id !== action.id);
        };
        case 'FORM_SUBMITTED': {
            console.dir(fields);
            return fields;
        };
        default: {
            throw Error('Unknown action: ' + action.type);
          }
    }
};