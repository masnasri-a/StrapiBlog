import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const handleSlug = async () => {
    await axios
      .get("http://localhost:1337/api/wordpresses?pagination%5Blimit%5D=100&fields=title%2Cslug")
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
