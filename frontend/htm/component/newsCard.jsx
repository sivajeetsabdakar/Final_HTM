import Image from "next/image";

export default function NewsCard({ data  , imageSrc}) {
  console.log(data);
  return (
    <a href={data.url}>
      <div>
        <div
          className="card card-compact bg-base-100 h-96 py-5 w-96 shadow-sm
         shadow-cyan-100 border-collapse"
        >
          <figure>
            <Image width={250} height={200} className="rounded-xl" objectFit="cover" src={imageSrc} alt="News" />
          </figure>
          <div className="card-body">
            <h2 className="card-title truncate ">
              <span className="font-extrabold underline">Author:</span>{" "}
              {data.author}
            </h2>
            <p className="truncate">
              <span className="font-extrabold underline">Title: </span>
              {data.title}
            </p>
            <div className="card-actions justify-end">
              <p>
                <span className="font-extrabold underline">published at:</span>{" "}
                {new Date(data.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
