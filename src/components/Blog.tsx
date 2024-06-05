import * as React from "react";
import { FaShareAlt, FaImage } from "react-icons/fa";

interface IBlogProps {
  imgUrl: string;
  imgAlt: string;
  title: string;
  writer: string;
  date: string;
  sharing: string;
  desc: string;
}

const Blog: React.FunctionComponent<IBlogProps> = ({
  imgUrl,
  imgAlt,
  title,
  writer,
  date,
  sharing,
  desc,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getInitials = (name: string) => {
    const initials = name.slice(0, 2).toUpperCase();
    return initials;
  };
  return (
    <div style={{ width: "400px", height: "550px", display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ position: "relative" }}>
        <img
          src={imgUrl}
          alt={imgAlt}
          style={{ width: "100%", height: "250px", objectFit: "cover", transition: "transform 0.3s ease-in-out" }}
          className="hover:scale-90"
        />
        <div style={{ position: "absolute", top: "8px", left: "8px", right: "8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", height: "50px", padding: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", fontSize: "12px", fontWeight: "bold", padding: "4px 12px", borderRadius: "4px" }}>
              Aenean Eleifend
            </span>
            <span style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", fontSize: "12px", fontWeight: "bold", padding: "4px 12px", borderRadius: "4px" }}>
              Aliquam
            </span>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderRadius: "50%", padding: "8px" }}>
            <FaImage style={{ color: "white", fontSize: "12px" }} />
          </div>
        </div>
      </div>
      <div style={{ flex: "1", padding: "16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {getInitials(writer)}
              <div>
                <span style={{ fontWeight: "600", color: "black" }}>{writer}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: "#6B7280" }}>
            <div>{formatDate(date)}</div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}>
                <FaShareAlt style={{ marginRight: "4px" }} />
                {sharing} shares
              </div>
            </div>
          </div>
          <p style={{ color: "#374151", marginBottom: "12px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical" }}>{desc}</p>
        </div>
        <div style={{ marginTop: "8px" }}>
          <span style={{ fontWeight: "bold", color: "black", cursor: "pointer", textDecoration: "underline", transition: "color 0.3s" }} className="hover:text-gray-600">
            View Post
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blog;