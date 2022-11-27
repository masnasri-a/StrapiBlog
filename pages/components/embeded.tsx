import { InstagramEmbed, FacebookEmbed, TikTokEmbed, TwitterEmbed, YouTubeEmbed } from "react-social-media-embed";

const EmbededSocmed = (props: any) => {
  let embed = <></>;
  if (props.type == "instagram") {
    embed = (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <InstagramEmbed
          url={props.url}
          width={328}
        //   captioned
        />
      </div>
    );
  }else if (props.type == "facebook"){
    embed = (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FacebookEmbed
            url={props.url}
            width={328}
          //   captioned
          />
        </div>
      );
  }else if (props.type == "tiktok"){
    embed = (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TikTokEmbed
            url={props.url}
            width={328}
          //   captioned
          />
        </div>
      );
  }else if (props.type == "twitter"){
    embed = (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TwitterEmbed
            url={props.url}
            width={328}
          //   captioned
          />
        </div>
      );
  }else if (props.type == "youtube"){
    embed = (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <YouTubeEmbed
            url={props.url}
            width={328}
          //   captioned
          />
        </div>
      );
  }
  return <>
  {
    embed
  }
  </>;
};

export default EmbededSocmed;
