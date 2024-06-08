import * as React from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { IArticle } from "@/lib/features/articleSlice";

const ArticleDetailClient: React.FunctionComponent = () => {
  const article = useAppSelector((state) => state.articleReducer.selectedArticle);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-3">
        By {article.author.username} on{" "}
        {new Date(article.createdAt).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="w-full h-auto mb-4 max-w-screen-sm mx-auto relative">
        <Image
          src={article.urlImage}
          alt={article.title}
          layout="responsive"
          width={700}
          height={475}
          className="object-contain"
        />
      </div>
      <p className="text-gray-700 text-lg mb-6 max-w-screen-sm mx-auto">
        {article.description}
      </p>
    </div>
  );
};

export default ArticleDetailClient;
