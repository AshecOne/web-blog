import * as React from "react";
import Container from "@/components/Container";
import Post from "@/components/Post";
import MangaReads from "@/components/MangaReads";
import axios from "axios";

interface IArticleProps {}

interface IArticle {
  id: string;
  author: string;
  title: string;
  urlImage: string;
  description: string;
  date: string;
  linkUrl: string;
  category: {
    title: string;
  };
}

interface ICategory {
  id: string;
  title: string;
}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getArticles = async () => {
    try {
      const response = await axios.get(`https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/blogs`);
      console.log("Fetched articles:", response.data.data);
      setArticles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/categories/blogs`);
      console.log("Fetched categories:", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCategories();
    getArticles();
  }, []);

  const categoryTitles: { [key: string]: string } = {
    LW: "LessWrong",
    ACT: "Astral Codex Ten",
    SSC: "Slate Star Codex",
    Interfluidity: "Interfluidity",
    More: "More",
  };

  const filteredArticles =
    selectedCategory === ""
      ? articles
      : articles.filter((article) => article.category.title === selectedCategory);

  const mainPost = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const subPosts = filteredArticles.slice(1, 5);
  const mangaReads = filteredArticles.slice(0, 3);

  return (
    <section id="article" className="bg-white mt-10 mb-6 pb-5">
      <Container>
        <div className="flex mt-4 pt-3 border-b border-black">
          {Array.isArray(categories) ? (
            categories.map((category) => (
              <div
                key={category.id}
                className={`pb-2 mx-4 px-4 font-bold cursor-pointer ${
                  selectedCategory === category.title
                    ? "border-b-2 border-black"
                    : "hover:border-b-2 hover:border-black"
                }`}
                onClick={() => handleCategoryClick(category.title)}
              >
                {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
              </div>
            ))
          ) : (
            <div className="text-black">No categories found.</div>
          )}
        </div>

        {selectedCategory !== "" && filteredArticles.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-6 mb-6">
            <img src="https://ashecone.github.io/web-blog/empty.png" alt="Article Empty" style={{ width: "100px" }} />
            <p className="text-gray-500">Article Empty</p>
          </div>
        )}

        {mainPost && (
          <div className="mt-4 pt-3">
            <h2 className="text-2xl font-bold mb-4">{categoryTitles[selectedCategory] || "Articles"}</h2>
            <div className="flex space-x-2" style={{ overflowX: "scroll" }}>
              <Post
                mainPost={{
                  image: mainPost.urlImage,
                  date: mainPost.date,
                  title: mainPost.title,
                  description: mainPost.description,
                  linkUrl: mainPost.linkUrl,
                  author: mainPost.author,
                }}
                subPosts={subPosts.map((post) => ({
                  image: post.urlImage,
                  date: post.date,
                  title: post.title,
                  linkUrl: post.linkUrl,
                  author: post.author,
                }))}
              />
              {mangaReads.length > 0 && (
                <MangaReads
                  posts={mangaReads.map((post) => ({
                    image: post.urlImage,
                    title: post.title,
                    date: post.date,
                    linkUrl: post.linkUrl,
                    author: post.author,
                  }))}
                />
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Article;