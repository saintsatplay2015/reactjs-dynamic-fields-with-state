import FieldComponent from "./FieldComponent";
import { useSearchResults } from "../state/searchResultsContext";
import { details } from "../interfaces/details";
import { FunctionComponent } from "react";


/**
 * @exports
 * @constant
 * @default
 * @type FunctionComponent
 * @name SearchResults
 * @description  Renders any search results returned from state for the
 *               user supplied search term
 * 
 * @returns JSX.Element
 */
const SearchResults: FunctionComponent = (): JSX.Element => {
    const results: Array<details>   = useSearchResults();

    return (
        <div>
            {results.length > 0 ? (
                <div className="results">
                    <div className="results__caption">
                        <h1>Search results</h1>
                    </div>
                    <div className="results__head">
                        <div className="results__head--column">
                            <strong>First name</strong>
                        </div>
                        <div className="results__head--column">
                            <strong>Surname</strong>
                        </div>
                        <div className="results__head--column">
                            <strong>Email</strong>
                        </div>
                        <div className="results__head--column">
                            <strong>Gender</strong>
                        </div>
                    </div>
                {results.map((result: any, index: number) => {
                    return (
                        <div className="results__row" key={index}>
                            <FieldComponent
                                type='text'
                                columnName='firstName'
                                placeholder='Enter your first name...'
                                columnValue={result.firstName} />
                            <FieldComponent
                                type='text'
                                columnName='surname'
                                placeholder='Enter your surname...'
                                columnValue={result.surname} />
                            <FieldComponent
                                type='email'
                                columnName='email'
                                placeholder='Enter your email address...'
                                columnValue={result.email}  />
                            <FieldComponent
                                type='text'
                                columnName='gender'
                                placeholder='Male or female?'
                                columnValue={result.gender} />
                        </div>
                    )
                })}
                </div>
             ) : (
                <div></div>
            )}
        </div>
    )
}

export default SearchResults;