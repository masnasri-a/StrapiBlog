import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get("http://103.176.79.228:1337/api/wordpresses?fields=title%2C%20slug")
      .then((resp) => {
        setData(resp.data.data);
      });
  };

  useEffect(() => {
    handleSlug();
  }, []);
  return (
    <>
      <div className="menu d-flex flex-column">
        {data.map((detail: any, index) => {
          let attr = detail["attributes"];
          let title = attr["title"];
          let slug = attr["slug"];

          console.log("attr = ", title);

          return (
            <div className="cardPost" key={index}>
              <Link href={"/post/" + slug}>{title}</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
