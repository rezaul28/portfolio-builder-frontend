import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  console.log(props);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      <UserItem
        key={props.items._id}
        id={props.items._id}
        image={"https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"}
        name={props.items.name}
        email = {props.items.email}
        // placeCount={props.items.user.places.length}
      />
    </ul>
  );
};

export default UsersList;
