import { FC } from "react";
import Head from "next/head";

interface Props {
  title: string;
  metaDescription: string;
}

const HelmetLayout: FC<Props> = ({ children, title, metaDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default HelmetLayout;
