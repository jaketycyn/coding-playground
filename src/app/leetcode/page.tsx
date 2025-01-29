import Link from "next/link";

export default async function LeetCodePage() {
  // leet code problems
  const problems = await getProblemsList();
  return (
    <div>
      {/* Title */}
      <h1 className="text-4xl">leetCode Page</h1>
      {/* Sections */}
      <ol>
        {" "}
        TestList
        <li>
          <Link href={"leetcode/1-twosum"}>TwoSum</Link>
        </li>
      </ol>
    </div>
  );
}
