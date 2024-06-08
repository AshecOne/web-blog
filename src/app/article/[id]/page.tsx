import * as React from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface IArticle {
  id: string;
  author: string;
  title: string;
  urlImage: string;
  description: string;
  date: string;
  linkUrl: string;
}

const ArticleDetail: React.FunctionComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = React.useState<IArticle | null>(null);

  React.useEffect(() => {
    if (id) {
      axios
        .get(`https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/blogs/${id}`)
        .then((response) => {
          setArticle(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 text-sm mb-3">
        By {article.author} on{" "}
        {new Date(article.date).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <img
        src={article.urlImage}
        alt={article.title}
        className="w-full h-auto mb-4"
      />
      <p className="text-gray-700 text-lg mb-6">{article.description}</p>
      <a
        href={article.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleDetail;
