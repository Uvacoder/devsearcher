import React from "react";
import Head from "next/head";
import Searchbar from "../components/Searchbar";
import { getAllTopics } from "../api/api";
import { Topic } from "../types";

interface Props {
  topics: Topic[];
}

export default function Page({ topics }: Props): React.ReactElement {
  return (
    <>
      <Head>
        <title>Syntax Recall</title>
        <meta
          name="description"
          content="Search for developer cheatsheets, code examples, tools and more..."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>

      <div className="grid grid-cols-12 min-h-screen">
        <div className="relative col-span-12 sm:col-start-2 sm:col-span-10 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6 xl:col-start-5 xl:col-span-4 min-h-screen">
          <div className="absolute top-1/3 inset-x-0 px-2 sm:px-0">
            <h1 className="text-4xl text-center font-bold mb-4">
              Search Recall
            </h1>
            <Searchbar items={topics} />
            <p className="text-sm text-center mt-4">
              Search for developer cheatsheets, code examples, tools and more...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

interface StaticProps {
  props: StaticProp;
}

interface StaticProp {
  topics: Topic[];
}

export function getStaticProps(): StaticProps {
  const topics = getAllTopics([
    "name",
    "slug",
    "keywords",
    "tags",
    "externalSource",
    "description",
    "metaDescription",
  ]) as Topic[];
  return {
    props: {
      topics,
    },
  };
}
