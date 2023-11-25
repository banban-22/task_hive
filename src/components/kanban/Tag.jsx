const Tag = (props) => {
  return (
    <div
      className="w-fit p-2 rounded-lg text-white bg-slate-500"
      style={{ backgroundColor: `${props?.color}` }}
    >
      {props?.tagName}
    </div>
  );
};
export default Tag;
