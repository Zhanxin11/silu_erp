import XLSX from "xlsx"
import FileSaver from "file-saver"
export default function downExcel(tableName, routeName) {
  var xlsxParam = { raw: true }
  let fix = document.querySelector(`#${tableName}`)
  let wb
  if (fix) {
    wb = XLSX.utils.table_to_book(
      document.querySelector("#table_out").removeChild(fix),
      xlsxParam
    )
    document.querySelector("#table_out").appendChild(fix)
  } else {
    wb = XLSX.utils.table_to_book(
      document.querySelector("#table_out"),
      xlsxParam
    )
  }
  console.log(wb)
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    // bookSST: true,
    type: "array",
  })
  try {
    let fileName = `${routeName || 'default'}-${new Date().toISOString().replace(/:/g, '-')}.xlsx`
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      fileName
    )
  } catch (e) {
    if (typeof console !== "undefined") {
    }
  }
  return wbout
}
