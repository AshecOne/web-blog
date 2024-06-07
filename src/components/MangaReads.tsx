import * as React from 'react';

interface IMangaReadsProps {
  posts: {
    image: string;
    title: string;
    date: string;
    linkUrl: string; 
  }[];
}

const MangaReads: React.FunctionComponent<IMangaReadsProps> = (props) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const handleClick = (linkUrl: string) => {
    window.location.href = linkUrl;
  };

  return (
    <div className="space-y-4 px-5 py-5 border">
      <h2 className="text-2xl font-bold">Manga reads</h2>
      {props.posts.map((post, index) => (
        <div key={index} className="flex gap-4">
          <img 
            src={post.image} 
            alt={post.title} 
            className="object-cover rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" 
            style={{ height: '160px', width: '200px' }}
            onClick={() => handleClick(post.linkUrl)} 
          />
          <div>
            <h3 className="text-lg text-black font-bold">{post.title}</h3>
            <p className="text-gray-500 text-sm">{formatDate(post.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MangaReads;
