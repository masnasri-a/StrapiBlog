import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SubCategory = () => {
  const router = useRouter();
  const { subcategory } = router.query;
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get(
        "http://0.0.0.0:1337/api/wordpresses?filters[sub_category]=" + subcategory
      )
      .then((resp) => {
        console.log(resp.data);

        setData(resp.data.data);
      });
  };

  useEffect(() => {
    const fetchSomething = async () => {
      await fetch(`/category/sub/${subcategory}`).then((resp: any) => {
        handleSlug();
      });
      handleSlug();
    };
    fetchSomething();
  }, []);
  return (
    <>
      <span>List Article bySub Category {subcategory}</span>
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

export default SubCategory;
