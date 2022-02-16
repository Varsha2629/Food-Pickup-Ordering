const getUserByEmail = (email, database) => {  //Return user if email is im the database
  for (const user in database) {
    if (database[user]["email"] === email) {
      return database[user];
    }
  }
  return false;
};

const generateRandomString = () => {
  return Math.random().toString(36).slice(2, 8);
}

module.exports = { getUserByEmail, generateRandomString };
