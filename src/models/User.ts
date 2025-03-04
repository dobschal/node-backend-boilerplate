import { type CreationOptional, DataTypes, type InferAttributes, type InferCreationAttributes, Model } from 'sequelize'
import { database } from '../core/database'

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare email: string
  declare password: string
  declare emailVerified: CreationOptional<boolean>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'user',
    sequelize: database
  }
)
