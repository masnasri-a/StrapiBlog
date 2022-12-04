import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Iframely from "../components/iframely";
import EmbededSocmed from "../components/embeded";
import SeeOther from "../components/seeother";
import Captions from "../components/caption";
import Tags from "../components/tags";
import MeiliSearch from "meilisearch";
import Image from "next/image";

const Post = () => {
  const [content, setContent] = useState("");
  const [test, setTest] = useState<any[]>([]);
  const [banner, setBanner] = useState("");
  const [title, setTitle] = useState("");
  const [tagsData, setTagsData] = useState("");
  const [postDate, setPostDate] = useState("");
  const [creator, setCreator] = useState("");
  const [search, setSearch] = useState<any[]>([]);

  const router = useRouter();
  let id: any;
  let number = 0;

  const textDOM = (data: any) => {
    if (data.includes("dn_readmore_list")) {
      setTest((old) => [...old, <SeeOther />]);
    } else if (data.includes("dn_readmore_image")) {
      var urlRegex =
        /((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/g;
      let links = data.match(urlRegex);
      setTest((old) => [...old, <Iframely url={links[0]} />]);
    } else {
      let spaces = data.split(" ");
      spaces.map((details: any) => {
        if (details.substring(0, 5) == "https") {
          SosmedParser(details);
          data.replace(details, " ");
          return;
          // console.log("gttps = "+details);
        }
      });

      // if (data.includes("caption")) {
      //   return;
      // }
      if (data.substring(0, 5).includes("<img")) {
        setTest((old) => [...old, <Captions datas={data} />]);
        return;
      }
      setTest((old) => [
        ...old,
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }} />,
      ]);
      // console.log(data);
    }
  };

  const SosmedParser = (data: any) => {
    if (data.includes("<p>") || data.includes("</p>")) {
      var re = /(<\/p>|<p>)/g;
      data = data.replace(re, "");
      console.log(data);
      if (data.includes("instagram")) {
        setTest((old) => [
          ...old,
          <EmbededSocmed type="instagram" url={data} />,
        ]);
      } else if (data.includes("twitter")) {
        setTest((old) => [...old, <EmbededSocmed type="twitter" url={data} />]);
      } else if (data.includes("tiktok")) {
        setTest((old) => [...old, <EmbededSocmed type="tiktok" url={data} />]);
      } else if (data.includes("facebook")) {
        setTest((old) => [
          ...old,
          <EmbededSocmed type="facebook" url={data} />,
        ]);
      } else if (data.includes("youtube") || data.includes("youtu.be")) {
        setTest((old) => [...old, <EmbededSocmed type="youtube" url={data} />]);
      } else {
        setTest((old) => [
          ...old,
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
          />,
        ]);
      }
    } else {
      if (data.includes("instagram")) {
        setTest((old) => [
          ...old,
          <EmbededSocmed type="instagram" url={data} />,
        ]);
      } else if (data.includes("twitter")) {
        setTest((old) => [...old, <EmbededSocmed type="twitter" url={data} />]);
      } else if (data.includes("tiktok")) {
        setTest((old) => [...old, <EmbededSocmed type="tiktok" url={data} />]);
      } else if (data.includes("facebook")) {
        setTest((old) => [
          ...old,
          <EmbededSocmed type="facebook" url={data} />,
        ]);
      } else if (data.includes("youtube") || data.includes("youtu.be")) {
        setTest((old) => [...old, <EmbededSocmed type="youtube" url={data} />]);
      } else {
        setTest((old) => [
          ...old,
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
          />,
        ]);
      }
    }
  };

  const spliterTag = (data: any) => {
    let splits = data.split("\n");
    splits.map((detail: any) => {
      // console.log(detail);
      if (detail.substring(0, 7) == "<figure") {
        let reg = new RegExp(
          /(https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/
        );
        let tests = reg.exec(detail);
        // console.log(tests![0]);
        SosmedParser(tests![0]);
        return;
      }

      if (
        detail.substring(0, 5) == "https" ||
        detail.substring(0, 8) == "<p>https"
      ) {
        SosmedParser(detail);
      } else {
        textDOM(detail);
      }
    });
  };

  const handleParsing = (data: any) => {
    let splits = data.split(/[\[\]]/);
    let result_array = [];
    splits.map((testing: any) => {
      if (
        !testing.includes("<p>") &&
        testing.includes("</p>") &&
        !testing.includes("<p ")
      ) {
        // console.log("<p>" + testing);
        spliterTag("<p>" + testing);
      } else if (!testing.includes("</p>") && testing.includes("<p>")) {
        // console.log(testing + "</p>");
        spliterTag(testing + "</p>");
      } else {
        // console.log(testing);
        spliterTag(testing);
      }
    });
  };

  const handleContent = async () => {
    let links = "http://"+process.env.NEXT_PUBLIC_STRAPI_HOST+":1337/api/articles/" + id + "?populate=*";
    await axios.get(links).then(async (resp) => {
      console.log("links = " + links);
      if (resp.data.data) {
        let attr = resp.data.data["attributes"];
        let views = attr["views"];
        let id = resp.data.data["id"];

        await axios.put("http://"+process.env.NEXT_PUBLIC_STRAPI_HOST+":1337/api/articles/" + id, {
          data: {
            views: views + 1,
          },
        });

        let splitter = attr["content_encoded"].split("</p>");
        splitter.map((detail: any) => {
          handleParsing(detail + "</p>");
        });
        if (attr["Banner"]) {
          let banners = attr.Banner.data.attributes.url;
          setBanner(banners);
        }
        setContent(attr["content_encoded"]);
        setTitle(attr["title"]);
        setPostDate(attr["pubDate"]);
        setCreator(attr["dc_creator"]);
        setTagsData(attr["tag"]);
        handleRelated();
      }
    });
  };
  let linkAuthor = "/author/" + creator;

  const handleRelated = async () => {
    const client = new MeiliSearch({
      host: "http://0.0.0.0:7700",
      apiKey: "MASTER_KEY",
    });
    const index = await client.getIndex("article");
    const booksData = await index.search(title, { limit: 5 });
    setSearch(booksData.hits);
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      id = router.query.id;
      console.log(id);
      handleContent();
    }
  }, [router.isReady]);
  return (
    <div className="PostData">
      <div className="row">
        <div className="col-lg-8">
          <p className="TitlePost">{title} </p>
          {banner ? <Image src={banner} width={900} height={300} alt="banner-blog" /> : <></>}
          <p>
            Author by <a href={linkAuthor}>{creator}</a> at {postDate}
          </p>
          {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} /> */}
          {test.map((details: any) => {
            return details;
          })}
          <Tags tag={tagsData} />
          <hr />
        </div>
        <div className="col-lg-4">
          <div className="related">
            <span>Related Post</span>
            {search.map((detail: any, index) => {
              console.log(detail);

              return (
                <div>
                  <a key={index} href={`/post/` + detail.slug}>
                    {detail.title}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
