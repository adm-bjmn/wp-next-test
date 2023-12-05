import Link from "next/link";

async function getDocs() {
  const query = `
  query NewQuery {
    teamMembers {
      nodes {
        id
        uri
      }
    }
  }
    `;

  // Get requests used to get all instances of Team Member ( NOT AS SECURE )
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
  console.log(data.teamMembers.nodes);
  return data.teamMembers.nodes;
}

export default async function PostDetails() {
  const members = await getDocs();
  console.log;
  return (
    <main>
      <nav className="flex space-x-4">
        {members?.map((member, index) => (
          <Link key={index} href={member.uri}>
            {member.id}
          </Link>
        ))}
      </nav>
    </main>
  );
}
