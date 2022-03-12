import React from "react";
import {Link} from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <div className="user-item__image">
        <Avatar image={props.image} alt={props.name} />
      </div>
      <div className="user-item__info">
        <h2>{props.name}</h2>
        <h2>{props.email}</h2>
        <h2> {"Account verified : "+props.verified}</h2>
      </div>
    </li>
  );
};

export default UserItem;
