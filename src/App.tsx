import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import { Root } from "./Root";
import Qr from "./Qr";
import Connections from "./Connections";
import CreateQuest from "./components/CreateQuest/CreateQuest";
import AllQuests from "./components/Quests/AllQuests";
import MyQuests from "./components/Quests/MyQuests";
import MyQuestInvitations from "./components/QuestInvitations/MyQuestInvitations";
import QuestDetails from "./components/QuestDetails/QuestDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/qr",
        element: <Qr />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
      {
        path: "/new-quest",
        element: <CreateQuest />,
      },
      {
        path: "/create-quest",
        element: <CreateQuest />,
      },
      {
        path: "/quests",
        element: <AllQuests />,
      },
      {
        path: "/all-quests",
        element: <AllQuests />,
      },
      {
        path: "/my-quests",
        element: <MyQuests />,
      },
      {
        path: "/incoming-invitations",
        element: <MyQuestInvitations />,
      },
      {
        path: "/quest-details",
        element: <QuestDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
