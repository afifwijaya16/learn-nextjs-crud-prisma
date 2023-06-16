export const metadata = {
  title: "News",
};

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-10 px-10">{children}</div>;
};

export default NewsLayout;
