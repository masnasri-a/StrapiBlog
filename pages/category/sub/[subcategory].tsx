import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SubCategory = () => {
  const router = useRouter();
  let subcategory:any;
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get(
        "http://" +
          process.env.NEXT_PUBLIC_STRAPI_HOST +
          ":1337/api/articles?filters[sub_category][sub_category_name][$contains]=" +
          subcategory +
          "&populate=*"
      )
      .then((resp) => {
        console.log(resp.data);

        setData(resp.data.data);
      });
  };


  useEffect(() => {
    if (router.asPath !== router.route) {
      subcategory = router.query.subcategory;
      console.log(subcategory);
    }
    const fetchSomething = async () => {
      await fetch(`/category/sub/${subcategory}`).then((resp: any) => {
        handleSlug();
      });
      handleSlug();
    };
    fetchSomething();
  }, [router.isReady]);
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
