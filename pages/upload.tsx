import axios from "axios";
import { useState } from "react";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [creator, setCreator] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const handlePost = async() =>{
        if (title == ""){
            alert('title is required')
        }else if (creator == ""){
            alert('creator is required')
        }else if (description == ""){
            alert('description is required')
        }else if (content == ""){
            alert('content is required')
        }else{
            const now = new Date();
            const model = {
                "data": {
                  "title": title,
                  "pubDate": now.toLocaleDateString(),
                  "dc_creator": creator,
                  "description": description,
                  "content_encoded": content,
                  "slug": title.toLowerCase().replace(/ /g,'-')
                }
              }
              await axios.post('http://'+process.env.NEXT_PUBLIC_STRAPI_HOST+':1337/api/articles',model).then((resp)=> {
                alert('post success')
              }).catch((err)=> {
                alert('failed')
              })
              
        }


    }
  return (
    <>
      <div className="container">
        <div className="uploadPages">
          <h2>Create a Post</h2>
          <div className="menuUpload">
            <span>Title</span>
            <input type="text" placeholder="title" value={title} onChange={(e)=> setTitle(e.target.value)} />
          </div>
          <div className="menuUpload">
            <span>Creator</span>
            <input type="text" placeholder="creator" value={creator} onChange={(e)=> setCreator(e.target.value)}/>
          </div>
          <div className="menuUpload">
            <span>Description</span>
            <input type="text" placeholder="description" value={description} onChange={(e)=> setDescription(e.target.value)}/>
          </div>
          <div className="menuUpload">
            <span>Content</span>
            <textarea placeholder="content" value={content} onChange={(e)=> setContent(e.target.value)}/>
          </div>
          <button type="submit" onClick={()=> handlePost()}>Publish</button>
        </div>
      </div>
    </>
  );
};

export default Upload;
