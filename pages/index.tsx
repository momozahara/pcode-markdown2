import fs from "fs";

import dynamic from "next/dynamic";

const Renderer = dynamic(() => import("components/renderer"), {
  ssr: false,
});

interface Props {
  data: string;
}

export default function Home({ data }: Props) {
  return (
    <main data-color-mode="light">
      <Renderer data={data} />
    </main>
  );
}

export async function getServerSideProps() {
  let data = fs.readFileSync("md/readme.md", "utf-8");

  return {
    // eslint-disable-next-line object-curly-newline
    props: {
      data: data,
    },
  };
}
