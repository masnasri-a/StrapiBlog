const Captions = (props: any) => {
  let re = /\<(.*?)\>/g;
  let datas = props.datas;

  let images = datas.match(re);
  console.log(images[0]);
  let spliter = datas.split("> ");
  console.log(spliter[1]);

  return (
    <>
      <div className="card">
        <div dangerouslySetInnerHTML={{ __html: images[0] }} />
        <span>{spliter[1]}</span>
      </div>
    </>
  );
};
export default Captions;
