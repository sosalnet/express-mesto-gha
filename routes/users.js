const router = require('express').Router();
const { celebrateEditAvatar, celebrateEditUser, celebrateIdUser } = require('../validators/users');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrateIdUser, getUserById);
router.patch('/me', celebrateEditUser, updateUser);
router.patch('/me/avatar', celebrateEditAvatar, updateAvatar);

module.exports = router;
