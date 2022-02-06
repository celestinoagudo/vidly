import React from "react";

const Like = ({ object, onLikeAndUnlike }) => {
  let classes = "fa fa-heart";
  if (!object.isLiked) classes += "-o";

  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={() => {
        onLikeAndUnlike(object);
      }}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
