import Tooltip from "../tooltip";
import { Event } from "../../types";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoConstructOutline, IoTrashOutline } from "react-icons/io5";

interface EventCardProps {
  event: Event;
}
//이벤트 카드, 이벤트 리스트 페이지에서 map을 통해 나열
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  /**
   * 이벤트 삭제를 처리하는 비동기 함수
   */
  const handleDelete = async () => {
    setIsModalOpen(false);
    await api.deleteEvent(event.id);
    //이벤트 삭제 후 이벤트를 새로 불러오기 위함
    navigate(0);
  };
  /**
   * 모달이 오픈될 경우 뒷 화면의 스크롤을 방지
   */
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isModalOpen]);

  return (
    <>
      <div className="event-card">
        <h2>{event.name}</h2>
        <p>날짜: {event.date}</p>
        <p>시간: {event.time}</p>
        <p>장소: {event.location}</p>
        <p>설명: {event.description}</p>
        <div className="option-wrap">
          <Tooltip text="수정">
            <IoConstructOutline className="edit-icon _cp" onClick={() => navigate(`/edit/${event.id}`)} />
          </Tooltip>
          <Tooltip text="삭제">
            <IoTrashOutline className="delete-icon _cp" onClick={() => setIsModalOpen(!isModalOpen)} />
          </Tooltip>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>이벤트를 삭제하시겠습니까?</p>
            <button onClick={handleDelete}>확인</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
