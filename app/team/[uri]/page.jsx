import Image from "next/image";

async function getTeamMember(uri) {
  const query = `
    query GetTeamMemberByUri($uri: String!) {
      teamMemberBy(uri: $uri) {
        id
        testing {
          position
          teamImage {
            altText
            mediaItemUrl
          }
        }
      }
    }
  `;

  const variables = {
    uri,
  };

  // Post request used to get entire page with complex query -
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.teamMemberBy) {
    return responseBody.data.teamMemberBy;
  } else {
    return null;
  }
}

export default async function PostDetails({ params }) {
  const post = await getTeamMember(params.uri);
  console.log(post);

  return (
    <main>
      <h1>{post ? post.title : "Loading..."}</h1>
      <h1>{post ? post.position : "Loading..."}</h1>
      <h1>{post ? post.bio : "Loading..."}</h1>
      <Image src={post.testing.teamImage.mediaItemUrl} alt="alt" width={500} height={500} />
    </main>
  );
}
