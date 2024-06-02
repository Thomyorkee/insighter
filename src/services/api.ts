import axios from "axios";
import { Event, PageResult, filterDate } from "../types";

const API_URL = "http://localhost:3001/events";

const api = {
  /**
   * 이벤트의 리스트를 eventsPerPage개 만큼 페이지네이션 형태의 response로 불러옴
   * @param {string} searchTerm - 검색어
   * @param {filterDate} filterDate - 필터 날짜 객체 (gte: 시작 날짜, lte: 종료 날짜)
   * @param {"asc" | "desc"} sortOrder - 정렬 순서 (asc: 오름차순, desc: 내림차순)
   * @param {number} currentPage - 현재 페이지 번호
   * @param {number} eventsPerPage - 페이지당 이벤트 수
   * @returns {Promise<PageResult>} 페이지 결과 객체
   */
  getEvents: async (
    searchTerm: string,
    filterDate: filterDate,
    sortOrder: "asc" | "desc",
    currentPage: number,
    eventsPerPage: number
  ): Promise<PageResult> => {
    try {
      let url = `_page=${currentPage}&_per_page=${eventsPerPage}`;

      if (searchTerm) {
        url += `&name_like=${searchTerm}`;
      }

      if (filterDate.gte || filterDate.lte) {
        if (filterDate.gte)
          url += `&timeStamp_gte=${Date.parse(filterDate.gte)}`;
        if (filterDate.lte)
          url += `&timeStamp_lte=${Date.parse(filterDate.lte)}`;
      }

      url += `&_sort=date&_order=${sortOrder}`;

      const response = await axios.get(`${API_URL}_getAll?${url}`);
      return response.data;
    } catch (error) {
      alert("서버 연결이 원활하지 않습니다!");
      return {
        first: 0,
        prev: 0,
        next: 0,
        last: 0,
        pages: 0,
        items: 0,
        data: [],
      };
    }
  },
  /**
   * 단일 이벤트를 불러옴
   * @param {string} id - 이벤트 ID
   * @returns {Promise<Event>} 이벤트 객체
   */
  getSingleEvent: async (id: string): Promise<Event> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      alert("서버 연결이 원활하지 않습니다!");
      return {
        id: undefined,
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        timeStamp: undefined,
      };
    }
  },
  /**
   * 새로운 이벤트를 추가함
   * @param {Event} event - 추가할 이벤트 객체
   * @returns {Promise<Event>} 추가된 이벤트 객체
   */
  addEvent: async (event: Event): Promise<Event> => {
    try {
      const response = await axios.post(API_URL, event);
      return response.data;
    } catch (error) {
      alert("서버 연결이 원활하지 않습니다!");
      return {
        id: undefined,
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        timeStamp: undefined,
      };
    }
  },
  /**
   * 기존 이벤트를 업데이트함
   * @param {string} id - 업데이트할 이벤트의 ID
   * @param {Event} updatedEvent - 업데이트할 이벤트 객체
   * @returns {Promise<Event | null>} 업데이트된 이벤트 객체 또는 null
   */
  updateEvent: async (
    id: string,
    updatedEvent: Event
  ): Promise<Event | null> => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedEvent);
      return response.data;
    } catch (error) {
      alert("서버 연결이 원활하지 않습니다!");
      return null;
    }
  },
  /**
   * 이벤트를 삭제함
   * @param {string} id - 삭제할 이벤트의 ID
   * @returns {Promise<boolean>} 삭제 성공 여부
   */
  deleteEvent: async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      alert("서버 연결이 원활하지 않습니다!");
      return false;
    }
  },
};

export default api;
