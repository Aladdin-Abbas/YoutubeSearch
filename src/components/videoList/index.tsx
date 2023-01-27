import React, { useState } from "react";
import styled from "styled-components";
import filterIcon from "../../assets/images/icons/filter.png";

const VideoList = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <Wrapper>
      <DesktopFilter>
        <FilterWrapper>
          <p>About 13,000,000 filtered results</p>
          <section>
            <img
              src={filterIcon}
              alt="filter"
              height="20px"
              onClick={() => setShowFilter(prevState => !prevState)}
            />
            <span>FILTER</span>
          </section>
        </FilterWrapper>
        {showFilter && (
          <section>
            <CustomSelectWrapper>
              <CustomSelect>
                <select name="type" id="type">
                  <option value="All">All</option>
                  <option value="Video">Video</option>
                  <option value="Channel">Channel</option>
                  <option value="Playlist">Playlist</option>
                  <option value="Movie">Movie</option>
                </select>
                <span></span>
              </CustomSelect>
              <CustomSelect>
                <select name="uploadDate" id="uploadDate">
                  <option value="AnyTime">Any time</option>
                  <option value="Today">Today</option>
                  <option value="ThisWeek">This week</option>
                  <option value="ThisMonth">This month</option>
                  <option value="ThisYear">This year</option>
                </select>
                <span></span>
              </CustomSelect>
            </CustomSelectWrapper>
          </section>
        )}
      </DesktopFilter>
      <MobileFilter>
        <section>
          <CustomSelectWrapper>
            <CustomSelect>
              <select name="type" id="type">
                <option value="All">All</option>
                <option value="Video">Video</option>
                <option value="Channel">Channel</option>
                <option value="Playlist">Playlist</option>
                <option value="Movie">Movie</option>
              </select>
              <span></span>
            </CustomSelect>
            <CustomSelect>
              <select name="uploadDate" id="uploadDate">
                <option value="AnyTime">Any time</option>
                <option value="Today">Today</option>
                <option value="ThisWeek">This week</option>
                <option value="ThisMonth">This month</option>
                <option value="ThisYear">This year</option>
              </select>
              <span></span>
            </CustomSelect>
          </CustomSelectWrapper>
        </section>
      </MobileFilter>
      <section>
        <hr />
        VideoList
      </section>
    </Wrapper>
  );
};

export default VideoList;

const Wrapper = styled.section`
  background-color: #fafafa;
  height: calc(100% - 56px);
  section {
    max-width: min(1000px, 70%);
    margin: 0 auto;
    hr {
      margin-top: 0;
      border-top: 1px solid #f5f5f5;
    }
  }
`;

const FilterWrapper = styled.section`
  display: flex;
  align-items: center;
  padding-top: 16px;
  p {
    flex: 1;
  }
  section {
    display: flex;
    align-items: center;
    gap: 12px;
    img {
      cursor: pointer;
    }
    color: #9d8e9a;
  }
`;

const CustomSelectWrapper = styled.div`
  display: flex;
  width: 300px;
  /* margin-right: auto; */
  margin-bottom: 12px;
`;

const DesktopFilter = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

const MobileFilter = styled.div`
  padding-top: 16px;
  @media (min-width: 600px) {
    display: none;
  }
`;

const CustomSelect = styled.section`
  width: 140px;
  select {
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    &::-ms-expand {
      display: none;
    }
    outline: none;
    grid-area: select;
  }

  min-width: 120px;
  max-width: 120px;
  border: 1px solid #e5e5e5;
  border-radius: 0.25em;
  padding: 0.8em 0.5em;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #f8f8f8;

  &::after {
    content: "";
    width: 0.6em;
    height: 0.3em;
    background-color: #777;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  display: grid;
  grid-template-areas: "select";
  align-items: center;

  &:focus {
    & + span {
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: 2px solid blue;
      border-radius: inherit;
    }
  }
  position: relative;
`;
