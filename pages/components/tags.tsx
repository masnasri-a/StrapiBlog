const Tags = (props: any) => {
  let tags = props.tag;
  let spliter;
  if (tags) {
    spliter = tags.split(", ");
  }

  const handleLink = () => {};

  return (
    <>
      {spliter ? (
        <>
          <span>Tags : </span>
          <div className="d-flex">
            {spliter.map((detail: any, index:any) => {
              let links =
                "/tag/" + detail;
              return (
                <>
                  <div className="tags" key={index}>
                    <a href={links}>{detail}</a>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Tags;
