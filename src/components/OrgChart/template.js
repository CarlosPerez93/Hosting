import React from "react";


export const NodeUser = ({ nodeData }) => {
  return (
    <div className="node-user cursor-pointer" >
      <div className="circular--landscape">
        <img alt={nodeData?.name} src={nodeData?.urlImage ? nodeData?.urlImage : "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_960_720.png"} />
      </div>
      <div className="fullname">{nodeData?.name}</div>
      <div className="flex justify-between items-center my-5">
        {/*         <div className="position">{nodeData?.reference}</div>
 */}     {
          nodeData?.relationship && <> <span className="point" ></span>
            <div className="state">{nodeData?.relationship}</div> </>
        }
      </div>
      <div className="date" > Vinculacion:<span> {nodeData?.registerDate?.slice(0, 10)} </span> </div>
      <div className="date"> Email:<span> {nodeData?.email} </span> </div>
    </div>
  );
};


