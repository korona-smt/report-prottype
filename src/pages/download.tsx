import fs from "fs";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

type Props = {};

export async function getServerSideProps({ res }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Despoition", 'attachment; filename="report.xlsx"');

  const readStream = fs.createReadStream("./docs/report.xlsx");
  await new Promise((resolve) => {
    readStream.pipe(res);
    readStream.on("end", resolve);
  })

  return {
    props: {},
  };
}

export default function Download() {}
