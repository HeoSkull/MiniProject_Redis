const express = require('express');
const Redis = require('ioredis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const client = new Redis();

app.use(cors());
app.use(bodyParser.json());

// Kết nối đến Redis
client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add
app.post('/addNhanVien', async (req, res) => {
  try {
    const { phonenumber, fullname, firstname, lastname, email } = req.body;
    await client.hmset(
      phonenumber,
      'fullname', fullname,
      'firstname', firstname,
      'lastname', lastname,
      'phonenumber', phonenumber,
      'email', email
    );
    res.status(201).send('Nhân viên được thêm thành công');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get 1 nhân viên
app.get('/:phonenumber', async (req, res) => {
  try {
    const { phonenumber } = req.params;
    const user = await client.hgetall(phonenumber);
    if (Object.keys(user).length === 0) {
      res.status(404).send('Nhân viên không tìm thấy');
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all
app.get('/', async (req, res) => {
  try {
    const keys = await client.keys('*');
    if (keys.length === 0) {
      res.status(200).send([]);
    } else {
      const users = await Promise.all(keys.map(key => client.hgetall(key)));
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete
app.delete('/deleteNhanVien/:phonenumber', async (req, res) => {
  try {
    const { phonenumber } = req.params;
    const result = await client.del(phonenumber);
    if (result === 1) {
      res.status(200).send('Nhân viên được xóa thành công');
    } else {
      res.status(404).send('Nhân viên không tìm thấy');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update
app.put('/updateNhanVien/:phonenumber', async (req, res) => {
  try {
    const { phonenumber } = req.params;
    const { fullname, firstname, lastname, email } = req.body;
    const exists = await client.exists(phonenumber);
    if (exists) {
      await client.hmset(
        phonenumber,
        'fullname', fullname,
        'firstname', firstname,
        'lastname', lastname,
        'phonenumber', phonenumber,
        'email', email
      );
      res.status(200).send('Nhân viên được cập nhật thành công');
    } else {
      res.status(404).send('Nhân viên không tìm thấy');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
