import { getDictionary } from "@/lib/i18n/config";
import BlogPage from "@/components/blog-page";

export default async function BlogRoute({
  params,
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);
  return <BlogPage dict={dict.blog} />;
}
