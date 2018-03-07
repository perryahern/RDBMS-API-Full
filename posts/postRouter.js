const express = require('express');

const db = require('./postController.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
  db
    .getPosts()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the posts.' });
    });
});

postRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getPostById(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving post with ID ${id}.` });
    });
});

postRouter.post('/', (req, res) => {
  const post = req.body;

  db
    .postPost(post)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error posting the post.' });
    });
});

postRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .deletePostById(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `Post ${id} deleted successfully.`});
      } else {
        res.status(404).json({ message: `Post with ID ${id} not found.` });
      }
    })
    .catch(error => {
      res.status(404).json({ error: `The post with ID ${id} does not exist.` });
    });
});

module.exports = postRouter;