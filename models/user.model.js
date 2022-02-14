module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        username: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        password: {
            type: Sequelize.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    return User;
}
