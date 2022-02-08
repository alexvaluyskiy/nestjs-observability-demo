import { Sequelize } from 'sequelize-typescript';
import { Book } from './models/book'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'nest',
      });
      sequelize.addModels([Book]);
      await sequelize.sync();
      return sequelize;
    },
  },
];