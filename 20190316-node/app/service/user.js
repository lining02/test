const Service = require('egg').Service;

class UserService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.user;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });

    // parallel GET detail
    const userList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return userList.map(res => res.data);
  }
}

module.exports = UserService;