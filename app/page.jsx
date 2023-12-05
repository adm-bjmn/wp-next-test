import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

// Fetching basic pages data with graphQL
async function gethomepage() {
  const query = `{
    allHomepage {
      nodes {
        homepageContent {
          heroImage {
            altText
            mediaItemUrl
          }
          ctaLink
          ctaText
          heroTitle
        }
      }
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
      next: { revalidate: 0 },
    },
  );

  const { data } = await res.json();
  return data.allHomepage.nodes[0];
}

// Render Data with react
export default async function PostList() {
  const homepage = await gethomepage();
  const hero = homepage.homepageContent.heroImage;
  return (
    <main>
      <div className="flex flex-col space-y-4 items-center justify-center">
        {homepage.homepageContent.heroTitle}
        <div>
          <Image src={hero.mediaItemUrl} alt={hero.altText} width={500} height={500} />
        </div>
        <div>{homepage.homepageContent.ctaText}</div>
        {homepage.homepageContent.ctaLink}
      </div>
    </main>
  );
}
