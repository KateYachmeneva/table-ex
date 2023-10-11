import data from "../../data/data.js";
import TableTwo from "../Table/TableTwo";
import TableOne from "../Table/TableOne";
import Table from "../Table/Table";
function App() {
    return (
      <div>
    
        <TableTwo data = {data}/>       
         {/* <TableOne data = {data}/>  */}
         {/* <Table data = {data}/>       */}
           </div>
    );
  }
  
  export default App;