import React from "react";

const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export default UserProfilePage;

// inside context we get full info about the request
// write any server side code
// reach out to any file like dummy-backend
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log('Server side code');
//   console.log(req);
//   console.log(res);
//   console.log(context);

  return {
    props: {
      username: "Chirag",
    },
  };
}
