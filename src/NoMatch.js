import React from 'react'

function NoMatch() {
  return (
    <div className='not-found'>
      <img src="/media/left_skeleton.webp" alt="skeleton" />
      <h3>404 Page Not Found</h3>
      <img src="/media/right_skeleton.webp" alt="skeleton" />
    </div>
  );
}

export default NoMatch