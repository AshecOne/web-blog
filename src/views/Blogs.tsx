import * as React from "react";
import Blog from "@/components/Blog";
import Container from "@/components/Container";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { setCategoryAction } from "@/lib/features/categorySlice";

interface IBlogsProps {}

interface IArticle {
  id: string;
  author: {
    username: string;
  };
  title: string;
  urlImage: string;
  description: string;
  createdAt: string;
  category: {
    title: string;
  };
}

interface ICategory {
  id: string;
  title: string;
}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [articles, setArticles] = React.useState<IArticle[]>([]);
  const dispatch = useAppDispatch();
  const category = useAppSelector(
    (state) => state.categoryReducer
  ) as ICategory[];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const getArticles = async () => {
    try {
      const response = await axios.get(
        `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/articles`
      );
      setArticles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCategory();
    getArticles();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/category`
      );
      dispatch(setCategoryAction(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="blogs" className="bg-white pt-10 pb-6">
      <Container>
        <div className="flex mx-auto space-x-6 relative justify-center items-center p-2">
          <div className="flex items-center px-3">
            <FaFacebookF className="cursor-pointer text-gray-600 mr-2" />
            <p className="text-gray-600">3.7M</p>
          </div>
          <div className="flex items-center px-3">
            <FaInstagram className="cursor-pointer text-gray-600 mr-2" />
            <p className="text-gray-600">2.4M</p>
          </div>
          <div className="flex items-center px-3">
            <FaTwitter className="cursor-pointer text-gray-600 mr-2" />
            <p className="text-gray-600">3.7M</p>
          </div>
          <div className="flex items-center px-3">
            <FaYoutube className="cursor-pointer text-gray-600 mr-2" />
            <p className="text-gray-600">2.4M</p>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-center gap-6">
            <button
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                borderBottom:
                  selectedCategory === "" ? "4px solid black" : "none",
              }}
              onClick={() => handleCategoryClick("")}
            >
              All
            </button>
            {category.map((cat: ICategory) => (
              <button
                key={cat.id}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  borderBottom:
                    selectedCategory === cat.title ? "4px solid black" : "none",
                }}
                onClick={() => handleCategoryClick(cat.title)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          {selectedCategory === ""
            ? articles.map((article) => (
                <div key={article.id}>
                  <Blog
                    imgUrl={article.urlImage}
                    imgAlt={article.title}
                    title={article.title}
                    writer={article.author.username}
                    profilePic="profil.png"
                    profileAlt={article.author.username}
                    date={article.createdAt}
                    sharing=""
                    desc={article.description}
                  />
                </div>
              ))
            : articles
                .filter(
                  (article) => article.category.title === selectedCategory
                )
                .map((article) => (
                  <div key={article.id}>
                    <Blog
                      imgUrl={article.urlImage}
                      imgAlt={article.title}
                      title={article.title}
                      writer={article.author.username}
                      profilePic="/profil.png"
                      profileAlt={article.author.username}
                      date={article.createdAt}
                      sharing=""
                      desc={article.description}
                    />
                  </div>
                ))}
        </div>
        {selectedCategory !== "" &&
          articles.filter(
            (article) => article.category.title === selectedCategory
          ).length === 0 && (
            <div className="flex flex-col justify-center items-center mt-6 mb-6">
              <img
                src="https://ashecone.github.io/web-blog/empty.png"
                alt="Article Empty"
                style={{ width: "100px" }}
              />
              <p className="text-gray-500">Article Empty</p>
            </div>
          )}
      </Container>
    </section>
  );
};

export default Blogs;
