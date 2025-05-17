import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../../assets/css/MainJopList.css";
import JopList from "./JopList";

export default function MainJopList() {
  return (
    <div className="card-container">
      <Tabs className="tabs-container">
        {/* 탭 + 버튼을 한 줄에 묶는 래퍼 */}
        <div className="tabs-header">
          <TabList className="search">
            <Tab>전체 공고</Tab>
            <Tab>관심 공고</Tab>
          </TabList>
          <button className="tab-action-button">검색하기</button>
        </div>

        <TabPanel>
          <JopList type="all" />
        </TabPanel>
        <TabPanel>
          <JopList type="favorite" />
        </TabPanel>
      </Tabs>
    </div>
  );
}
