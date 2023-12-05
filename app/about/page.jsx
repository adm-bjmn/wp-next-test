import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

// Fetching basic pages data with graphQL
async function gethomepage() {
  try {
    const query = `{
        allAbout {
          nodes {
            aboutId
          }
        }
      }`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Network response was not ok.");
    }

    const { data } = await res.json();
    console.log(data.allAbout.nodes);
    return data.allAbout.nodes;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle error state
  }
}

// Render Data with react
export default async function PostList() {
  const homepage = await gethomepage();
  console.log(homepage);
  return <main>{homepage[0].aboutId} </main>;
}
