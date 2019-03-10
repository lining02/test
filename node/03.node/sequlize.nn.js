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

// 多对多关系
const Fruit = sequelize.define("fruit", { name: Sequelize.STRING });
const Category = sequelize.define("category", { name: Sequelize.STRING });
Fruit.FruitCategory = Fruit.belongsToMany(Category, {
  through: "FruitCategory"
});
sequelize.sync({ force: true }).then(async () => {
   
await Fruit.create(
    {
      name: "banner",
      categories: [{ id: 1, name: "reDai" }, { id: 2, name: "wenDai" }]
    },
    {
      include: [Fruit.FruitCategory]
    }
  );
  // 多对多联合查询
  const fruit = await Fruit.findOne({
    where: { name: "banner" }, // 通过through指定条件、字段等
    include: [{ model: Category, through: { attributes: ["id", "name"] } }]
  });

})