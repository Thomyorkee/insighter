const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'events.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
//json server 최신버전의 경우 like 검색이 존재하지 않음, 구버전(0.17.4)버전의 경우 페이지네이션 처리를 위한 result를 불러오지 못하는 이슈 및
//검색 조건이 다중으로 들어올 때 쿼리 순서상 첫 번째 쿼리만 적용되는 버그가 존재하여 미들웨어를 커스텀하여 사용
server.use((req, res, next) => {
  if (req.url.startsWith('/events_getAll')) {
    const { _sort, _order, _page, _per_page, name_like, timeStamp_gte, timeStamp_lte } = req.query;
    
    let clonedData = [...router.db.getState().events];
    //이벤트명 like 검색을 위해
    if (name_like) {
      clonedData = clonedData.filter(event => event.name.toLowerCase().includes(name_like.toLowerCase()));
    }
    //설정 날짜 이후의 이벤트 필터링
    if (timeStamp_gte) {
      const minTimeStamp = parseInt(timeStamp_gte, 10);
      clonedData = clonedData.filter(event => event.timeStamp >= minTimeStamp);
    }
    //설정 날짜 이전의 이벤트 필터링
    if (timeStamp_lte) {
      const maxTimeStamp = parseInt(timeStamp_lte, 10);
      clonedData = clonedData.filter(event => event.timeStamp <= maxTimeStamp);
    }
    //날짜별 정렬 asc, desc 두 가지로 받을 수 있음
    if (_sort) {
      clonedData.sort((a, b) => {
        const sortResult = a[_sort] < b[_sort] ? -1 : a[_sort] > b[_sort] ? 1 : 0;
        return _order === 'desc' ? -sortResult : sortResult;
      });
    }
    //페이지네이션을 위한 이벤트 전체 개수, 페이지 수, 해당페이지의 시작, 종료 인덱스
    const totalCount = clonedData.length;
    const totalPages = Math.ceil(totalCount / _per_page);
    const startIndex = (_page - 1) * _per_page;
    const endIndex = Number(startIndex) + Number(_per_page);

    const data = clonedData.slice(startIndex, endIndex);
    //first: 첫 번째 페이지, prev: 이전 페이지, next: 다음페이지, last: 마지막 페이지, pages: 전체 페이지의 수, items: 전체 이벤트의 수, data: 이벤트를 배열형태로 반환
    const result = {
      first: 1,
      prev: Math.max(_page - 1, 1),
      next: Math.min(_page + 1, totalPages),
      last: totalPages,
      pages: totalPages,
      items: totalCount,
      data: data
    };

    res.jsonp(result);
  } else {
    next();
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
