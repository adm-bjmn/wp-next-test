import Link from "next/link";

async function getDocs() {
  const query = `
  query NewQuery {
    teamMembers {
      nodes {
        bio
        image
        uri
        title
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
      next: {
        revalidate: 0,
      },
    },
  );

  const { data } = await res.json();

  return data.teamMembers.nodes;
}

export default async function PostDetails() {
  const members = await getDocs();
  console.log(members);

  return (
    <main>
      <nav className="flex space-x-4">
        {members?.map((member, index) => (
          <Link key={index} href={member.uri}>
            {member.title}
          </Link>
        ))}
      </nav>
    </main>
  );
}
