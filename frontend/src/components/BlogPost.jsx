import React, { useState } from 'react';
import '../css-components/BlogPost.css';

export default function BlogPost({
  id,
  title,
  updateTitle,
  content,
  updateContent,
  deleteBlog,
  updateBlog,
  isEditing,
  setIsEditing,
  handleEditClick,
  newTitle,
  newContent,
}) {
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      className='blogPostContainer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className='blogPost-inner-container'>
        <h2 className='title'>{title}</h2>
        {isEditing && (
          <input
            className='edit-input'
            type='text'
            value={newTitle}
            placeholder='new title...'
            onChange={updateTitle}
          />
        )}
        <p className='content'>{content}</p>
        {isEditing && (
          <textarea
            className='edit-input'
            type='text'
            value={newContent}
            placeholder='new content...'
            onChange={updateContent}
          />
        )}
      </div>
      {isHovered && (
        <div className='button-div'>
          {!isEditing && (
            <button
              className='delete-button'
              onClick={deleteBlog}>
              Delete
            </button>
          )}
          {isEditing && (
            <button
              onClick={updateBlog}
              className='update-button'>
              Update Blog
            </button>
          )}
          <button
            className='edit-button'
            onClick={handleEditClick}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
}
