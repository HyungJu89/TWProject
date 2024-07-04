// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      {/* About 페이지로 이동하는 링크 */}
      <Link to="/about">Go to About Page</Link>
    </div>
  );
}

export default Home;
