import Table_HTML from "../views/table.html";
import "../../styles/table.css";
import { Stat_Name, Stat_Value } from "../../constants/values.js";

export default function (Parent_Element) {
  Parent_Element.innerHTML = Table_HTML;

  for (let Name of Stat_Name) {
    let Stats_Length = Object.keys(Stat_Value[Name]).length;

    for (let i = 0; i < Stats_Length; i++) {
        let Cell_ID = `(${Name},${i})`
        document.getElementById(Cell_ID).textContent = Stat_Value[Name][i] 
    }
  }
}
