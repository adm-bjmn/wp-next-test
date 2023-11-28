import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

async function getPosts() {
  const query = `
  {
    homePages {
      homepageCopy
      homepageImage
      homepageTitle
      id
    }
  }
    `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const { data } = await res.json();
  return data.homePages[0];
}

export default async function PostList() {
  const posts = await getPosts();
  return (
    <main>
      <div>{posts.homepageTitle}</div>
      <div>{posts.homepageCopy}</div>
      <Image src={posts.homepageImage} alt="team Member Image" width={500} height={500} />
    </main>
  );
}
