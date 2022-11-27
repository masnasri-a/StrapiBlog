const Tags = (props: any) => {
  let tags = props.tag;
  let spliter = tags.split(",");
  const handleLink = () => {

  };

  return (
    <>
      <span>Tags : </span>
      <div className="d-flex">
        {spliter.map((detail: any) => {
            let links = "http://localhost:1337/api/wordpresses?filters[tag]="+detail
          return (
            <>
              <div
                className="tags"
              >
                <a href={links}>
                {detail}
                </a>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Tags;
