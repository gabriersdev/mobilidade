import news0 from './0.js';
import news1 from './1.js';
import news2 from './2.js';
import news3 from './3.js';
import news4 from './4.js';
import news5 from './5.js';
import news6 from './6.js';
import news7 from './7.js';
import news8 from './8.js';
import news9 from './9.js';
import news10 from './10.js';
import news11 from './11.js';
import news12 from './12.js';

const news = [
  news0,
  news1,
  news2,
  news3,
  news4,
  news5,
  news6,
  news7,
  news8,
  news9,
  news10,
  news11,
  news12
];

const returnNews = news.map((n, i) => {
  return {...n, ["id"]: i}
});

export default returnNews;
