import Link from "next/link";
import { Button } from "antd";
export default function Home() {
  return (
    <div className="flex h-screen">
      <Link className="m-auto" href="/cities">
        <Button type="primary">Go To City List</Button>
      </Link>
    </div>
  );
}
