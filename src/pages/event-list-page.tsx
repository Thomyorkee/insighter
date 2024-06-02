import api from "../services/api";
import { PageResult } from "../types";
import { useRecoilState } from "recoil";
import { IoSadOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { eventsState } from "../services/atoms";
import EventCard from "../components/event-card";
import Pagination from "../components/pagination";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/custom-input";
//메인페이지, 이벤트의 리스트 나열
const EventList: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useRecoilState(eventsState);
  const [eventsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState({ gte: "", lte: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  /**
   * 검색 조건을 초기화
   */
  const resetFilter = () => {
    setSearchTerm("");
    setSortOrder("asc");
    setFilterDate({ gte: "", lte: "" });
  };
  /**
   * 이벤트 명으로 검색할 시 검색 조건 핸들링
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - 입력 이벤트
   */
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
  };
  /**
   * 날짜별 필터링에 gte, lte를 사용해 범위로 검색 가능하도록 설정
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - 입력 이벤트
   */
  const handleDateFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterDate({ ...filterDate, [e.target.name]: e.target.value });
  };
  /**
   * 날짜별 오름차순 내림차순 정렬
   */
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  /**
   * 이벤트를 불러오기, 검색 조건의 변경마다 새로운 request 전송
   */
  useEffect(() => {
    api
      .getEvents(searchTerm, filterDate, sortOrder, currentPage, eventsPerPage)
      .then((data: PageResult) => setEvents(data));
  }, [
    searchTerm,
    filterDate,
    sortOrder,
    currentPage,
    eventsPerPage,
    setEvents,
  ]);

  return (
    <>
      <button className="add-button" onClick={() => navigate("/add")}>
        이벤트 추가
      </button>
      {events?.data?.length > 0 ? (
        <div className="item-wrap">
          {events.data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="no-result">
          <IoSadOutline />
          <p>검색 결과가 없습니다!</p>
          <button onClick={resetFilter}>필터 초기화</button>
        </div>
      )}
      <div className="filter-wrap">
        <CustomInput
          type="text"
          label="이벤트명"
          placeholder="이벤트명으로 검색"
          value={searchTerm}
          handleChange={handleSearchChange}
        />
        <CustomInput
          name="gte"
          type="date"
          label="부터"
          value={filterDate.gte}
          handleChange={handleDateFilterChange}
        />
        <CustomInput
          name="lte"
          type="date"
          label="까지"
          value={filterDate.lte}
          handleChange={handleDateFilterChange}
        />
        <button className="sort-button" onClick={handleSortOrderChange}>
          날짜로 정렬 ({sortOrder === "asc" ? "오름차순" : "내림차순"})
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={events?.pages}
        paginate={setCurrentPage}
      />
    </>
  );
};

export default EventList;
