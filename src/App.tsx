import React, { useEffect } from "react";

/*
 * test typings
 */

interface IUser {
  name: string;
  alias: string;
}

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const App = () => {
  const user: IUser = {
    name: "I am",
    alias: "Batman",
  };

  return (
    <div>
      {user.name} is {user.alias}
    </div>
  );
};
