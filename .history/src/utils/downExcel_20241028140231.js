import XLSX from "xlsx"
import FileSaver from "file-saver"
export default function downExcel(tableiId,tableName, routeName) {
  var xlsxParam = { raw: true }
  let fix = document.querySelector(`.`)
  console.log(fix)
  let wb
  if (fix) {
    wb = XLSX.utils.table_to_book(
      document.querySelector(`#${tableiId}`).removeChild(fix),
      xlsxParam
    )
    document.querySelector(`#${tableiId}`).appendChild(fix)
  } else {
    wb = XLSX.utils.table_to_book(
      document.querySelector(`#${tableiId}`),
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
      console.error('Failed to save file:', e)
    }
  }
  return wbout
}
