import { Button, Menu } from "antd";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Link, Navigate } from "react-router-dom";

const MenuItems = ({
  credentialState,
  handleLogout,
}: {
  credentialState: any;
  handleLogout: any;
}) => {
  const menuItems: MenuProps["items"] = [
    {
      type: "group",
      label: (
        <Link to={`/create`}>
          Create Gist
        </Link>
      ),
    },
    {
      type: "group",
      label: (
        <Link to={`/user/${credentialState?.username}`} reloadDocument={true}>
          <h5>"Signed in as"</h5>
          <h3>{credentialState?.username}</h3>
        </Link>
      ),
      key: "user",
    },
    {
      type: "group",
      label: <Link to={`/user/${credentialState?.username}`}>Your Gists</Link>,
    },
    {
      type: "group",
      label: (
        <Link to={`/user/${credentialState?.username}`}>
          Your Starred Gists
        </Link>
      ),
    },
    {
      type: "group",
      label: <Link to={`/user/${credentialState?.username}`}>Help</Link>,
    },
    {
      type: "group",
      label: (
        <Link to={`/user/${credentialState?.username}`}>
          Your Github Profile
        </Link>
      ),
    },
    {
      type: "group",
      label: (
        <Button onClick={handleLogout} type="link">
          Sign Out
        </Button>
      ),
    },
  ];

  return <Menu items={[...menuItems]} />;
};

export default MenuItems;
