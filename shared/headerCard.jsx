const HeaderCard = ({ header, body, footer, icon }) => {
  return (
    <div className="card-items w-full lg:w-[30%] border-subtext border-dashed border-2 rounded px-2 py-2 shadow cursor-pointer">
      <div className="card-header flex flex-wrap">
        <h1 className="text-primary font-semibold text-xl">{header}</h1>
      </div>

      <div className="card-body">
        <h1 className="font-bold text-accent text-2xl uppercase tracking-wider">
          <i className={`fa-solid ${icon}`}></i> {body}
        </h1>
      </div>

      <div className="card-footer">{footer}</div>
    </div>
  );
};

export default HeaderCard;
