import ormconfig from './ormconfig';
const ormSeedConfig = {
  ...ormconfig,
  migrations: [__dirname + 'src/seeds/*.ts'],
};

export default ormSeedConfig;