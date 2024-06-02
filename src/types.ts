//개별 이벤트
export interface Event {
  id: any | undefined;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  timeStamp: number | undefined;
}
//불러온 페이지를 페이지네이션
export interface PageResult {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Event[];
}
//날짜 범위 검색 필터
export interface filterDate {
  gte: string;
  lte: string;
}

