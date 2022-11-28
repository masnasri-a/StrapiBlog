import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Author = () => {
  const router = useRouter();
  let dc_author:any;
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get(
        "http://localhost:1337/api/wordpresses?filters[dc_creator]=" + dc_author
      )
      .then((resp) => {
        console.log(resp.data);

        setData(resp.data.data);
      });
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      dc_author = router.query.dc_author;
      console.log(dc_author);
    }
    const fetchSomething = async () => {
      await fetch(`/author/${dc_author}`).then((resp: any) => {
        console.log(resp);
        handleSlug();
      });
      handleSlug();
    };
    fetchSomething();
  }, [router.isReady]);
  return (
    <>
      <span>List Article</span>
      <>
        <div className="menu d-flex flex-column">
          {data.map((detail: any, index) => {
            let attr = detail["attributes"];
            let title = attr["title"];
            let slug = attr["slug"];
            return (
              <div className="cardPost" key={index}>
                <Link href={"/post/" + slug}>{title}</Link>
              </div>
            );
          })}
        </div>
      </>
    </>
  );
};

export default Author;
