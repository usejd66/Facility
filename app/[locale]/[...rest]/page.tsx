import { notFound } from "next/navigation";

// Any unknown path inside a language (e.g. /sq/xyz) shows the branded 404 with header and footer.
export default function CatchAll() {
  notFound();
}
