// Get a random user from recent submission authors
const endpoint =
  process.env.NODE_ENV === "development" ? "http://localhost:80" : "";

async function getRecentSubmissions() {
  const uri = endpoint + "/api/v1/submissions/";
  return await fetch(uri).then((res) => (res.ok ? res.json() : null));
}

const getRandomUser = async () => {
  const uri = endpoint + "/api/v1/submissions/";
  return await fetch(uri)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      const subs = data.submissions;
      // console.log(subs);
      const len = subs.length;
      const randIdx = Math.floor(Math.random() * len);
      // console.log(subs[randIdx].username);
      return subs[randIdx].username;
    });
};

const getUserInfo = async (uname) => {
  const uri = endpoint + "/api/v1/user/" + uname;
  return await fetch(uri)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      console.log("getUserInfo:", data);
      return data;
    });
};

export { getRecentSubmissions, getRandomUser, getUserInfo };
