import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get(
        "http://"+process.env.NEXT_PUBLIC_STRAPI_HOST+":1337/api/wordpresses?filters[category]=" + category
      )
      .then((resp) => {
        console.log(resp.data);

        setData(resp.data.data);
      });
  };

  useEffect(() => {
    const fetchSomething = async () => {
      await fetch(`/category/${category}`).then((resp: any) => {
        console.log(resp);
        handleSlug();
      });
      handleSlug();
    };
    fetchSomething();
  }, []);
  return (
    <>
      <span>List Article Category {category}</span>
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

export default Category;
