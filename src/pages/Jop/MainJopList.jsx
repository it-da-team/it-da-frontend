// src/pages/Jop/MainJopList.jsx
import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../../assets/css/MainJopList.css";
import JopList from "./JopList";

export default function MainJopList({ categoryEnum }) {
  return (
    <div className="card-container">
      <Tabs className="tabs-container">
        <div className="tabs-header">
          <TabList className="search">
            <Tab>전체 공고</Tab>
            <Tab>관심 공고</Tab>
          </TabList>
          <button className="tab-action-button">검색하기</button>
        </div>

        <TabPanel>
          <JopList type="all" categoryEnum={categoryEnum} />
        </TabPanel>
        <TabPanel>
          <JopList type="favorite" categoryEnum={categoryEnum} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
