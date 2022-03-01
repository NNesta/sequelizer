const models = require("../database/models");


const createUser = async (req, res,next) => {
  
  const obj = {
    google_id: req.user.id,
    name: req.user.displayName,
    email: req.user.email
  }
  
  try {
    const userExist = await models.User.findOne({
      where: { google_id:req.user.id },
      include: [
        {
          model: models.Profile,
          as: "profile",
        },
      ],
    });
    if(userExist){
      console.log("already exist");
     req.user.user__id = userExist.id;
     req.user.profile1 = userExist.profile? userExist.profile.dataValues: null;
     console.log(req.user.profile1)
     req.user.isNew = false;
      return next()
    }
    const newUser = await models.User.create(obj);
    req.user.user__id = newUser.id;
    req.user.profile = null;
    req.user.isNew = true;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } 
}; 
const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      include: [
        {
          model: models.Profile,
          as: "profile",
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await models.User.findOne({
      where: { id: userId },
      include: [
        {
          model: models.Profile,
          as: "profile",
        },
      ],
    });
    if (user) {
      return res.status(200).json(user );
    }
    return res.status(404).send(`User with the specified id ${userId} does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const [updated] = await models.User.update(req.body, {
      where: { id: userId },
    });
    if (updated) {
      const updatedUser = await models.User.findOne({ where: { id: userId } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error(`User with id ${userId} does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await models.User.destroy({
      where: { id: userId },
    });
    if (deleted) {
      return res.status(204).send("User deleted");
    }
    throw new Error(`User with ${userId} does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// PROFILE
const createProfile = async (req, res) => {
  try {
    const profile = await models.Profile.create(req.body);
    return res.status(201).json(profile);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await models.Profile.findAll({
      include: [
        {
          model: models.User,
          as: "user",
        },
      ],
    });
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getProfileById = async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await models.Profile.findOne({
      where: { id: profileId },
      include: [
        {
          model: models.User,
          as: "user",
        },
      ],
    });
    if (profile) {
      return res.status(200).json(profile);
    }
    return res.status(404).send(`Profile with the specified id ${profileId} does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const [updated] = await models.Profile.update(req.body, {
      where: { id: profileId },
    });
    if (updated) {
      const updatedProfile = await models.Profile.findOne({
        where: { id: profileId },
      });
      return res.status(200).json({ profile: updatedProfile });
    }
    throw new Error(`Profile with id ${profileId} does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const deleteProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    const deleted = await models.Profile.destroy({
      where: { id: profileId },
    });
    if (deleted) {
      return res.status(204).send("Profile deleted");
    }
    throw new Error(`Profile with ${profileId} does not exist`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
