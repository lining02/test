const userlist = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest',
  },
];
const menus = [
  { name: '用户列表', icon: 'user', route: '/user' },
  { name: '权限管理', icon: 'video-camera', route: '/permission' },
  { name: '个人中心', icon: 'upload', route: '/personal' },
]
const columns = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => (<span>action</span>),
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
module.exports = {
  [`POST /api/login`](req, res) {
    const {body: {username, password}} = req
    let [userInfo] = userlist.filter(user => user.username === username && user.password === password)
    if(!userInfo) {res.status(500).json({message: '111'})}
      const now = new Date()
      now.setDate(now.getDate() + 1)
      res.cookie(
        'token',
        JSON.stringify({ id: userInfo.id, deadline: now.getTime() }),
        {
          maxAge: 900000,
          httpOnly: true,
        }
      )
    res.status(200).json({userInfo, menus, })
  },
  [`GET /api/list`](req, res) {
    const cookie = req.headers.cookie || ''
    // const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    console.log(cookie)
    res.status(200).json({list: data, columns})
  },
  [`GET /api/user/list`](req, res) {
    res.status(200).json({list: data, columns})
  },
  [`GET /api/permission/list`](req, res) {
    res.status(200).json({list: data, columns})
  },
  [`GET /api/personal/list`](req, res) {
    res.status(200).json({list: data, columns})
  }
}