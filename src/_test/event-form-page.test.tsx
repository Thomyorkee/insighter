import { RecoilRoot } from "recoil";
import EventFormPage from "../pages/event-form-page";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";

test("이벤트 폼 페이지 렌더", () => {
  render(
    <RecoilRoot>
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<EventFormPage />} />
        </Routes>
      </MemoryRouter>
    </RecoilRoot>
  );

  expect(screen.getByText(/이벤트 추가/i)).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(/이벤트명을 입력해주세요/i)
  ).toBeInTheDocument();
});

test("submit 이벤트", () => {
  render(
    <RecoilRoot>
      <MemoryRouter initialEntries={["/add"]}>
        <Routes>
          <Route path="/add" element={<EventFormPage />} />
        </Routes>
      </MemoryRouter>
    </RecoilRoot>
  );

  fireEvent.change(screen.getByPlaceholderText(/이벤트명을 입력해주세요/i), {
    target: { value: "테스트" },
  });
  fireEvent.change(screen.getByPlaceholderText(/장소를 입력해주세요/i), {
    target: { value: "낙성대" },
  });
  fireEvent.change(screen.getByPlaceholderText(/설명을 입력해주세요/i), {
    target: { value: "설명" },
  });

  fireEvent.click(screen.getByText(/이벤트 등록/i));
});
