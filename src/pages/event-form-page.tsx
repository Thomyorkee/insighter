import { Event } from "../types";
import api from "../services/api";
import { useRecoilValue } from "recoil";
import { eventsState } from "../services/atoms";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/custom-input";
import { useNavigate, useParams } from "react-router-dom";
//이벤트를 입력하는 페이지로 id가 url에 담겨있을 시 기존 이벤트의 업데이트를 수행
const EventFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const events = useRecoilValue(eventsState);
  const [event, setEvent] = useState<Event>({
    id: id && id,
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    // json server에서는 date를 lte gte로 필터링이 불가능하기 때문에 입력된 날짜를 변환해 timeStamp로 저장
    timeStamp: undefined,
  });
  /**
   * 입력값 핸들링을 위해
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - 입력 이벤트
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };
  /**
   * id가 url param으로 존재할 시 update 없으면 새로운 이벤트로 이벤트 추가
   * @param {React.FormEvent} e - 폼 제출 이벤트
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pasedEvent = {...event, timeStamp: Date.parse(event.date)}

    if (id) {
      await api.updateEvent(id, pasedEvent);
    } else {
      await api.addEvent(pasedEvent);
    }
    navigate("/");
  };
  /**
   * 메인페이지에서 set한 이벤트리스트 중 id가 존재할 시 해당 이벤트 호출
   * 없을 시 단일 이벤트 request(url에 이벤트 id를 입력해 입장할 경우를 대비)
   */
  useEffect(() => {
    if (id) {
      const eventToEdit = events.data?.find((e: Event) => e.id === id);
      if (eventToEdit) {
        setEvent(eventToEdit);
      } else {
        api.getSingleEvent(id).then((event: Event) => {
          setEvent(event);
        });
      }
    }
  }, [id, events]);

  return (
    <div className="form-wrap">
      <form onSubmit={handleSubmit}>
        <h3>{id ? "이벤트 수정" : "이벤트 추가"}</h3>
        <CustomInput
          type="text"
          name="name"
          label="이벤트명"
          value={event.name}
          handleChange={handleChange}
          placeholder="이벤트명을 입력해주세요"
        />
        <CustomInput
          type="date"
          name="date"
          label="날짜"
          value={event.date}
          handleChange={handleChange}
        />
        <CustomInput
          type="time"
          name="time"
          label="시간"
          value={event.time}
          handleChange={handleChange}
        />
        <CustomInput
          type="text"
          label="장소"
          name="location"
          value={event.location}
          handleChange={handleChange}
          placeholder="장소를 입력해주세요"
        />
        <CustomInput
          label="설명"
          maxLength={50}
          type="textarea"
          name="description"
          value={event.description}
          handleChange={handleChange}
          placeholder="설명을 입력해주세요"
        />
        <button type="submit" className="confirm-button">
          이벤트 {id ? "수정" : "등록"}
        </button>
      </form>
    </div>
  );
};

export default EventFormPage;
