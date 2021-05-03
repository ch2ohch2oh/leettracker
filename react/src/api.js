// Get a random user from recent submission authors
const getRandomUser = async () => {
  return await fetch("/api/v1/submissions/")
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

const getUserInfo = () => {};
export { getRandomUser };
