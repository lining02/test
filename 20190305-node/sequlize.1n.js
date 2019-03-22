const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'admin', '1234qwer', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false // 操作符
});

const Player = sequelize.define("player", { name: Sequelize.STRING });
const Team = sequelize.define("team", { name: Sequelize.STRING });

// 会添加teamId到Player表作为外键 1个Team对应多个Player
Player.belongsTo(Team); // 1端建立关系
Team.hasMany(Player); // N端建立关系


sequelize.sync({ force: true }).then(async () => {
    await Team.create({ name: "Huojian" });
    // bulkCreate 批量插入
    await Player.bulkCreate([
      { name: "HaLuo", teamId: 1 },
      { name: "BaoLuo", teamId: 1 }
    ]);
  
    // 1端关联查询
    const players = await Player.findAll({ include: [Team] });
    console.log(JSON.stringify(players, null, 2));
  
    // N端关联查询
    const team = await Team.findOne({
      where: { name: "Huojian" },
      include: [Player],
    });
    console.log(JSON.stringify(team, null, 2));

})