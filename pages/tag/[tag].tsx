import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Author = () => {
  const router = useRouter();
  let tag:any;
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    let  links = await "http://0.0.0.0:1337/api/wordpresses?filters%5Btag%5D[$contains]=" + tag
    await axios
      .get(
        links
      )
      .then((resp) => {
        console.log(resp.data);
        console.log(links);
        
        setData(resp.data.data);
      });
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
        tag = router.query.tag;
        console.log(tag);
      }
    const fetchSomething = async () => {
      await fetch(`/tag/lucu`).then((resp: any) => {
        console.log(resp);
        // handleSlug();
      });
      handleSlug();
    };
    fetchSomething();
  }, [router.isReady]);
  return (
    <>
      <span>List Article from Tag {tag}</span>
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
