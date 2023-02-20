import fs from "fs";
import os from "os";
import path from "path";
import contentDisposition from "content-disposition";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type Props = {};

export async function getServerSideProps({ query, res }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  // TODO: ファイル名に作成日時を付ける
  const dlFilename = "着券取引先支払_yyyymmddhhiiss.xlsx";
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", contentDisposition(dlFilename));

  // baseDirを作成処理と共有する
  const baseDir = path.join(os.tmpdir(), "app", "report");
  const filename = query.filename as string;
  const file = path.join(baseDir, filename);

  const readStream = fs.createReadStream(file);
  await new Promise((resolve) => {
    readStream.pipe(res);
    readStream.on("end", resolve);
  })

  return {
    props: {},
  };
}

export default function Download() {}
