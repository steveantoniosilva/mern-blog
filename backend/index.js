const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const BlogPost = mongoose.model('blogposts', blogPostSchema);

const express = require('express');
const bodyParser = require('body-parser');

mongoose
  .connect(
    'mongodb+srv://steveantoniosilva:mongoDBpassword@mern-cluster.gksdxeq.mongodb.net/blog-database?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/api/posts', async (req, res) => {
  try {
    const blogPost = new BlogPost(req.body);
    await blogPost.save();
    res.status(201).send(blogPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).send(blogPosts);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.put('/api/update/:id', async (req, res) => {
  const { id } = req.params;
  const newTitle = req.body.title;
  const newContent = req.body.content;

  try {
    const updatedBlogPost = await BlogPost.findById(id);
    updatedBlogPost.title = newTitle;
    updatedBlogPost.content = newContent;
    await updatedBlogPost.save();

    res.status(201).send(updatedBlogPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('Server started');
});
