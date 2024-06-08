import * as React from "react";

interface IPostProps {
  mainPost: {
    image: string;
    date: string;
    title: string;
    description: string;
    linkUrl: string;
    author: string;
  };
  subPosts: {
    image: string;
    title: string;
    linkUrl: string;
    author: string;
  }[];
}

const Post: React.FunctionComponent<IPostProps> = (props) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div className="flex space-y-4 px-5 py-5 border">
      <div className="w-[580px]">
        <img
          src={props.mainPost.image}
          alt={props.mainPost.title}
          className="object-cover mb-3 rounded-t-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          style={{ height: "350px", width: "540px" }}
          onClick={() => handleNavigation(props.mainPost.linkUrl)}
        />
        <div className="p-4">
          <p className="text-gray-500 mb-3 text-sm">{formatDate(props.mainPost.date)}</p>
          <h2 className="text-2xl mb-3 text-black font-bold">{props.mainPost.title}</h2>
          <p className="text-gray-500 text-sm mb-3">By {props.mainPost.author}</p>
          <p className="mt-2 mb-6 text-gray-600">{props.mainPost.description}</p>
          <span
            className="text-md mt-1 text-black font-bold cursor-pointer underline transition duration-300"
            onClick={() => handleNavigation(props.mainPost.linkUrl)}
          >
            View Post
          </span>
        </div>
      </div>

      <div className="w-[260px] space-y-4">
        {props.subPosts.map((subPost, index) => (
          <div key={index} className="flex">
            <img
              src={subPost.image}
              alt={subPost.title}
              className="rounded-lg my-3 mr-3 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
              style={{ height: "100px", width: "120px" }}
              onClick={() => handleNavigation(subPost.linkUrl)}
            />
            <div>
              <h3 className="text-md mt-3 text-black font-bold">{truncateTitle(subPost.title, 30)}</h3>
              <p className="text-gray-500 text-sm">By {subPost.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;