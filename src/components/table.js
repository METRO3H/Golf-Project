import Table_HTML from "../views/table.html";
import "../styles/table.css";
import { Stat_Name, Stat_Value } from "../constants/values.js";

export default function () {
  const table_div = document.createElement("div")
  table_div.innerHTML = Table_HTML

  for (let Name of Stat_Name) {
    let Stats_Length = Object.keys(Stat_Value[Name]).length;

    for (let i = 0; i < Stats_Length; i++) {
        let Cell_ID = `${Name}_${i}`
        let cell = table_div.querySelector("#" + Cell_ID)
        cell.textContent = Stat_Value[Name][i] 
    }
  }
  return table_div
}
