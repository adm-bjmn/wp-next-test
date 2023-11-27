import Image from "next/image";

async function getTeamMember(uri) {
  console.log("Query URI :");
  console.log(uri);

  const query = `
    query GetTeamMemberByUri($uri: String!) {
      teamMemberBy(uri: $uri) {
        title
        uri
        bio
        position
        image
      }
    }
  `;

  const variables = {
    uri,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();
  console.log(responseBody);

  if (responseBody && responseBody.data && responseBody.data.teamMemberBy) {
    return responseBody.data.teamMemberBy;
  } else {
    return null;
  }
}

export default async function PostDetails({ params }) {
  console.log("params: " + params.uri);
  const post = await getTeamMember(params.uri);

  return (
    <main>
      <h1>{post ? post.title : "Loading..."}</h1>
      <h1>{post ? post.position : "Loading..."}</h1>
      <h1>{post ? post.bio : "Loading..."}</h1>
      {/* Render other data from 'post' as needed */}
      <Image src={post.image} alt="team Member Image" width={500} height={500} />
    </main>
  );
}
