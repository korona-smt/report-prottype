import fs from "fs";
import os from "os";
import path from "path";
import ExcelJS from "exceljs";
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  filename: string;
}

const datas = [
  ["99999", "0", "作品名あたりテキスト", "小牧", "2023/2/9", "", "ﾎｹﾞﾌｶﾞ", "(株)ﾎｹﾞﾌｶﾞ", 1, 1000, "-", 0, undefined, undefined, 1000, "", "", "", ""],
  ["99999", "0", "作品名あたりテキスト", "豊川", "2023/2/9", "", "ﾎｹﾞﾌｶﾞ", "(株)ﾎｹﾞﾌｶﾞ", 2, 2000, "-", 0, undefined, undefined, 2000, "", "", "", ""],
];

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // tmpDirをダウンロード処理と共有する
  const tmpDir = path.join(os.tmpdir(), "app", "report");
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const template = "./docs/report.xlsx";
  const wb = await readXlsx(template);
  const ws = wb.getWorksheet("着券取引先支払");

  datas.forEach(data => {
    ws.addRow(data, "i+");
  });

  ws.spliceRows(2, 1);

  // TODO: ユニークなファイル名
  const filename = "hogehoge.xlsx";
  const file = path.join(tmpDir, filename);
  wb.xlsx.writeFile(file);

  res.status(200).json({ filename });
}

async function readXlsx(file: string) {
  const wb = new ExcelJS.Workbook();
  return wb.xlsx.readFile(file);
}
