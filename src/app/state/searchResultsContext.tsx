import { FunctionComponent, 
         PropsWithChildren, 
         ReactElement, 
         ReducerStateWithoutAction, 
         ReducerWithoutAction, 
         createContext, 
         useContext, 
         useReducer } from "react";
import { details } from "../interfaces/details";
import { SearchResultsAction } from "../interfaces/searchResultsAction";


/**
 * @exports
 * @constant
 * @name SearchResultsContext
 * @description Creates a new state context for managing search results
 * @returns none
 */
export const SearchResultsContext = createContext<Array<details>>([]);


/**
 * @exports
 * @constant
 * @name SearchResultsDispatchContext
 * @description Creates a new state context for managing search related actions
 * @returns none
 */
export const SearchResultsDispatchContext = createContext<any | null>(null);


/**
 * @exports
 * @constant
 * @name SearchProvider
 * @param param children
 * @description  Creates a ContextProvider for search related state to be managed through  
 *               with use of the useReducer hook
 * @returns any
 */
export const SearchProvider: FunctionComponent<PropsWithChildren> = ({ children }: any): ReactElement<any> => {
    const [results, dispatch] = useReducer(
        searchResultsReducer,
        initialSearch
    )

    return(
        <SearchResultsContext.Provider value={results}>
            <SearchResultsDispatchContext.Provider value={dispatch}>
                {children}
            </SearchResultsDispatchContext.Provider>
        </SearchResultsContext.Provider>
    );
}


/**
 * @exports
 * @constant
 * @type Function
 * @name useSearchResults
 * @description Returns the SearchResultsContext allowing its state related
 *              content to be accessible
 * @returns Array<details>
 */
export const useSearchResults: Function = (): Array<details> => {
    return useContext(SearchResultsContext);
}


/**
 * @exports
 * @constant
 * @type Function
 * @name useSearchResultsDispatch
 * @description Returns the SearchResultsDispatchContext allowing its state related
 *              content to be accessible
 * @returns any
 */
export const useSearchResultsDispatch: Function = (): any => {
    return useContext(SearchResultsDispatchContext);
}


/**
 * @constant
 * @type Function
 * @name mapFieldsToResults
 * @param searchTerm string
 * @param fields Array<details>
 * @description   Takes the array of completed data entry for the user details and
 *                filters those down to entries that match, if any, the supplied
 *                search term
 * @returns Array<details>
 */
const mapFieldsToResults: Function = (searchTerm: string, fields: Array<details>): Array<details> => {
    const data   = [...fields];
    return data.filter((el: details) => {
        return el.firstName === searchTerm || el.surname === searchTerm
    });
}


/**
 * @exports
 * @constant
 * @name searchResultsReducer
 * @param results Array<details> | null
 * @description Manages the state related actions required for the search functionality
 * @param action SearchResultsAction
 * @returns any
 */
export const searchResultsReducer = (results: Array<details | null>, action: SearchResultsAction): any => {
    switch (action.type) {
        case 'SEARCH_RESULTS': {
            const res = mapFieldsToResults(action.needle, action.fields);
            results = [...res];
            return results;
        }

        case 'RESET_SEARCH': {
            results = [];
            return results;
        }
    }
}


/**
 * @exports
 * @constant
 * @name initialSearch
 * @type Array<undefined>
 * @description Defines the initial state value for the search related functionality 
 */
export const initialSearch: Array<undefined> = [];