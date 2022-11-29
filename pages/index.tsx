import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import MeiliSearch from "meilisearch";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [popularData, setPopularData] = useState<any[]>([]);
  const [pilihanData, setPilihanData] = useState<any[]>([]);
  const [search, setSearch] = useState<any[]>([]);
  const [params, setParams] = useState("");

  const fetchData = async (param: any) => {
    const client = new MeiliSearch({
      host: "http://0.0.0.0:7700",
      apiKey: "MASTER_KEY",
    });
    const index = await client.getIndex("wordpress");
    const booksData = await index.search(params);
    setSearch(booksData.hits);
    console.log(booksData.hits);

    // setData(booksData.hits);
  };

  const handleSlug = async () => {
    await axios
      .get(
        "http://0.0.0.0:1337/api/wordpresses?pagination%5Blimit%5D=100&fields=title%2Cslug"
      )
      .then((resp) => {
        console.log(resp);

        setData(resp.data.data);
      });
  };

  const handleSearch = (param: any) => {
    console.log(param);
    setParams(param);
    fetchData(param);
  };

  const handlePopular = async()=>{
    let url = 'http://0.0.0.0:1337/api/wordpresses?pagination%5BpageSize%5D=5&sort[0]=views%3Adesc'
    await axios
      .get(
        url
      )
      .then((resp) => {
        setPopularData(resp.data.data);
      });
  }

  const handlePilihan = async()=>{
    let url = 'http://0.0.0.0:1337/api/wordpresses?filters[type]=artikel pilihan'
    await axios
      .get(
        url
      )
      .then((resp) => {
        setPilihanData(resp.data.data);
      });
  }


  useEffect(() => {
    handleSlug();
    handlePopular()
    handlePilihan()
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="menu d-flex flex-column">
            <input
              type="text"
              title="Search"
              value={params}
              onChange={(e) => handleSearch(e.target.value)}
            ></input>
            {params ? (
              <>
                {search.map((detail: any, index) => {
                  let slug = detail.slug;
                  let title = detail.title;
                  return (
                    <div className="cardPost" key={index}>
                      <Link href={"/post/" + slug}>{title}</Link>
                    </div>
                  );
                })}
              </>
            ) : (
              data.map((detail: any, index) => {
                let attr = detail["attributes"];
                let title = attr["title"];
                let slug = attr["slug"];
                return (
                  <div className="cardPost" key={index}>
                    <Link href={"/post/" + slug}>{title}</Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="col-lg-4">
        <div className="related">
            <span>Artikel Pilihan</span>
            {
              pilihanData?(pilihanData.map((detail: any, index) => {
                let attr = detail["attributes"];
                let title = attr["title"];
                let slug = attr["slug"];
                
                return (
                  <div className="cardPost" key={index}>
                    <Link href={"/post/" + slug}>{title}</Link>
                  </div>
                );
              })):(
                <></>
              )
            }
          </div>
          <div className="related">
            <span>popular</span>
            {
              popularData?(popularData.map((detail: any, index) => {
                let attr = detail["attributes"];
                let title = attr["title"];
                let slug = attr["slug"];
                
                return (
                  <div className="cardPost" key={index}>
                    <Link href={"/post/" + slug}>{title}</Link>
                  </div>
                );
              })):(
                <></>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
