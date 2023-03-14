import React, { useState } from 'react';
import '../css-components/BlogForm.css';
import axios from 'axios';
import BlogPost from './BlogPost';
import { useFetchDatabase } from '../helper';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');

  const { blogPosts, setBlogPosts, loading, error } = useFetchDatabase(
    'http://localhost:3001/api/posts',
  );

  const [isEditing, setIsEditing] = useState(blogPosts.map(() => false));

  const handleSubmit = event => {
    event.preventDefault();
    setTitle('');
    setContent('');

    const blogPost = {
      title,
      content,
    };

    axios
      .post('http://localhost:3001/api/posts', blogPost)
      .then(response => {
        setBlogPosts(prevPosts => [blogPost, ...prevPosts]);
        console.log('blogPost submitted to database');
      })
      .catch(error => {
        console.log('Error submitting blogPost to database');
      });
  };

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3001/api/posts/${id}`)
      .then(response => {
        setBlogPosts(prevPosts =>
          prevPosts.filter(blogPost => blogPost._id !== id),
        );
      })
      .catch(error => {
        console.log('Error deleting blog post', error);
      });
  }

  function handleUpdate(id) {
    axios
      .put(`http://localhost:3001/api/update/${id}`, {
        title: newTitle,
        content: newContent,
      })
      .then(response => {
        console.log('blogPost updated in database');
        const index = blogPosts.findIndex(post => post._id === id);
        setIsEditing(prevValue => {
          const newIsEditing = [...prevValue];
          newIsEditing[index] = false;
          return newIsEditing;
        });
      })
      .catch(error => {
        console.log('Error updating blog post', error);
      });
  }

  function handleEditClick(id) {
    const index = blogPosts.findIndex(post => post._id === id);
    setIsEditing(prevValue => {
      const newIsEditing = [...prevValue];
      newIsEditing[index] = !newIsEditing[index];
      return newIsEditing;
    });
  }

  const blogPostElements = blogPosts.map((blogPost, index) => (
    <BlogPost
      key={blogPost._id}
      id={blogPost._id}
      title={blogPost.title}
      updateTitle={event => setNewTitle(event.target.value)}
      content={blogPost.content}
      updateContent={event => setNewContent(event.target.value)}
      deleteBlog={() => handleDelete(blogPost._id)}
      updateBlog={() => handleUpdate(blogPost._id)}
      handleEditClick={() => handleEditClick(blogPost._id)}
      isEditing={isEditing[index]}
    />
  ));

  return (
    <div className='blog-form-main-div'>
      <form className='container'>
        {error && console.log('error...')}
        {loading && console.log('loading...')}
        <h1 className='blog-form-title'>Coding Blog</h1>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='content'>Content:</label>
          <textarea
            id='content'
            value={content}
            onChange={event => setContent(event.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          type='submit'>
          Submit
        </button>
      </form>
      <div className='blogposts'>{blogPostElements}</div>
    </div>
  );
}

export default BlogForm;
