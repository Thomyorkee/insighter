import { atom } from 'recoil';
import { PageResult } from '../types';
//불러온 이벤트를 전역적으로 관리하기 위한 atom
export const eventsState = atom<PageResult>({
  key: 'eventsState',
  default: undefined,
});