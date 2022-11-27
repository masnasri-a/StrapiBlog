import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Author = () => {
  const router = useRouter();
  const { tag } = router.query;
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get(
        "http://localhost:1337/api/wordpresses?filters%5Btags%5D[$contains]=" + tag
      )
      .then((resp) => {
        console.log(resp.data);

        setData(resp.data.data);
      });
  };

  useEffect(() => {
    const fetchSomething = async () => {
      await fetch(`/tag/${tag}`).then((resp: any) => {
        console.log(resp);
        handleSlug();
      });
      handleSlug();
    };
    fetchSomething();
  }, []);
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
