import { FunctionComponent, useRef } from "react";
import { useSearchResultsDispatch } from "../state/searchResultsContext";
import { useFields } from "../state/fieldsContext";
import { details } from "../interfaces/details";

/**
 * @exports
 * @default
 * @constant
 * @name SearchField
 * @type FunctionComponent
 * @description   Creates the Search Field component and manages dispatching of
 *                state for search related queries and resetting searches
 * @returns JSX.Element
 */
const SearchField: FunctionComponent = (): JSX.Element => {
    let searchRef                   = useRef<HTMLInputElement | null>(null);
    const dispatch                  = useSearchResultsDispatch();
    const fields: Array<details>    = useFields();
    return (
        <div className="search">
            <div className="search__input">
                <input
                    className="grey"
                    placeholder="Search for a name..."
                    ref={searchRef}
                    type="search"
                    required />
            </div>
            <div className="search__action">
                <button 
                    type="button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.preventDefault();
                        const keyword = searchRef.current?.value;
                        if (keyword !== '') {
                            dispatch({
                                type: 'SEARCH_RESULTS',
                                needle: keyword,
                                fields: [...fields]
                            })   
                        }                    
                    }}>Search</button>
            </div>
            <div className="search__action">
                <button 
                    className="red"
                    type="reset"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.preventDefault();
                        searchRef.current.value = '';
                        dispatch({
                            type: 'RESET_SEARCH'
                        }) 
                    }}>Clear</button>
            </div>
        </div>
    )
};

export default SearchField;