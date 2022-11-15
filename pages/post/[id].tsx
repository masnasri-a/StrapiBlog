import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = () => {
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    const [postDate, setPostDate] = useState("")
    const [creator, setCreator] = useState("")
  const router = useRouter();
  const { id } = router.query;
  
  const handleContent = async() => {
    await axios.get('http://103.176.79.228:1337/api/wordpresses?filters[slug]='+id).then((resp)=> {
        let attr = resp.data.data[0]['attributes']
        setContent(attr['content_encoded'])
        setTitle(attr['title'])
        setPostDate(attr['pubDate'])
        setCreator(attr['dc_creator'])
    })
  }

  useEffect(() => {
    handleContent()

  }, []);
  return (
    <div className="PostData"> 
    <p className="TitlePost">{title} </p>
    <p>Author by {creator} at {postDate}</p>
    <p className="ContentPost">{content}</p>
    </div>
  );
};

export default Post;
