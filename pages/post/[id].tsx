import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Iframely from "../components/iframely";
import EmbededSocmed from "../components/embeded";
import SeeOther from "../components/seeother";
import Captions from "../components/caption";
import Tags from "../components/tags";

const Post = () => {
  const [content, setContent] = useState("");
  const [test, setTest] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [tagsData, setTagsData] = useState("");
  const [postDate, setPostDate] = useState("");
  const [creator, setCreator] = useState("");
  const router = useRouter();
  const { id } = router.query;
  let number = 0;

  const textDOM = (data: any) => {
    if (data.includes("dn_readmore_list")){
      setTest((old) => [
        ...old,
        <SeeOther/>
      ])
    }else if(data.includes("dn_readmore_image")){
      var urlRegex = /((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/g;
      let links = data.match(urlRegex)
      setTest((old) => [
        ...old,
        <Iframely url={links[0]}/>
      ])
    }
    else{
      let spaces = data.split(" ")
      spaces.map((details:any)=>{
        if (details.substring(0,5)=="https"){
          SosmedParser(details)
          data.replace(details,' ')
          return;
          // console.log("gttps = "+details);
        }
      })

      if (data.includes("caption")){
        return;
      } 
      if(data.substring(0,5).includes("<img")){
        setTest((old) => [
          ...old,
        <Captions datas={data} />])
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
    if (data.includes("instagram")) {
      setTest((old) => [...old, <EmbededSocmed type="instagram" url={data} />]);
    } else if (data.includes("twitter")) {
      setTest((old) => [...old, <EmbededSocmed type="twitter" url={data} />]);
    } else if (data.includes("tiktok")) {
      setTest((old) => [...old, <EmbededSocmed type="tiktok" url={data} />]);
    } else if (data.includes("facebook")) {
      setTest((old) => [...old, <EmbededSocmed type="facebook" url={data} />]);
    } else if (data.includes("youtube")) {
      setTest((old) => [...old, <EmbededSocmed type="youtube" url={data} />]);
    }
  };

  const spliterTag = (data: any) => {
    let splits = data.split("\n");
    splits.map((detail: any) => {
      if (detail.substring(0, 5) == "https") {
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
    await axios
      .get("http://localhost:1337/api/wordpresses?filters[slug]=" + id)
      .then((resp) => {
        let attr = resp.data.data[0]["attributes"];

        let splitter = attr["content_encoded"].split("</p>");
        splitter.map((detail: any) => {
          handleParsing(detail + "</p>");
        });
        setContent(attr["content_encoded"]);
        setTitle(attr["title"]);
        setPostDate(attr["pubDate"]);
        setCreator(attr["dc_creator"]);
        setTagsData(attr["tag"])
      });
  };

  useEffect(() => {
    handleContent();
  }, []);
  return (
    <div className="PostData">
      <p className="TitlePost">{title} </p>
      <p>
        Author by {creator} at {postDate}
      </p>
      {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} /> */}
      {
        test.map((details:any)=>{
          return(details)
        })
      }
      <Tags tag={tagsData}/>
      <hr />
    </div>
  );
};

export default Post;
