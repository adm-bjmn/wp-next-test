//  Example of how to dangerously set html for pages

import Image from "next/image";

async function getPageContent(uri) {
  const query = `
    query GetPageBy($uri: String!) {
      pageBy(uri: $uri) {
        title
        content
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

  if (responseBody && responseBody.data && responseBody.data.pageBy) {
    return responseBody.data.pageBy;
  } else {
    return null;
  }
}

export default async function PostDetails({ params }) {
  const post = await getPageContent(params.uri);
  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
