import axios from "axios";
import { useEffect, useState } from "react";

const SeeOther = (props:any) => {
    const [data, setData] = useState<any[]>([])

    const handleLoad = async() =>{
        await axios.get('http://localhost:1337/api/wordpresses?pagination%5BwithCount%5D=false&pagination%5Blimit%5D=3&fields=title%2C%20slug').then((resp)=>{
            resp.data.data.map((detail:any) => {
                console.log(detail.attributes);
                setData(old => [...old, detail.attributes])
            })
            
        })
    }

    if (props.url){
        
    }

    useEffect(()=>{
        handleLoad()
    },[])

    return(
        <>
        <div className="CardListSeeOther">
        <p>Baca Juga : </p>
            {
                data.map((detail:any)=>{
                    let url = "/post/"+detail.slug
                    return(
                        <>
                        <div className="d-flex">
                            
                            <a href={url}>{detail.title}</a>
                        </div>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}

export default SeeOther;