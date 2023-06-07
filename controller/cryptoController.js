const getResponse = async (req, res) => {
  try {
    res.send(`<h1>Welcome to Crypto API</h1>`);
  } catch (error) {
    console.error("Error getting response:", error);
  }
};
