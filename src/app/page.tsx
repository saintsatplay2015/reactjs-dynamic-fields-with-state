"use client";
import AddFieldsComponent from "./components/AddFieldsComponent";
import ListComponent from "./components/ListComponent";
import { FieldsProvider } from "./state/fieldsContext";
import SearchField from "./components/SearchFieldComponent";
import { SearchProvider } from "./state/searchResultsContext";
import SearchResults from "./components/SearchResultsComponent";

export default function Home(): JSX.Element {

  return (
    <main>  
      <FieldsProvider>    
        <SearchProvider>
          {/* IMPORTANT: For context to work, there must be a context provider 
              higher up the component tree than the component that's trying to 
              consume context. 
              
              Placing the SearchField component within SearchProvider ensures that 
              the state is able to be managed through the context provider */}
          <SearchField/>
          <SearchResults />
        </SearchProvider>
      
        <ListComponent />
        <AddFieldsComponent />
      </FieldsProvider>
    </main>
  );
}
