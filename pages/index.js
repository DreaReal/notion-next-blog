import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { Client } from "@notionhq/client";
import Entry from "../components/Entry";
import Nav from "../components/Nav";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default function Home({ entries }) {
  return (
    <>
      <Head>
        <title>Alex - Blog</title>
        <meta name="description" content="Alex's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className={styles.container}>
        <section className={styles.entries}>
          {entries.length == 0 && "There are no entries"}
          {entries.map((entry, key) => {
            return <Entry key={key} data={entry} />;
          })}
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const entries = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });

  const mappedEntries = entries.results
    .map((entry) => {
      const { properties } = entry;
      const { name, description, tags, visible, niceUrl, hideInList } = properties;

      return {
        name: name.title,
        description: description.rich_text,
        tags: tags.multi_select,
        id: entry.id,
        visible: visible.checkbox,
        niceUrl: niceUrl.rich_text[0].plain_text,
        hideInList: hideInList?.checkbox
      };
    })
    .filter((entry) => entry.visible == true && entry.hideInList == false);

  return {
    props: {
      entries: mappedEntries ?? [],
    },
  };
}
